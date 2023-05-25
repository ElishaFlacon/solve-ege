const db = require('../db');
const ApiError = require('../exceptions/api.error');
const fileService = require('./file.service');


class TaskService {
    async create(task, picture, opts) {
        if (opts['picture']) {
            // save file and get file name
            const fileName = fileService.saveFile(picture);

            // create new task and post it to db
            // ~ в поле picture передаем имя файла
            const newTask = await db.query(
                `INSERT INTO task_ege (subject, number, description, quest, picture, answer) values ($1, $2, $3, $4, $5, $6) RETURNING * `,
                [task.subject, task.number, task.description, task.quest, fileName, task.answer]
            );

            return newTask;
        }

        if (opts['noPicture']) {
            // create new task and post it to db
            const newTask = await db.query(
                `INSERT INTO task_ege (subject, number, description, quest, answer) values ($1, $2, $3, $4, $5) RETURNING * `,
                [task.subject, task.number, task.description, task.quest, task.answer]
            );

            return newTask;
        }
    }

    async update(task) {
        // check id
        if (!task.id) {
            throw ApiError.BadRequest('undefind id, id не был передан!');
        }

        // append new info from task
        const updTask = await db.query(
            'UPDATE task_ege set subject = $2, number = $3, description = $4, quest = $5 where id = $1 RETURNING *',
            [task.subject, task.number, task.description, task.quest, task.answer]
        );

        return updTask;
    }

    async getOne(id) {
        // check id
        if (!id) {
            throw ApiError.BadRequest('undefind id, id не был передан!');
        }

        // get one task by id
        const task = await db.query(
            'SELECT * FROM task_ege where id = $1',
            [Number(id)]
        );

        return task;
    }

    async tasks() {
        // get all
        const tasks = await db.query('SELECT * FROM task_ege');

        return tasks;
    }

    async delete(id) {
        // check id
        if (!id) {
            throw ApiError.BadRequest('undefind id, id не был передан!');
        }

        // remove task by id
        const delTask = await db.query(
            'DELETE FROM task_ege where id = $1 RETURNING *',
            [id]
        );

        return delTask;
    }
}


module.exports = new TaskService();