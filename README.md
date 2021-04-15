# Capstone Project Title 
This is an application for people topublicly document information about surfing. Users will be guided to an area to store thoughts and information.

## 1. Working Prototype 
(Example) You can access a working prototype of the React app here: https://surf-jotz-thechunkypumpkinhead.vercel.app/ and Node app here: https://your-app-server.herokuapp.com/


## 2. User Stories
This app is for two types of user: a visitor and user
* I want to understand what I can do with this app 
* so I can decide if I want to use it

#### Landing Page
* as a visitor
* I want to understand what I can do with this app 
* so I can decide if I want to use it

 ####     About Page
as a logged in user
I want to learn about what trigger point therapy is
so I can treat my pain


## 3. Functionality 
The app's functionality includes:
*user can record information

## 4. Technology 
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Heroku, DBeaver



## 6. Front-end Structure - React Components Map 
* Index.js (stateless)
**App.js (stateful)
**LandingPage.js (stateless)
**Home.js (stateful) -  ( image, title, content, )
**About.js (stateless)
**Navbar.js (stateful) - user table
**Noteform.js (stateful) - jotz table ( title, content, date-created)

## 7. Back-end Structure - Business Objects 
* Users (database table)

id (auto-generated)
username (email validation)
full name (first & last name)
password (at least 8 chars, at least one alpha and a special character validation)
(Trigger Points) Results (database table)

id (auto-generated)
image (image)
title (note title)
content (note text)
date-created (auto generated)
trigger_points_user (database table)

id (auto-generated)
user_id (foreign key to match users (id))
trigger_points_id (foreign key to match trigger_points (id))
Notes (database table)

id (auto-generated)
trigger_point_id(foreign key to match trigger point table (id))
title (note title)
content (note text)
date-created (auto generated)

## Screenshots 
(Example) Landing Page
:-------------------------:
![AboutPage](/github-images/screenshots/about-screenshot.png)
HomePage
![HomePage](/github-images/screenshots/home-screenshot.png)
CreatePage
![CreatePage](/github-images/screenshots/create-screenshot.png)
JotzPage
![JotzPage](/github-images/screenshots/jotz-screenshot.png)

## Development Roadmap (to do later)
This is v1.0 of the app, but future enhancements are expected to include:
* Ability to delete saved notes
*Ability to edit saved notes

## How to run it 
Use command line to navigate into the project folder and run the following in terminal

### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test
