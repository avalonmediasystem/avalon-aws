Notes for Deploying Avalon-aws via CloudFront:

    Stuff to do in preparation for runnig the CloudFront script:

    1. Clone this repo and checkout the desired branch, sorta.  The zip files referenced in the cloudfront
          script are not in git.  They are in the pre-existing S3 bucket called "nul-repo-deploy"
    2. Generate an IAM public and private key pair.
    3. Create an EC2 Key Pair: e.g. "devops"
    4. Sign the license agreement for OpenVPN Access Server
           http://aws.amazon.com/marketplace/pp?sku=f2ew2wrz425a1jagnifd02u5t
    5. Ensure that the SolutionStackName specified in the templates directory points to a currently supported version,
         e.g.  "64bit Amazon Linux 2017.03 v2.6.3 running Tomcat 8 Java 8"
	 run "rake audit_solution_stacks" from within the slee to get a list of currently available EC2 instance versions.
	 ^This script will audit all the template files and suggest version changes for the solutionstacks.
    6. Create a new zone delegation in library.northwestern.edu via InfoBlocks to delegate to AWS.  
         eg. devops-test.library.northwestern.edu
    7. Create a Public Hosted Zone in Route 53,  e.g. devops-test.library.northwestern.edu
       (Note: if sub-domains exist in Route 53, delete them before re-launching stack in CloudFormation
       - e.g. slee.devops-test.library.northwestern.edu, e.g. slee.vpc.devops-test.library.northwestern.edu)
    8. Use the pre-existing S3 bucket named "nul-repo-deploy" for deployment.
    9. Create an S3 bucket to store binary files, e.g. nul-devopsbucket
    10. Installing CloudFront Infrastructure Stack: using the "infrastructure.yaml" file (found in the 
   	  S3 nul-repo-deploy bucket or a copy from GIT avalon-aws/templates/infrastructure.yaml), 
          fill in the following values:
        - Stack name:  e.g. "slee"
        - S3Bucket: "nul-repo-deploy"
        - S3BucketEB: "nul-repo-deploy"
        - KeyName: e.g. "devops"
        - PublicZoneName: e.g. "devops-test.library.northwestern.edu"
        - DatabasePassword: e.g. "MyNiftyPassword"
        - S3FedoraFilename: e.g. "fcrepo.zip"
        - VpnPassword: e.g. "MyNiftyPassword"
        - FcsleeBinaryBucket: e.g. "nul-devopsbucket"
        - FcsleeDatabasePassword: e.g. "MyNiftyPassword"
        - StackName: e.g. "slee"
        Click "Next"
        Tags: Select the IAM key created in step 2 and then click the "+" symbol to create 
	  corresponding Tags
        Click "Next"
        Check the "I acknowledge that AWS CloudFormation might creat IAM recourses with custom names." box.
        Click "Create"
    11. Prepratory work prior to creating the Avalon stack: 
        - (MBK provided a CloudFrontID rsa key in Slack)
        - (MBK's notes pasted from Slack):
          1) Create an S3 bucket called `nul-devops-test-configuration`.
          2) Put the above file into it at `cloudfront/pk-APKAJCMUDOESUFY7Z7GA.pem`
    12. Installing CloudFront Avalon Stack: using the "application.yaml" file (found in the 
   	  S3 nul-repo-deploy bucket or a copy from avalon-aws/templates/avalon/application.yaml), 
          fill in the following values:
        - Stack name:  e.g. "smoke"
        - CloudFrontKeyFile: "pk-APKAJCMUDOESUFY7Z7GA.pem"
        - CloudfrontKeyId: "APKAJCMUDOESUFY7Z7GA"
        - ConfigurationBucket:  e.g.  "nul-devops-test-configuration"
        - EmailComments: e.g. "avalon-comments@devops-test.library.northwestern.edu"
        - EmailNotifications: e.g. "avalon-notifications@devops-test.library.northwestern.edu"
        - EmailSupport: e.g. "avalon-support@devops-test.library.northwestern.edu"
        - InfrastructureStack e.g. "slee"
        - KeyName: e.g. "devops"
        - PriceClass: "PriceClass_100"
        - QueuePrefix: e.g. "avalon"
        - RDSDatabaseName: e.g. "avalon"
        - RDSPassword: e.g. "MyNiftyPassword"
        - RDSUsername: e.g. "avalon"
        - S3Bucket: "nul-repo-deploy"
        - S3BucketEB: "nul-repo-deploy"
        - S3Key: "avalon/current/avalon.zip"
        - SecretKeyBase: (32 bytes of random hex) e.g. "26 3d 81 cb c7 9c f9 e7 be 76 7f 59 ec d5 d8 a9 
            1c 55 cd 45 d7 a7 d3 dd ed db de 04 51 25 2d 90"
        - SlackWebHookChannel: (can be left blank)
        - SlackWebHookToken: (can be left blank)
        - SSLCertificadeID: (can be left blank) 
        - TrustedSigner: "845225713889"
        - WebappInstanceType: e.g. "t2.small"
        - WorkerInstanceType: e.g. "t2.small"

