# Blogging-App
# Node.js Application with MongoDB, Mongoose, and EJS
### Overview
### This repository contains a Node.js application that uses MongoDB as the database, Mongoose for MongoDB operations, and EJS as the templating engine for frontend rendering. It includes a login API, user schema with password hashing, handling validation errors in Mongoose schemas, and frontend rendering using EJS.

# Installation
## Clone the repository:

## git clone <repository_url>

# Navigate to the project directory:

## Install dependencies:
### npm install


# Configuration

## MongoDB Configuration:
### Ensure MongoDB is installed and running locally or update the connection string in config/database.js.

## EJS Configuration:
### EJS templates are located in the views/ directory. Customize these templates as needed for your frontend views.

# Usage
## Start the server:

### npm start

### Access the application at http://localhost:4000.

## API Endpoints
### /login: POST endpoint for user login. Requires email and password in the request body.
### /blog/comment/:id: POST endpoint to submit comments for a blog post.
### Frontend Rendering with EJS
### The application uses EJS as the templating engine for frontend rendering. EJS templates allow you to dynamically generate HTML content based on data from the server.

### EJS templates are written in HTML with embedded JavaScript code.
### Use {<% %>} tags for control flow (if statements, loops, etc.) and <%= %> tags to output dynamic data in your templates.

## Directory Structure
### app.js: Main entry point of the application.
### routes/: Contains route handlers for different endpoints.
### models/: Defines Mongoose models for user and other entities.
### controllers/: Includes controller functions for handling API logic.
### views/: Contains EJS templates for frontend rendering.


## Feel free to contribute to this project by submitting bug fixes, enhancements, or new features via pull requests.