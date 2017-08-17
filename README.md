Usage

    - Clone this repo and checkout the desired branch, sorta.  The zip files referenced in the cloudfront
        script are not in git.  They are in the pre-existing S3 bucket called "nul-repo-deploy"
    - Generate an IAM public and private key pair.
    - Create a new zone delegation in InfoBlocks to delegate to AWS.  eg. devops-test.library.northwestern.edu
    - Create a Public Hosted Zone in Route 53,  e.g. devops-test.library.northwestern.edu
      - create a Public Hosted Zone in Route 53, e.g. repo.devops-test.library.northwestern.edu
      - create a Private Hosted Zone in Route 53, e.g. repo.vpc.devops-test.library.northwestern.edu
      - Create a Record Set in the first Hosted Zone of type "NS" for each of the sub domains,
          e.g. repo.devops-test.library.northwestern.edu and repo.vpc.devops-test.library.northwestern.edu
          for the Value field use something like:
            ns-491.awsdns-61.com
            ns-1041.awsdns-02.org
            ns-1928.awsdns-49.co.uk
            ns-981.awsdns-58.net
    - Use the pre-existing S3 bucket named "nul-repo-deploy" for deployment.
    - Create an S3 bucket to store binary files, e.g. nul-devopsbucket
    - CloudFront: using the "infrastructure.yaml" file (found in the S3 nul-repo-deploy bucket),
        fill in the following values:
      - Stack name:  e.g. "cheese"
      - S3Bucket: e.g. "nul-repo-deploy"
      - S3BucketEB: e.g. "nul-repo-deploy"
      - KeyName: e.g. "devops"
      - PublicZoneName: e.g. "devops-test.library.northwestern.edu"
      - DatabasePassword: e.g. "superSECRET"
      - S3FedoraFilename: e.g. "fcrepo.zip"
      - VpnPassword: e.g. "superSECRET"
      - FcrepoBinaryBucket: e.g. "nul-devopsbucket"
      - FcrepoDatabasePassword: e.g. "superSECRET"
      - StackName: e.g. "cheese"
      Click "Next"
      Tags: Select the IAM key created in step 2 and then click the "+" symbol to create corresponding Tags
      Click "Next"
      Check the "I acknowledge that AWS CloudFormation might creat IAM recourses with custom names." box.
      Click "Create"

