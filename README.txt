
-- Clone the repo
-- Run "npm install" inside server and frontend both folder and as well as main folder (if needed)
-- create .env file inside the server folder and add following variables is in:
  (Create MONGO_DB_URL varibale with following url and replace username and password)
    MONGO_DB_URL=mongodb+srv://<username>:<password>@cluster0.yritl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority. 
                                              (Note: replace username and password with your mongodb username and password)
    (Next create JWT_SECRET variable and create some secret key: whatever you want. Remember that this is what helps in generating token)
    JWT_SECRET=knskjdhbgzsdbfzdjhgbzfhbzjhdbfdjfhbvzjdhbvbj23234b234jhkbdfhjd124236hb34j56b45hjb6jkbh235b23jkb5j3hb6h34b6v34jh5b% 
    
    After that, run "npm start" inside frontend folder and "nodemon server.js" inside server folder. Visit http://localhost:3000 for the site.
