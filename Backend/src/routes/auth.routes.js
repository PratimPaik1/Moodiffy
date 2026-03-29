const {Router}=require("express")

const authController=require('../controllers/auth.controller')
const identifyUser=require('../middlewares/auth.middlewares')

const authRouter=Router()
/**
 * /api/auth/register
 * for user regeistration
 * error 409 idf user alredy exists
 * sucess 201
 * 
 * */ 
authRouter.post('/register',authController.registerController)

/**
 * /api/auth/login
 * for user login
 * error 400 invalid cred
 * sucess 200
 */
authRouter.post('/login',authController.loginController)

authRouter.get('/getMe',identifyUser,authController.getMe)

authRouter.get('/logout',authController.logout)

module.exports=authRouter