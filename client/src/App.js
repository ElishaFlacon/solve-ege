import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Option from './components/Option';
import Home from './Home';
import CreateTask from './CreateTask';
import './App.css';
import Login from './pages/Login';
import { observer } from 'mobx-react-lite';


function App() {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])


    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} exact />
                    <Route path='/login' element={<Login />} exact />
                    <Route path='/create' element={<CreateTask />} exact />
                    <Route path='/subject/:id' element={<Option />} exact />
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default observer(App);