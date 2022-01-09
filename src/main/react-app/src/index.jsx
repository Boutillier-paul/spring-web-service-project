import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import './style/index.css'

import Home from './pages/Home';
import Auth from './pages/Auth';
import Header from "./components/Header";
import Error from "./components/Error";
import Rooms from "./pages/Rooms";
import Room from "./pages/Room";

const getToken = () => {
    return sessionStorage.getItem('token')
}

ReactDOM.render(
    <React.StrictMode>
        <Router>
            {getToken() &&
                <>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/rooms/:roomId" element={<Room />} />
                        <Route path="/*" element={<Error />} />
                    </Routes>
                </>
            }

            {!getToken() && <Routes><Route path="/*" element={<Auth/>} /></Routes>}
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
