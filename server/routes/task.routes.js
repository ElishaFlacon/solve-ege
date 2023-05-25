const Router = require('express').Router;
const taskController = require('../controllers/task.controller');


const router = new Router();


router.post('/create', taskController.createTask);
router.get('/get/all', taskController.getAll);
router.get('/get/:id', taskController.getOneTask);
router.get('/get/option/:id', taskController.generateTaskOption);
router.put('/update', taskController.updateTask);
router.delete('/remove/:id', taskController.deleteTask);


module.exports = router;