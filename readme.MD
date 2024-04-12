## TO DO APP ##

## Backend App ##

**Framework:** ExpressJS with Typescript

**Database:** Postgres

**ORM:** TypeORM 

### Server Setting instructions: ###

- Go inside `/backend` folder.
- Update the `.env` file. In this file, I have mentioned the DB configurations: 
    - DB_USERNAME=
    - DB_PASSWORD=
    - DB_NAME=
    - DB_HOST=
    - DB_PORT=
- Create the Database if you have not created otherwise skip this step.
- Use `npm i` for installing all the dependencies.
- Use `npm run db:migrate` to set up the schema.
- Use `npm run dev`, If all migrations run properly.
  Note: We are creating a default app user when the user initial starts the server. 
  Default user credentials:
  *Email*: admin@gmail.com
  *Password*: admin
  
  These credentials will be required for login on the frontend side.

The server will start on default PORT 3000.     

### Frontend App ###

**Framework:** NextJS with Typescript

**Main Library Used:** React-query and MaterialUI.

- Go inside `/frontend` folder.
- Use `npm i` for installing all the dependencies.
- Update the following configuration in `.env` file
  NEXT_PUBLIC_API_URL=
  
  Default Setting: 
  NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1 
  
  Note: Please update only the backend app PORT. If your backend app running on port 5000 then the URL will be `http://localhost:5000/api/v1`

- Use`npm run dev` to start the server.
- If you open the app, you will see login page, use the above mentioned credentials for login into an account.
- Use `npm run test` to run all the test cases.

## Functionalities Implemented:

### Frontend
-  **Implemented User Authentication:** Only after successfully login, the user can add the todo.
-  **Implemented TODO Filtering and pagination functionalities**: We are not fetching all the ToDos at once, we have implemented pagination on the backend side. Through API, we are displaying todo data on a page-by-page basis. ToDo Filtering is also happening on the server Side.
- **FIltering Option**:
  - Title or description: The user can search todo by title or description
  - Status: User can search todo by status.
  - User can sort the data by `todo title` or `todo creation date`. Users can perform both types of sorting i.e. ascending or descending.
- **Responsive Design**: All pages are responsive.
- **Logout Option**

### Backend
- We have used SQL database i.e. postgres for storage purposes.
- We have implemented authentication and also applied authorization on all the routes.
- We have implemented a `todo relation with user`, so the user will see only those todos which are created by him.
- We are sending appropriate error messages and code as per the respective action.
- We have not implemented the actual `signup flow`, we are creating the default user and password when the backend server starts and using the same on the frontend side to log into the account.

For consistent code style, we have integrated `eslint`, `prettier` and `husky` packages. Please use following commands inside `backend` or `frontend` app to check the linting errors:
- npm run lint
- npm run lint-fix
- npm run prettify