const { Router } = require("express");
const {getTask,getTasks,addTask,deleteTask,editTask}=require('./controller/task-controller')
const { loginUser, registerUser } = require('./controller/user-controller');
const {tokenDecrypt}=require('./middleware/tokenDecrypt')
const router = Router();

//user
router.post('/signupUser', registerUser);
router.post('/loginUser', loginUser);

//task
router.post('/addTask',tokenDecrypt,addTask)
router.get('/getTasks',tokenDecrypt,getTasks)
router.delete('/deleteTask/:Id',tokenDecrypt,deleteTask)
router.put('/editTask/:Id',tokenDecrypt,editTask)
router.get('/getTask/:Id',tokenDecrypt,getTask)

module.exports = router;
