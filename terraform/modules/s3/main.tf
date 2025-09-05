resource "aws_s3_bucket" "eb_versions" {
  bucket = "${var.project_name}-${var.environment}-eb-versions-${random_string.suffix.result}"
  
  tags = var.tags
}

resource "aws_s3_bucket_versioning" "eb_versions" {
  bucket = aws_s3_bucket.eb_versions.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "eb_versions" {
  bucket = aws_s3_bucket.eb_versions.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "eb_versions" {
  bucket = aws_s3_bucket.eb_versions.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}