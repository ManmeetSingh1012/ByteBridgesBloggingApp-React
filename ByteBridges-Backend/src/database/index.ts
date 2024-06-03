import mongoose from "mongoose";


const ConnectDB = () :Promise<void> => {
   return new Promise(async (resolve, reject) => {
      try {
         
         const connectionInstance = await mongoose.connect(`${process.env.Mongodb_url}`);
         console.log('Connected to DB', connectionInstance.connection.host);


         
        
        


         resolve();
         
      } catch(error) {
         
         
         reject(error);
      }
   });
};


export default ConnectDB;