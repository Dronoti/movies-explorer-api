require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { limiter } = require('./middlewares/rate-limit');
const router = require('./routes/routes');
const { handleErrors } = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(cors());

app.use(helmet());

mongoose.connect('mongodb://localhost:27017/moviesdb', { useNewUrlParser: true });

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT);
