//Try to add/update/delete/get tasks without registering 
// Make sure to remove cookies

//Register a new user in 
 POST method | http://localhost:3000/user/register 
 {
    "userName": "USERNAME",
    "password": "PASSWORD"
}

//Login a user
 POST method | http://localhost:3000/user/login
{
    "userName": "USERNAME",
    "password": "PASSWORD"
}
 
// Create a new task
POST method | http://localhost:3000/taskMgmt/addTask
{
 "title": "title of task",
  "description": "some desc",
  "status": "pending", //pending or in-progress or completed
  "dueDate": "1 Sep 2024" // DD-MMM-YYYY
}

//Update a task
PUT method | http://localhost:3000/taskMgmt/updateTask
{
  "title": "title of task", //Ttile is unique
  "description": "some desc",
  "status": "pending", //pending or in-progress or completed
  "dueDate": "1 Sep 2024" // DD-MMM-YYYY
}

//Get tasks
GET method | http://localhost:3000/taskMgmt/getTask
{
    "status": "in-progress" //pending or in-progress or completed
}

// Delete task
DELETE method | http://localhost:3000/taskMgmt/deleteTask
{
    "title": "title of task"
}

 
