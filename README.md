# Javascript REST API 💻

- This is javascript rest api with user authentication and CRUD.
- Well organized and easy to use.
- This API use MongoDB with data encryption.

### Install

```
npm install
```

- Add ".env" file in to the backend folder
- This is the inside structure of the .env file
  ![".env" file](https://github.com/Missaka11/javascript_api_for_login_and_register/assets/126071473/b7e8abaf-3f91-49bd-b3cb-820f73997c20)
- Add your MongoDB Cluster Url insted of my url as MONGO_URI
- Also you can use any secret key insted of using "abc123" for JWT_SECRET.

### Run the application

```
npm run server
```

### This is the folder structure of the API

![API_Structure](https://github.com/Missaka11/javascript_api_for_login_and_register/assets/126071473/8d993be8-c7fa-4966-8042-6d67d6d755c3)

- "config" file contains the database connection.
- "controllers" file contains all the CRUD operations.
- "middleware" file contains user authentication and errorHandling files.
- "models" file contains the Database Schema files.
- "routes" file contains all the routes related to this api.
