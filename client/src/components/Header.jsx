import Button from './UI/button/Button';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header className="header">
            <Link to="/" className="subject">
                <img className='logo' src="../favicon.png" alt="home" />
            </Link>

            <div className="header-list">
                <Link to="subject/01" className="subject">
                    <Button>
                        Русский Язык
                    </Button>
                </Link>
                <Link to="subject/02" className="subject">
                    <Button>
                        Математика Профиль
                    </Button>
                </Link>
                <Link to="subject/22" className="subject">
                    <Button>
                        Математика База
                    </Button>
                </Link>
                <Link to="subject/25" className="subject">
                    <Button>
                        Информатика
                    </Button>
                </Link>
                <Link to="create" className="subject">
                    <Button>
                        Создать задание
                    </Button>
                </Link>
                <Link to="login" className="subject">
                    <Button>
                        Войти
                    </Button>
                </Link>
            </div>
        </header>
    )
}


export default Header;