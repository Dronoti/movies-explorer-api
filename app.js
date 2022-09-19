require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { limiter } = require('./middlewares/rate-limit');
const router = require('./routes');
const { handleErrors } = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  NODE_ENV = 'dev',
  DATABASE_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(cors());

app.use(helmet());

mongoose.connect(
  NODE_ENV === 'production'
    ? DATABASE_URL
    : 'mongodb://localhost:27017/filmsdb',
  { useNewUrlParser: true },
);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT);
