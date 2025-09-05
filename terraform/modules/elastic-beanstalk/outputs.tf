output "application_name" {
  description = "Elastic Beanstalk application name"
  value       = aws_elastic_beanstalk_application.app.name
}

output "environment_name" {
  description = "Elastic Beanstalk environment name"
  value       = aws_elastic_beanstalk_environment.env.name
}

output "environment_id" {
  description = "Elastic Beanstalk environment ID"
  value       = aws_elastic_beanstalk_environment.env.id
}

output "application_url" {
  description = "Application URL"
  value       = "http://${aws_elastic_beanstalk_environment.env.endpoint_url}"
}

output "cname" {
  description = "CNAME for the environment"
  value       = aws_elastic_beanstalk_environment.env.cname
}