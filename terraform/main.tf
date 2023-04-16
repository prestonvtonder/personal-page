locals {
    origin_id = "s3"
}

resource "aws_s3_bucket" "default" {
    provider    = aws.af_south_1
    bucket      = "preston.vantonder.dev"
}

resource "aws_s3_bucket_acl" "default" {
    provider    = aws.af_south_1
    bucket      = aws_s3_bucket.default.id
    acl         = "private"
}

resource "aws_s3_bucket_policy" "default" {
    bucket = aws_s3_bucket.default.id
    policy = data.aws_iam_policy_document.default.json
}

resource "aws_s3_bucket_website_configuration" "default" {
    bucket = aws_s3_bucket.default.id

    index_document {
        suffix = "index.html"
    }
}

resource "aws_acm_certificate" "default" {
    provider          = aws.us_east_1
    domain_name       = "preston.vantonder.dev"
    validation_method = "DNS"

    lifecycle {
        create_before_destroy = true
    }
}

resource "aws_cloudfront_origin_access_control" "default" {
    name                              = "default"
    description                       = "Default Policy"
    origin_access_control_origin_type = "s3"
    signing_behavior                  = "always"
    signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_origin_access_identity" "default" {
    comment = "AWS S3"
}

resource "aws_cloudfront_distribution" "default" {
    provider    = aws.af_south_1

    origin {
        domain_name              = aws_s3_bucket.default.bucket_regional_domain_name
        origin_access_control_id = aws_cloudfront_origin_access_control.default.id
        origin_id                = local.origin_id
    }

    enabled             = true
    is_ipv6_enabled     = true
    default_root_object = "index.html"

    aliases = ["preston.vantonder.dev"]

    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD", "OPTIONS"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = local.origin_id

        forwarded_values {
            query_string = false

            cookies {
                forward = "none"
            }
        }

        viewer_protocol_policy = "allow-all"
        min_ttl                = 0
        default_ttl            = 3600
        max_ttl                = 86400
    }

    price_class = "PriceClass_200"

    restrictions {
        geo_restriction {
            restriction_type = "whitelist"
            locations        = ["GB", "NL", "ZA"]
        }
    }

    viewer_certificate {
        acm_certificate_arn         = aws_acm_certificate.default.arn
        minimum_protocol_version    = "TLSv1.2_2021"
        ssl_support_method          = "sni-only"
    }
}
