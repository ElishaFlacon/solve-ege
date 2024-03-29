import './Task.css';
import Input from './UI/input/Input';


function Task(props) {
    return (
        <div className="task">
            <div className="task__content">
                <header className='task__header'>
                    <div className='task__number'>Тип №{props.taskNumber}</div>
                    <div className='task__id'>#{props.taskId}</div>
                </header>
                <main className="task__main">
                    <div className="task__text">
                        <div className="task__description">{props.taskDescription}</div>
                        <div className="task__quest">{props.taskQuest}</div>
                        <Input name={props.name} id={props.id} />
                    </div>
                    <img className='task__img' src={"http://localhost:5000/" + props.taskPicture} alt="ЧЗХ ГДЕ КАРТИНКА?!" />
                </main>
            </div>
        </div>
    )
}


export default Task;