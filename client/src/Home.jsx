import './Home.css';


function Home() {
    return (
        <div className="home">
            <main className="home__main">
                <h1>
                    РЕШУ ЕГЭ (проект закрыт)
                </h1>
                <div className="home__text">
                    Это учебный проект - мой первый опыт создания fullstack приложения
                </div>
                <div className="home__text">
                    В нем реализован функционал регистрации на JWT токенах и генерация вариантов... на этом все :P
                </div>
                <div className="home__text">
                    Мне больше не интересно его развивать и поддерживать, он выполнил свою функцию учебного проекта - дал мне необходимые стартовые знания, благодоря которым я смог завершить больше 7 проектов за последние пол года. Спасибо!
                </div>
            </main>
        </div>
    )
}


export default Home;