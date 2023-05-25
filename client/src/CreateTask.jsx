import { useState } from 'react'
import axios from 'axios';
import './CreateTask.css';


function CreateTask(props) {
    const [task, setTask] = useState({
        subject: '',
        number: '',
        quest: '',
        picture: '',
        answer: '',
    });

    const createTask = async () => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(task)) {
            formData.append(key, value);
        }

        const response = await axios.post('http://localhost:5000/api/task/create', formData);
        console.log(response);
    }

    const changeHandler = (event, target) => {
        if (target === 'picture') {
            setTask((prevState) => ({
                ...prevState,
                [target]: event.target.files[0]
            }));

            return;
        }

        setTask((prevState) => ({
            ...prevState,
            [target]: event.target.value
        }));
    }


    return (
        <div className='form'>
            <h1>JOPPA</h1>

            <div>Предмет</div>
            <input type="text" value={task.subject} onChange={event => changeHandler(event, 'subject')} className='place-m' />

            <div>Номер задания</div>
            <input type="text" value={task.number} onChange={event => changeHandler(event, 'number')} className='place-m' />

            <div>Задание</div>
            <textarea type="text" value={task.quest} onChange={event => changeHandler(event, 'quest')} className='place-b' />

            <div>Картинка</div>
            <input type="file" onChange={event => changeHandler(event, 'picture')} className='place-m' />

            <div>Ответ</div>
            <input type="text" value={task.answer} onChange={event => changeHandler(event, 'answer')} className='place-m' />
            <br />
            <br />
            <br />
            <button onClick={createTask}>Отправить</button>
        </div>
    )
}


export default CreateTask;