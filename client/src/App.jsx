import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './style.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import BrowseFoods from './pages/BrowseFoods';
import Food from './pages/Food';
import Auth from './layouts/Auth';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Creation from './pages/Creation';
import Creations from './layouts/Creations';
import Users from './layouts/Users';
import User from './pages/User';
import Browse from './pages/Browse';
import Create from './pages/Create';
import Social from './layouts/Social';
import Following from './pages/Following';
import Discover from './pages/Discover';

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
                                element={<Create />}
                            >
                                <Route
                                    path='/creations/create/:creationId'
                                />
                            </Route>

                            <Route
                                path='/creations/browse'
                                element={<Browse />}
                            >
                                <Route
                                    path='/creations/browse/:creationId'
                                />
                            </Route>
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
                                index
                                element={<Navigate to={'/auth/signup'} />}
                            />
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
                            path='/social'
                            element={<Social />}
                        >

                            <Route
                                index
                                element={<Navigate to={'/social/discover'} />}
                            />

                            <Route
                                path='/social/following'
                                element={<Following />}
                            />

                            <Route
                                path='/social/discover'
                                element={<Discover />}
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