const express = require('express');
const {
  createMovie,
  getAllMovies,
  deleteMovieById,
} = require('../controllers/movies');
const {
  createMovieIsValid,
  deleteMovieIsValid,
} = require('../middlewares/validator');

const router = express.Router();

router.get('/', getAllMovies);
router.post('/', express.json(), createMovieIsValid, createMovie);
router.delete('/:movieId', deleteMovieIsValid, deleteMovieById);

module.exports = router;
