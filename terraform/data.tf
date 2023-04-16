data "aws_iam_policy_document" "cloudfront_s3" {
    statement {
        actions   = ["s3:GetObject"]
        resources = ["${aws_s3_bucket.default.arn}/*"]

        principals {
            type        = "Service"
            identifiers = ["cloudfront.amazonaws.com"]
        }

        condition {
            test     = "StringEquals"
            variable = "AWS:SourceArn"

            values = [ aws_cloudfront_distribution.default.arn ]
        }
    }
}
