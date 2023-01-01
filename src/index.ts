import configureDI from './configure.di';
import configureRouter from './configure.router';


const express = require('express');

const bodyParser = require('body-parser');

const diContainer = configureDI();
const app = express();


app.use(bodyParser.json());

configureRouter(app, diContainer);

app.listen(3000, () => {
    console.log('Listening at Port 3000');
});
