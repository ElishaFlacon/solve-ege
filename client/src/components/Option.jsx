import { useReducer, useEffect, useState, useMemo } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Task from './Task';
import Button from './UI/button/Button';


function Option() {
    const [answers, setAnswers] = useState([]);

    // get a window params
    const params = useParams();

    // create tasks useReduser hook
    const [tasks, setTasks] = useReducer(
        (tasks, newTasks) => ({ ...tasks, ...newTasks }),
        { loading: true, data: null, error: false }
    );

    const checkAnswers = (event) => {
        let checkList = [];
        event.preventDefault();

        for (let index = 1; index < event.target.length; index++) {
            const answer = event.target[index].value;
            const correct = tasks.data[index - 1].answer;

            checkList.push({
                answer: answer,
                correct: correct,
                isRight: answer === correct,
            });
        }
        console.log(checkList);
        setAnswers(checkList);
    }

    //! там ниже говно, я не буду это переписывать, пусть останеться на память :P
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
        try {
            const tasksId = [];
            const optionTasks = await axios.get(`http://localhost:5000/api/task/get/option/${params.id}`);

            optionTasks.data.map((el) => {
                if (el.id) {
                    tasksId.push(el.id);
                }
                return 0;
            });

            // get tasks array
            const tasks = await getTasks(tasksId);

            // set tasks
            setTasks({ loading: false, data: tasks, error: false });
        } catch (error) {
            setTasks({ loading: false, data: null, error: true });
        }
    }

    // create use effect
    useEffect(() => {
        setTasks({ loading: true, data: null, error: false });
        getData();
    }, [params.id]);


    // check tasks data and render it
    if (tasks.error) {
        return <h1>Произошла какая-то ошибка или заданий для этого предмета нет!</h1>
    }

    if (!tasks.loading) {
        return (
            <div className='option'>
                <h1>Код предмета: {tasks.data[0].subject}</h1>

                <form action="" onSubmit={checkAnswers}>
                    <Button type="submit">проверить (результат выводится в консоли)</Button>
                    {
                        tasks.data.map((el) =>
                            <Task
                                key={el.id}
                                taskId={el.id}
                                taskNumber={el.number}
                                taskPicture={el.picture}
                                taskDescription={el.description}
                                taskQuest={el.quest}
                                id={el.number}
                                name={el.number}
                            />
                        )
                    }
                </form>
            </div>
        );
    }

    return <h1>Загрузка...</h1>
}


export default Option;