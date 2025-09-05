output "eb_service_role_arn" {
  description = "Elastic Beanstalk service role ARN"
  value       = aws_iam_role.eb_service_role.arn
}

output "eb_instance_profile_name" {
  description = "Elastic Beanstalk instance profile name"
  value       = aws_iam_instance_profile.eb_ec2_profile.name
}

output "eb_ec2_role_arn" {
  description = "Elastic Beanstalk EC2 role ARN"
  value       = aws_iam_role.eb_ec2_role.arn
}