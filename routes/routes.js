const express = require('express');
const { loginDataIsValid, registerDataIsValid } = require('../middlewares/validator');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

router.post('/signin', express.json(), loginDataIsValid, login);
router.post('/signup', express.json(), registerDataIsValid, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
