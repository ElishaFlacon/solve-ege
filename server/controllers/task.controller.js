const taskService = require('../service/task.service');
const ApiError = require('../exceptions/api.error');
const taskGenerationService = require('../service/task-generation.service');


class TaskController {
    async createTask(req, res, next) {
        try {
            // get task and picture
            const task = req.body;
            const { picture } = req.files;

            // create new task and get it
            const newTask = await taskService.create(task, picture);

            return res.json(newTask.rows[0]);
        } catch (e) {
            next(e);
        }
    }

    async updateTask(req, res, next) {
        try {
            // upddate task
            const task = await taskService.update(req.body);

            return res.json(task.rows[0]);
        } catch (e) {
            next(e);
        }
    }

    async getOneTask(req, res, next) {
        try {
            // get task id
            const task = await taskService.getOne(req.params.id);

            return res.json(task.rows[0]);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            // get all tasks
            const tasks = await taskService.tasks();

            return res.json(tasks.rows);
        } catch (e) {
            next(e);
        }
    }

    async deleteTask(req, res, next) {
        try {
            // remove task
            const task = await taskService.delete(req.params.id);

            return res.json(task.rows[0]);
        } catch (e) {
            next(e);
        }
    }

    async generateTaskOption(req, res, next) {
        try {
            // generate option
            const option = await taskGenerationService.generateOption(req.params.id);

            return res.json(option);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new TaskController();