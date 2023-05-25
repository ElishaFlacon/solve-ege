const taskService = require('../service/task.service');
const taskGenerationService = require('../service/task-generation.service');


class TaskController {
    async createTask(req, res, next) {
        try {
            // get task and files
            const task = req.body;
            const files = req.files;

            // check files and create new task and get it
            if (files) {
                const newTask = await taskService.create(task, files.picture, { 'picture': '1' });

                return res.json(newTask.rows[0]);
            }

            // create new task and get it
            const newTask = await taskService.create(task, null, { 'noPicture': '1' });

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