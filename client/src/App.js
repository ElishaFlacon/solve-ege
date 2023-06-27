import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Option from './components/Option';
import Home from './Home';
import CreateTask from './CreateTask';
import './App.css';
import Login from './pages/Login';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])


    return (
        <div className='wrapper'>
            <BrowserRouter>
                <Header />

                <div className="app">
                    <Routes>
                        <Route path='/' element={<Home />} exact />
                        <Route path='/login' element={<Login />} exact />
                        <Route path='/create' element={<CreateTask />} exact />
                        <Route path='/subject/:id' element={<Option />} exact />
                    </Routes>
                </div>

                <Footer />
            </BrowserRouter>
        </div>
    );
}


export default observer(App);