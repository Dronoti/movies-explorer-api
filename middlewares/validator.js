const { celebrate, Joi } = require('celebrate');

const linkRegex = /^https?:\/\/(www\.)?[\da-zA-Z-]+\.[\w-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports.linkRegex = linkRegex;

module.exports.loginDataIsValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.registerDataIsValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.updateUserDataIsValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.createMovieIsValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegex),
    trailerLink: Joi.string().required().pattern(linkRegex),
    thumbnail: Joi.string().required().pattern(linkRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieIsValid = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});
