import conf from "@/conf/conf";
import {Client,ID, Databases, Storage, Query} from 'appwrite';
import { Url } from "url";

// CRUD Operations for files and posts
export class Service{

   client = new Client();
   databases;
   Storage;

   constructor()
   {
      this.client
         .setEndpoint(conf.appwriteURL)
         .setProject(conf.appwriteProjectId);

      this.databases = new Databases(this.client);
      this.Storage = new Storage(this.client)
   
   }

   async createpost({title, slug, content ,  featuredimage , status , userId}:
      {title : string , slug : string , content : string , featuredimage : string , status : string , userId : string})
   {
      try{
         return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
            title,
            content,
            featuredimage,
            status,
            userId

         })
      }catch(error)
      {
         throw error;
         console.log("error :: create file" , error);
      }
   }
   


   async updatepost( slug:string , {title,  content ,  featuredimage , status, userId }:
      {title : string , content : string , featuredimage : string , status : string , userId: string})
   {
      try{
         return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
            title,
            content,
            featuredimage,
            status,
            userId
            

         })
      }catch(error)
      {
         throw error;
         console.log("error :: update file" , error);
      }
   }


   async deletepost(slug:string)
   {
      try{

         await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
         return true;
      }catch(error)
      {
         throw error;
         console.log("error :: delete file" , error);
         return false;
      }
   }

   async getpost(slug:string)
   {
      console.log(slug)
      try{
         const result = await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
         console.log(result);
         return result;
      }catch(error)
      {
         throw error;
         console.log("error ");
        
      }
   }

   async getallpost()
   {
      
      try{
         return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId);
      }catch(error)
      {
         throw error;
         console.log("error :: all files get " , error);
         //return false;
      }
   }


   //  file serviice
   async uploadfile(file:File)
   {
      try{

         return await this.Storage.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
         )

      }catch(error)
      {
         throw error;
         console.log("error :: upload file" , error);
         return false;
      }
   }

   async deletefile(fileid : string)
   {
      try{

         await this.Storage.deleteFile(conf.appwriteBucketId ,fileid);

      }catch(error)
      {
         throw error;
         console.log("error :: delete file" , error);
         return false;
      }
   }

   getfilePreview(fileid : string)
   {
     return this.Storage.getFilePreview(conf.appwriteBucketId,fileid);
   
   }

}

const service = new Service();
export default service;