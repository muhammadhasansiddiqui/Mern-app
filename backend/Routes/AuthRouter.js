const { signup, login } = require('../Controllers/AuthController');
const {  loginValidation, signupValidation } = require('../middlewares/AuthValidation');

const router  = require('express').Router();


router.post('/login', loginValidation ,login); 
router.post('/signup',signupValidation ,signup); 
 

module.exports = router;