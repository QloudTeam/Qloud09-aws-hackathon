resource "aws_dynamodb_table" "cbti_users" {
  name           = "cbti-users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "nickname"

  attribute {
    name = "nickname"
    type = "S"
  }

  attribute {
    name = "cbtiType"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  global_secondary_index {
    name     = "cbtiType-createdAt-index"
    hash_key = "cbtiType"
    range_key = "createdAt"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = var.tags
}