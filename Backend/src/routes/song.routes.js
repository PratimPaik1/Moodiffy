const {Router}=require("express")
const songController=require("../controllers/song.controller")

const upload=require('../middlewares/upload.middleware')

const songRouter=Router()


songRouter.post('/upload',upload.single("song"),songController.uploadSong)   
 
songRouter.get('/getSong',songController.getSong)

module.exports=songRouter