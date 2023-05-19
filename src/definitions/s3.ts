"use strict"
import fs = require('fs');
import AWS = require('aws-sdk');
const AWS_ACCESS_KEY_ID = process.env.BUCKETEER_AWS_ACCESS_KEY_ID || null;
const AWS_REGION = process.env.BUCKETEER_AWS_REGION || null;
const AWS_SECRET_ACCESS_KEY = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY || null;
const AWS_BUCKET_NAME = process.env.BUCKETEER_BUCKET_NAME || null;
const s3 = new AWS.S3({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

/* Upload file to S3 instance.  */
const uploadFileToS3 = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  };
  return s3.upload(uploadParams).promise();
};

export { AWS_BUCKET_NAME, uploadFileToS3 };
