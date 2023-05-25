const db = require('../db');
const ApiError = require('../exceptions/api.error');


class OptionGenerationService {
    async getRandomTask(subjectId, taskNumber) {
        // get count task
        const count = await db.query(
            'select count(id) from task_ege where subject=$1 and number=$2',
            [subjectId, taskNumber]
        );

        // get task id
        const tasksId = await db.query(
            'select id from task_ege where subject=$1 and number=$2',
            [subjectId, taskNumber]
        );

        // generate random task
        const randomTaskNumber = Math.floor(Math.random() * count.rows[0].count);
        const task = tasksId.rows[randomTaskNumber];

        // return obj
        return {
            taskNumber: taskNumber,
            taskId: task.id,
        };
    }

    async generateOption(id) {
        // check id
        if (!id) {
            throw ApiError.BadRequest('undefind id, id не был передан!');
        }

        // create return constant
        const option = [
            { subject: id }
        ];

        // get count tasks in subject
        const countTasks = await db.query(
            'select tasks from subjects_ege where id = $1',
            [id]
        );

        // generate array of random task id
        for (let num = 1; num <= countTasks.rows[0].tasks; num++) {
            const task = await this.getRandomTask(id, num);
            option.push(task);
        }

        return option;
    }
}


module.exports = new OptionGenerationService();