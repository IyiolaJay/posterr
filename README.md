### Installation

To install the project, you'll need to have Node.js and npm installed on your computer. Then, you can follow these steps:

- Clone the repository to your local machine using the command below.

```js
git clone https://github.com/IyiolaJay/posterr.git
```

- Navigate to the project root directory using cd posterr
- Install the backend dependencies using `npm install`  or `yarn install` in the backend folder.
- Install the frontend dependencies using `npm install` or `yarn install`  in the frontend folder.

#### Create a `.env` file and configure environment variables
```js
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=<your-port>
EMAIL_USER=<gmail-user-for-sending-emails>
EMAIL_PASS=<gmail-app-password>
GOOGLE_CLIENT_ID=<google-cloud-oauth-clientId>
GOOGLE_CLIENT_SECRET=<google-clout-oauth-client-secret>
```


#### Start the server
`npm start`
or
`yarn start`

#### Interacting with API
You can interact with the API using an HTTP client like Postman or cURL.

To use the API, send requests to the appropriate endpoints with the necessary parameters and headers.

## End Points

`PUT  /api/v1/sign-up`  `public`

### Create an account.

- Request body
```js
{
    "firstName": "John",
    "lastName" : "Doe",
    "email" : "john@email.com",
    "password" : "testingPassword"
}
```


`POST  /api/v1/sign-in`  `public`
### Login user account

- Request body
```js
{
    "email" : "john@email.com",
    "password" : "testingPassword"
}
```

`POST  api/v1/user/reset`  `requires auth`
### Get Password Reset Token

- Request body
```js
{
    "email" : "john@email.com"
}
```


`POST  api/v1/user/change/{token}`  `requires auth`
### Change Password

- Request body
```js
{
    "password" : "newPassword1"
}
```


`POST  api/v1/category/create`  `requires auth`
### Create Category

- Request body
```js
{
"title":"HEalth",
"description" : "This category is for health contents."
}
```

`GET  api/v1/category/all`  `public`
### Get all Categories

- Request body
```js
null
```

`PATCH  api/v1/category/edit/{category_uuid}`  `requires auth`
### Edit a category

- Request body
```js
{
"title":"Health-new",
"description" : "This category is for health contents."
}
```

`DELETE  api/v1/category/delete/{category_uuid}`  `requires auth`
### Delete a category

- Request body
```js
null
```


`PUT  api/v1/post/create`  `requires auth`
### Create post

- Request body
```js
{
"title":"Another post here344455",
"contentBody" : "Chelsea is a very poor & BAD team",
"category" : "sports"
}
```


`GET  api/v1/post/all`  `public`
### Get all Posts

- Request body
```js
null
```

`GET  api/v1/post/{post_uuid}`  `public`
### Get a Post

- Request body
```js
null
```

`PATCH  api/v1/post/edit/{post_uuid}`  `requires auth`
### Edit a post

- Request body
```js
{
"title":"About Manchester United",
"contentBody" : "Man Utd is poor and their squad is lazy."
}
```

`DELETE  api/v1/post/delete/{post_uuid}`  `requires auth`
### Delete a post

- Request body
```js
null
```

