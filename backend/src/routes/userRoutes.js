const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/usercontroller');

router.get('/all', authMiddleware, getUsers);
router.get('/get/:id', authMiddleware, getUser);
router.put('/update/:id', authMiddleware, updateUser)
router.delete('/delete/:id', authMiddleware, deleteUser);

module.exports = router;