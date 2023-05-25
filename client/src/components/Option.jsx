import { useReducer, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import Task from './Task';


function Option() {
    // get a window params
    const params = useParams();

    // create tasks useReduser hook
    const [tasks, setTasks] = useReducer(
        (tasks, newTasks) => ({ ...tasks, ...newTasks }),
        { loading: true, data: null }
    );

    // create use effect
    useEffect(() => {
        // get all task and return array tasks
        const getTasks = async (tasksId) => {
            const arr = [];
            for (let i = 0; i < tasksId.length; i++) {
                const task = await axios.get(`http://localhost:5000/api/task/get/${tasksId[i]}`);
                arr[i] = task.data;
            }
            return arr;
        }

        // get tasks ID and
        const getData = async () => {
            const tasksId = [];
            const optionTasks = await axios.get(`http://localhost:5000/api/task/get/option/${params.id}`);

            // check
            if (optionTasks) {
                optionTasks.data.map((el) => {
                    if (el.taskId) {
                        tasksId.push(el.taskId);
                    }
                    return 0;
                });

                // get tasks array
                const tasks = await getTasks(tasksId);

                // set tasks
                setTasks({ loading: false, data: tasks });
            }
        }
        getData();
    }, [params.id]);

    // check tasks data and render it
    if (tasks.data) {
        return (
            <div className='option'>
                <h1>Какой-то предмет</h1>
                <a href="/">назад</a>
                {
                    tasks.data.map((el) =>
                        < Task
                            key={el.id}
                            taskId={el.id}
                            taskNumber={el.number}
                            taskPicture={el.picture}
                            taskDescription={el.description}
                            taskQuest={el.quest}
                        />
                    )
                }
            </div>
        );
    }
}


export default Option;