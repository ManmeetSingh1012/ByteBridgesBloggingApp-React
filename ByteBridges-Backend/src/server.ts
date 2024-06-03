import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import ConnectDB from './database/index';


import app from './app';


const port = 3000

ConnectDB().then(() => {

   console.log('Connected to DB');

   app.listen(process.env.PORT || port, () => {
      console.log(`⚡️[server]: Server is running at port  ${process.env.PORT || 4000}`);
   });

   

}).catch((error) => {

   console.log('Error connecting to DB', error);

});







