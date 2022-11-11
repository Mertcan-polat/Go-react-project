This task was developed for fill labs.

Backend connection was made with MongoDb. When run locally, it will run on the localhost:6000 port in the Postman application.

Endpoints in the project: /users/v1/create Methods("POST")
/users/v1/get/{userId} Methods("GET")
/users/v1/update/{userId} Methods("PUT")
users/v1/delete/{userId} Methods("DELETE")
/users/v1/getAl Methods("GET")

is set to.

Bootstrap was used while developing the project. As can be seen in the api-frontend file, requests and methods are listed in two different files in 'user'.

You can find the first 3 questions under the 'questions' file in the project. 'go run question(question number).go' code is used in terminal to run

A token reflex is required for MongoDb. For this, the line in the .env file should be replaced with the text you will get from mongodb.

When the backend is wanted to be run, the 'go run main.go' code is used.

The test users that were added manually before the project runs will be listed for you. The 'create' button at the top right of the page that opens will direct you to the page to create a new user. Here you will see 3 input fields and a button that you can go back to at the bottom left of the page and a button to perform the operation at the bottom right.

On the user listed page, you will be greeted by the edit and delete buttons. There is a 'delete' button to delete and an edit button to edit.

In order to follow the requests, you can observe the desired operation and the flow by placing a break point in the userController.go file under the controller file.
