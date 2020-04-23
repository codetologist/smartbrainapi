const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgres = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'P244w0rd',
      database : 'smartbrain'
    }
  });

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('it is working');
})

app.post('/signin', (req,res) => {signIn.handleSignIn(req,res,postgres,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,postgres, bcrypt)})
app.get('/profile/:id', (req,res) => {profile .handleProfileGet(req,res,postgres)})
app.put('/image', (req,res) => {image.handleImage(req,res, postgres)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port ${process.env.PORT}');
})