import './Home.css';
import { useEffect } from 'react';


function Home(props) {

    useEffect(() => {
        console.log('jopa slona');
    });


    return (
        <div className="home">
            <header className="home__header">
                <img className='home__logo' src="./favicon.png" alt="ff" />
                <div className="home__header-list">
                    <li className="subject"><a href="subject/01" className="subject__link">Русский Язык</a></li>
                    <li className="subject"><a href="subject/02" className="subject__link">Математика Профиль</a></li>
                    <li className="subject"><a href="subject/22" className="subject__link">Математика База</a></li>
                    <li className="subject"><a href="subject/25" className="subject__link">Информатика</a></li>
                </div>
            </header>
            <main className="home__main">
                <h1>РЕШУ ЕГЭ СВЕРХ СЫРАЯ ВЕРСИЯ</h1>
                <div className="home__text">
                    Это учебный проект и мой первый опыт создания fullstack приложения. В нем сейчас не хватает функционала, очень много, но начало положено. В будущем будет добавлена возможность регистрации (на сервере уже есть функционал), добавится возможность отправлять ответы, таймер, возможность посмотреть решеные варианты, а так-же функционал для админки, чтобы можно было загружать новые варианты ЕГЭ.
                </div>
                <div className="home__text">
                    а пока что довольствуеся тем, что есть (:
                </div>
                <div className="home__text">
                    сделай так чтобы можно было заливать задания без картинки!!!!
                </div>
                <div className="home__text">
                    (пока что доступна только математика профиль)
                </div>
                <a href="create" className="home__text" style={{ color: 'red' }}>
                    создать задание
                </a>
            </main>
            <footer className="home__footer">
                <a href='https://github.com/ElishaFlacon' className="home__text">
                    MY GITHUB
                </a>
            </footer>
        </div>
    )
}


export default Home;