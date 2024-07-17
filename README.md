What to do after you download the Repo:
1. Firstly you need to clear the mongoDB database if it's full.
2. Secondly, open the backend folder with Vs code or a terminal, and open the (.env) file , change the value of STOP_POLLING_SERVICE variable to false, and execute - npm run dev in the terminal.
3. Now your server is ready, the api will get live, now Third thing you need to do is start the frontend server at localHost:3000 , Once open you will see a page with 2 buttons named Home and stock at the top, in home page there are 5 differnt stock is listed named apple, google,amazon, microsoft and meta, the price shown in the div is live and fetched from a free sourse api, 
4. Frontend is written in next.js without Tailwind css.
