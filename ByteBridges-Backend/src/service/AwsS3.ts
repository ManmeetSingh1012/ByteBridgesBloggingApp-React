import AWS from 'aws-sdk';
import  fs from 'fs';
import S3 from 'aws-sdk';
import { F } from 'vite/dist/node/types.d-FdqQ54oU';


interface IUploadFile {
   filename: string;
   buffer: Buffer;
   mimetype: string;
   
 }

AWS.config.update({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  region: process.env.aws_region ,
});

const s3 = new AWS.S3();

const uploadaws = async ({
   buffer,
   filename,
   mimetype
}:IUploadFile) => {
   
   try{

      const myKey = `${Date.now()}-${filename}`

      const params  = {
         Bucket: process.env.AWS_BUCKET_NAME!,
         Key: myKey,
         Body: buffer,
         ContentType : mimetype
      }  as AWS.S3.PutObjectRequest
   
      
      const data = await s3.upload(params).promise();
      console.log(data)
      const url = s3.getSignedUrl('getObject', {
         Bucket: process.env.AWS_BUCKET_NAME!,
         Key: myKey,
         Expires: 31536000
     })
      //fs.unlinkSync(file)
      return url
   }catch(err) {
      console.log("aws",err)
   }
}

export default uploadaws;