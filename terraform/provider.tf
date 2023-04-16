terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider aws {
  alias   = "af_south_1"
  region  = "af-south-1"
}

provider aws {
  alias   = "us_east_1"
  region  = "us-east-1"
}
