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
- Use `npm run start:dev`, If all migrations run properly.

  Note: We are creating a default app user when server starts. 
  
  **Default user credentials:**

  **Email**: admin@gmail.com

  **Password**: admin
  
  These credentials will be required for login on the frontend side.

The server will start on default PORT 3000.     

### Frontend App ###

**Framework:** NextJS with Typescript

**Main Library Used:** React-query and MaterialUI.

### Server Setting instructions: ###

- Go inside `/frontend` folder.
- Use `npm i` for installing all the dependencies.
- Update the backend app server PORT. 
- Use`npm run start` to start the server.
- You will see login page, please use above-mentioned credentials.
- Use `npm run test` to run all the test cases.

## Functionalities Implemented:

### Frontend
-  **Implemented User Authentication:** Only after successfully login, the user can see the todo page.
-  **Implemented TODO Filtering and pagination functionalities**: We are not fetching all the ToDos at once, we have implemented pagination on the backend side. Through API, we are displaying todo data on a page-by-page basis. ToDo Filtering is also happening on the server Side.
- **FIltering Option**:
  - Title or description: The user can search todo by title or description. Here, we are performing case insensitive searching.
  - Status: User can search todo by status.
  - User can sort the data by `todo title` or `todo creation date`. Users can perform both types of sorting i.e. ascending or descending.
- **Responsive Design**: All pages are responsive.
- **Logout Option**

### Backend
- SQL database i.e., Postgres, is used for storage.
- Authentication and authorization are implemented on all routes.
- `Todo` relation with `user` is implemented, so users see only their own todos.
- We are sending appropriate error messages and error code as per the respective action.
- We have not implemented the actual `signup flow`, we are creating the default user and password when the backend server starts and using the same on the frontend side for logging into the account.

To maintain code consistency while creating new files and increasing development speed, we use Plop. You can generate template files for components, queries, and mutations using the command npm run generate.

For consistent code style, eslint, prettier, and husky packages are integrated. Please use the following commands inside the backend or frontend app to check for linting errors:
- npm run lint
- npm run lint-fix
- npm run prettify
