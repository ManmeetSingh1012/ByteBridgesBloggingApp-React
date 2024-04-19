import conf from "@/conf/conf";
import {Client,Account,ID} from 'appwrite';

// Authentication Service file 
// why we created class because all authentication business logic we will write here

export class auth {

   client = new Client();
   account;

   // why we used constructor because all things will get intialized when the object called.
   
   constructor()
   {
      this.client
         .setEndpoint(conf.appwriteURL)
         .setProject(conf.appwriteProjectId);

      this.account = new Account(this.client)
   }


   // we created this create account function , we will just pass the value 
   async createAccount({email, password, name}: {email: string, password: string, name: string}) 
   {
      try{

         const userAccount = await this.account.create(ID.unique(),email,password,name)
         if(userAccount)
         {
            const result = await this.Login({email, password})
            if(result !== false)
            {
               return userAccount
            }
         }else{
            return null;
         }
      }catch(error)
      {
         throw error;
         return null;
      }
   }

   // we will login the user if the user successfully account created 
   async Login({email, password }: {email :string , password : string})
   {
      try{
        const login = await this.account.createEmailPasswordSession(email,password)
        if(login)
         {
            return true
         }else{
            return false;
         }
      }catch(error)
      {
         throw error;
         return false;
      }
   }

   async getCurrentUser()
   {
      try{
         return this.account.get();
      }catch(error)
      {
         throw error;
      }
   }

   async logout()
   {
      try{
         this.account.deleteSession('current');
      }catch(error)
      {
         throw error;
      }
   }

}

const authservice = new auth()
export default authservice