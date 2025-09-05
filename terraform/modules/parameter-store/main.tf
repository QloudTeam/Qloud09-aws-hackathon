resource "aws_ssm_parameter" "aws_access_key_id" {
  name  = "/test-${var.project_name}/aws/access-key-id"
  type  = "SecureString"
  value = var.aws_access_key_id
  
  description = "AWS Access Key ID for ${var.project_name} application"
  
  tags = var.tags
}

resource "aws_ssm_parameter" "aws_secret_access_key" {
  name  = "/test-${var.project_name}/aws/secret-access-key"
  type  = "SecureString"
  value = var.aws_secret_access_key
  
  description = "AWS Secret Access Key for ${var.project_name} application"
  
  tags = var.tags
}

resource "aws_ssm_parameter" "aws_region" {
  name  = "/test-${var.project_name}/aws/region"
  type  = "String"
  value = var.aws_region
  
  description = "AWS Region for ${var.project_name} application"
  
  tags = var.tags
}

resource "aws_ssm_parameter" "slack_bot_token" {
  count = var.slack_bot_token != "" ? 1 : 0
  
  name  = "/test-${var.project_name}/slack/bot-token"
  type  = "SecureString"
  value = var.slack_bot_token
  
  description = "Slack Bot Token for ${var.project_name} application"
  
  tags = var.tags
}