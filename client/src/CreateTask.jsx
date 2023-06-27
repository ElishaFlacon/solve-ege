import { useState } from 'react'
import axios from 'axios';
import './CreateTask.css';
import Input from './components/UI/input/Input';
import Button from './components/UI/button/Button';


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
            <h1>Загрузите задание</h1>

            <div>Предмет</div>
            <Input type="text" value={task.subject} onChange={event => changeHandler(event, 'subject')} />

            <div>Номер задания</div>
            <Input type="text" value={task.number} onChange={event => changeHandler(event, 'number')} />

            <div>Задание</div>
            <textarea type="text" value={task.quest} onChange={event => changeHandler(event, 'quest')} className='place-b' />

            <div>Картинка</div>
            <Input type="file" onChange={event => changeHandler(event, 'picture')} />

            <div>Ответ</div>
            <Input type="text" value={task.answer} onChange={event => changeHandler(event, 'answer')} />
            <br />
            <br />
            <br />
            <Button onClick={createTask}>Отправить</Button>
        </div>
    )
}


export default CreateTask;