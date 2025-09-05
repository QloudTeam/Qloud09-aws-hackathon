output "application_name" {
  description = "Elastic Beanstalk application name"
  value       = module.elastic_beanstalk.application_name
}

output "environment_name" {
  description = "Elastic Beanstalk environment name"
  value       = module.elastic_beanstalk.environment_name
}

output "application_url" {
  description = "Application URL"
  value       = module.elastic_beanstalk.application_url
}

output "environment_id" {
  description = "Elastic Beanstalk environment ID"
  value       = module.elastic_beanstalk.environment_id
}

output "parameter_store_parameters" {
  description = "Created Parameter Store parameters"
  value       = module.parameter_store.parameter_names
}

output "s3_bucket_name" {
  description = "S3 bucket for EB versions"
  value       = module.s3.bucket_name
}