import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './style.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import BrowseFoods from './pages/BrowseFoods';
import Food from './pages/Food';
import NewCreation from './pages/NewCreation';
import Auth from './layouts/Auth';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Creation from './pages/Creation';
import Creations from './pages/Creations';
import Users from './layouts/Users';
import User from './pages/User';
import Browse from './pages/Browse';

export default function App({}) {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<MainLayout />}
                    >
                        <Route
                            index
                            element={<Navigate to={'/home'} />}
                        />
                        <Route
                            path='/home'
                            element={<Home />}
                        />
                        <Route
                            path='/creations'
                            element={<Creations />}
                        >                        
                            <Route
                                index
                                element={<Navigate to={'/creations/create'} />}
                            />

                            <Route
                                path='/creations/:creationId'
                                element={<Creation />}
                            />

                            <Route
                                path='/creations/create'
                                element={<NewCreation />}
                            />

                            <Route
                                path='/creations/browse'
                                element={<Browse />}
                            />
                        </Route>

                        <Route
                            path='/foods'
                            element={<BrowseFoods />}
                        >
                            <Route
                                path='/foods/:foodId'
                                element={<Food />}
                            />
                        </Route>

                        <Route
                            path='/auth'
                            element={<Auth />}
                        >
                            <Route
                                path='/auth/signup'
                                element={<CreateAccount />}
                            />

                            <Route
                                path='/auth/login'
                                element={<Login />}
                            />
                        </Route>
                        <Route
                            path='/users'
                            element={<Users />}
                        >
                            <Route
                                path='/users/:userId'
                                element={<User />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}