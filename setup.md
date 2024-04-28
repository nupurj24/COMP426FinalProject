## Instructions to start the local server to run our project 

Before you get started, setup a MongoDB account, start a new project with a free M0 plan, locate your connection string to the cluster and save it.

1. After cloning the repository and opening it in VS Code, replace the ATLAS_URI in the .env file in the server directory with your connection string from MongoDB and open a new terminal in your VS Code. Your .env file contents should look like: ATLAS_URI=your connection string here
2. Enter the command: cd server 
3. You should be in the server directory now
4. Enter the command: npx ts-node src/server.ts
You should see the output "Server running at http://localhost:5200..." 
Awesome the backend server is running! Now to start the frontend server: 
5. Open a new terminal window in your VS Code 
6. Enter the command: cd client 
7. You should be in the client directory now
8. Enter the command: ng serve -o
9. Our application should then open up in your browser! 