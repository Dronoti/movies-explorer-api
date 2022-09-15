const express = require('express');
const {
  updateUserData,
  getMyUser,
} = require('../controllers/users');
const { updateUserDataIsValid } = require('../middlewares/validator');

const router = express.Router();

router.get('/me', getMyUser);
router.patch('/me', express.json(), updateUserDataIsValid, updateUserData);

module.exports = router;
