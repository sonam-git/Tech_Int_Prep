# Interactive Full Stack Application
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description.

Technical Interview Preparation aka Tech Int Prep is a simple Heroku deployed application, which serves as a CMS-style platform designed for the users that allows to publish their question as post. Additionally, the comment section below, allows users to interact and engage with users question in order to share their coding knoweldge. The application follows the MVC paradigm, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents:
- [Overview](#Overview)
- [The Challenge](#The-Challenge)
- [Usage Information](#Usage-Information)
- [Installation Process](#Installation-Process)
- [Built With](#Built-With)
- [What I Learned](#What-I-Learned)
- [Continued Development](#Continued-Development)
- [License](#License)
- [Author](#Author)

# Overview

## The Challenge:

The challenge of building this application involved creating a scalable and robust platform that could support multiple users, blog post and comments. The application was designed with security in mind, allowing users to authenticate themselves and protect their personal data. Furthermore, the application had to be built using modern web development technologies and follow best practices, including the MVC architecture pattern.


## Usage Instructions:

#### Visit the homepage, "Login" or "Sign Up" for an account if you don't already have one.

1. Option: A) Account login: click on "login" in the navigation menu - enter Username and Password then click "Log In" to proceed.
1. Option: B) Account Sign Up: click on "Sign Up" in the navigation menu - once open, enter Username and Password then click "Sign Up" to proceed.
2. Once you have an account, you can create question,answer and comment on other users question/answers as well as edit their answer to fix the problem.
3. Create a Question: click on the "dashboard" option in the navigation menu and click "Add Question."
4. Enter a question and answer for your post Contribution, then click "Post Question" to save and publish.
5. View existing question and answer by all the users clicking on "Dashboard" in the navigation menu.
6. Comment: to view or "add a new comment" go to any  post in the Dashboard page, click on the button "Comment this Post"  attached to the blog post, you may view the comment history as well as add a new comments, and like the post.
7. Edit or delete your question: click on the "Edit Question" option in the navigation menu and select the post you wish to edit or delete by clicking on the edit this post button attached to the corresponding post.
8. Account Log out: click on "logout" in the navigation menu.
9. You can only see the Home page, About us, sign up button and Log in button unless you sign up or log into the app.

## Deployed Application Link:
[Deployed Application Link:](https://sj-mvc.herokuapp.com)

## GitHub Repository:
[GitHub Repository:](https://github.com/sonam-git/Tech_Int_Prep)

## Screenshots:

### Figure 1. Home

### Figure 2. Sign up


### Figure 3. Login


### Figure 4. Dashboard

### Figure 5. Create a Post

### Figure 6. Edit a Post

### Figure 7. Add / View Comments


## Installation Process
1. Clone the Repository from GitHub 
(or) Download Zip Folder from Repository from GitHub
Open the cloned (or downloaded) repository in any source code editor.

## Built With:
- JSON:[ JSON](https://www.npmjs.com/package/json)
- Dynamic JavaScript
- Node.js [Version 16.18.1](https://nodejs.org/en/blog/release/v16.18.1/)
- Express.js:[Express.js](https://expressjs.com/en/starter/installing.html)
- Bcryptjs: [2.4.3](https://www.npmjs.com/package/bcryptjs)
- Bootstrap: [5.2.1](https://getbootstrap.com/)
- Connect Session Store using Sequelize: [7.0.4](https://www.npmjs.com/package/connect-session-sequelize)
- Dotenv: [8.6.0](https://www.npmjs.com/package/dotenv)
- Express: [4.17.1](https://www.npmjs.com/package/express)
- Express Handlebars: [5.2.0](https://www.npmjs.com/package/express-handlebars)
- Express-Session: [1.17.1](https://www.npmjs.com/package/express-session)
- Handlebars.js: [4.7.6](https://www.npmjs.com/package/handlebars)
- Node MySql2: [2.3.3](https://www.npmjs.com/package/mysql2)
- Sequelize: [6.29.3](https://www.npmjs.com/package/sequelize)
- Postman: [Postman](https://www.postman.com/)
- Luxon: [Luxon](https://moment.github.io/luxon/)
- Highlight.js: [Hightlight.js](https://highlightjs.org/)
- SweetAlert.js :[SweetAlert.js](https://sweetalert.js.org/docs/)
- License Badge: [Shields.io](https://shields.io/)
- Visual Studio Code: [Website](https://code.visualstudio.com/)

## What I Learned:
1. Implementing Model-View-Controller (MVC) architecture.
2. Creating and interacting with a MySQL database using Sequelize ORM.
3. Creating and using Express.js servers and routes.
4. Using Handlebars.js to create and display dynamic templates.
5. Implementing user authentication and password hashing with bcrypt.
6. Apply css for styling, which help to recall what we learned during first month of the class.

### Continued Development:
1. Pagination for question post and comments.
2. Editing comments, Like count for comment.
3. Each user allows to hit one like each page
4. Unlike option for post and comment
5. User profile pages.

## License
This project is covered under the [MIT](https://opensource.org/licenses/MIT) license.

## Team Members
* Sonam J Sherpa
* Justin Jasso
* Dandar Ganbold
* TJ Annoreno

## Author
Follow me on Github at [Sonam J Sherpa](https://github.com/sonam-git).
Additional questions or concerns? feel free to contact me at sherpa.sjs@gmail.com
