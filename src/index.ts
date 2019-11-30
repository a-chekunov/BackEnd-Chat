import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'

import {DialogController, MessageController, UserController} from './controllers'

const app = express();

app.use(bodyParser.json());

const User = new UserController();
const Dialog = new DialogController();
const Messages = new MessageController();

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
});

app.get('/user/:id', User.show);
app.post('/user/registration', User.create);
app.delete('/user/:id', User.delete);

app.get('/dialogs', Dialog.show);
app.post('/dialogs', Dialog.create);
app.delete('/dialogs/:id', Dialog.delete);

app.get('/messages', Messages.show);
app.post('/messages', Messages.create);
// app.delete('/messages/:id', Messages.delete);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
