import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Browse from './layouts/Browse';
import BrowseFoods from './pages/BrowseFoods';
import Food from './pages/Food';
import BrowseCreations from './pages/BrowseCreations';
import NewCreation from './pages/NewCreation';
import Create from './layouts/Create';
import MyCreations from './pages/MyCreations';
import Auth from './layouts/Auth';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Creation from './pages/Creation';

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
                            path='/home'
                            element={<Home />}
                        />
                        {/* <Route
                            path='/browse'
                            element={<Browse />}
                        >
                            <Route
                                path='/browse/foods'
                                element={<BrowseFoods />}
                            >
                                <Route
                                    path='/browse/foods/:foodId'
                                    element={<Food />}
                                />
                            </Route>
                            <Route
                                path='/browse/creations'
                                element={<BrowseCreations />}
                            />
                        </Route> */}

                        {/* <Route
                            path='/create'
                            element={<Create />}
                        >  
                            <Route
                                path='/create/my'
                                element={<MyCreations />}   
                            />
                            <Route
                                path='/create/new'
                                element={<NewCreation />}
                            />
                        </Route> */}

                        <Route
                            path='/creation'
                            element={<BrowseCreations />}
                        >
                            <Route
                                path='/creation/:creationId'
                                element={<Creation />}
                            />
                        </Route>

                        <Route
                            path='/food'
                            element={<BrowseFoods />}
                        >
                            <Route
                                path='/food/:foodId'
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
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}