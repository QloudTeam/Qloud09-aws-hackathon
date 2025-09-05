output "parameter_names" {
  description = "List of created parameter names"
  value = [
    aws_ssm_parameter.aws_access_key_id.name,
    aws_ssm_parameter.aws_secret_access_key.name,
    aws_ssm_parameter.aws_region.name,
  ]
}

output "slack_parameter_name" {
  description = "Slack parameter name (if created)"
  value       = var.slack_bot_token != "" ? aws_ssm_parameter.slack_bot_token[0].name : null
}