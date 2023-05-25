import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Option from './components/Option';
import Home from './Home';
import CreateTask from './CreateTask';
import './App.css';


function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} exact />
                    <Route path='/create' element={<CreateTask />} exact />
                    <Route path='/subject/:id' element={<Option />} exact />
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;