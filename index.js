import express from 'express';
import path from 'path';
import { urlencoded } from 'express';
import ejsLayouts from 'express-ejs-layouts';

//importing UserController
import UserController from './src/controller/user.controller.js';
import { connectUsingMongoose } from './src/config/mongodb.js';
//assigning express to app variable
const app = express();

// Set up EJS
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(path.join(path.resolve(), 'src', 'views')));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(path.resolve(), 'src', 'views'));


// Set up controllers and routes
const userController = new UserController();
app.get('/', userController.homeLogin);
app.post('/', userController.homeLogin);
app.get('/register', userController.register);
app.post('/register', userController.signUp);
app.post('/login',userController.signIn);
// Start the server
app.listen(8000, () => {
    console.log('Listening on http://localhost:8000');
    // Connect to MongoDB
    connectUsingMongoose();
});


