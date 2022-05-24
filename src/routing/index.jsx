// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from 'react-router-dom';
import AddPage from '../pages/add'
import App from "../pages/app";
import DevbyPage from "../pages/devby";
import EditPage from "../pages/edit";
import MyPage from "../pages/my";

const RouterComponent = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<App />} exact strict />
                <Route path='/devby' element={<DevbyPage />} exact strict />
                <Route path='/devby/:id' element={<DevbyPage />} exact strict />
                <Route path='/my' element={<MyPage />} exact strict />
                <Route path='/my/add' element={<AddPage />} exact strict />
                <Route path='/my/:id' element={<MyPage />} exact strict />
                <Route path='/my/:id/edit' element={<EditPage />} exact strict />

            </Routes>
        </Router>
    )
}

export default RouterComponent