locals {
  app_name = "${var.project_name}-${var.environment}"
  
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# S3 Bucket for EB versions
module "s3" {
  source = "./modules/s3"
  
  project_name = var.project_name
  environment  = var.environment
  tags         = local.common_tags
}

# IAM Roles
module "iam" {
  source = "./modules/iam"
  
  project_name = var.project_name
  environment  = var.environment
  tags         = local.common_tags
}

# Parameter Store
module "parameter_store" {
  source = "./modules/parameter-store"
  
  project_name           = var.project_name
  environment           = var.environment
  aws_access_key_id     = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
  aws_region            = var.aws_region
  slack_bot_token       = var.slack_bot_token
  tags                  = local.common_tags
}

# DynamoDB
module "dynamodb" {
  source = "./modules/dynamodb"
  
  project_name = var.project_name
  environment  = var.environment
  tags         = local.common_tags
}

# Elastic Beanstalk
module "elastic_beanstalk" {
  source = "./modules/elastic-beanstalk"
  
  project_name                = var.project_name
  environment                = var.environment
  instance_type              = var.instance_type
  service_role_arn           = module.iam.eb_service_role_arn
  instance_profile_name      = module.iam.eb_instance_profile_name
  tags                       = local.common_tags
  
  depends_on = [module.iam, module.parameter_store]
}