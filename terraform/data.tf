data "aws_iam_policy_document" "default" {
    statement {
        actions   = ["s3:GetObject"]
        resources = ["${aws_s3_bucket.default.arn}/*"]

        principals {
        type        = "AWS"
        identifiers = [aws_cloudfront_origin_access_identity.default.iam_arn]
        }
    }
}
