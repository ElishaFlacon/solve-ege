import React, { useContext, useEffect, useState } from 'react';
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    useEffect(() => {
        store.checkAuth();
    }, [])

    console.log(store);

    return (
        <div>
            {store.isAuth && <div>вы авторизованы под {store.user.email}</div>}
            <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                placeholder='Почта'
            />
            <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder='Пароль'
            />
            <Button onClick={() => store.login(email, password)}>
                Войти
            </Button>
            <Button onClick={() => store.registration(email, password)}>
                Регистрация
            </Button>
            <Button onClick={() => store.logout()}>
                выйти
            </Button>
        </div>
    );
}


export default observer(LoginForm);