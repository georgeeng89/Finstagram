# Welcome to Finstagram

Finstagram is an Instagram Clone where users can upload image, create captions, and comment on each other's posts.

![Tables](https://i.ibb.co/x7yKBwV/login-page-rm.png)

## Architecture
Finstagram is built using React for the frontend, and Flask for the backend using PostgresSQL.

## Technologies Used
- Frontend
   -  React
   -  Redux
   -  Javascript
   -  HTML
   -  CSS

- Backend
   - Flask
   - Python
   - PostgresSQL
   - SQLAlchemy

## Setting up the App

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/georgeeng89/Finstagram.git
   ```

2. Install the dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app in the terminal:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. Install dependencies for the frontend (react-app folder):
 ```bash
   npm install
   ```
   
7. Start the frontend:
 ```bash
   npm start
   ```

## All Posts
   - Users can view all posts upon logging into Finstagram.
![Tables](https://i.ibb.co/zhPXMwX/home-page-rm.png)

## Users Detail Page
   - Users can view each others details page, where all the posts from the specific user will be there.
![Tables](https://i.ibb.co/P5Mh6gH/details-page-rm.png)

