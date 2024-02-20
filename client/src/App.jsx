import { 
    BrowserRouter, 
    Navigate, 
    Route, 
    Routes 
} from 'react-router-dom';
import './style.css';
import MainLayout from './layouts/MainLayout';
import Explore from './layouts/Explore';
import Browse from './layouts/Browse';
import BrowseSearch from './pages/BrowseSearch';
import BrowseNew from './pages/BrowseNew';
import BrowseFriends from './pages/BrowseFriends';
import Combine from './layouts/Combine';
import CombineNew from './layouts/CombineNew';
import FoodSearch from './pages/FoodSearch';
import Combination from './layouts/Combination';
import User from './layouts/User';
import UserPage from './pages/UserPage';
import Home from './pages/Home';
import Auth from './layouts/Auth';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserInfo from './pages/UserInfo';
import UserCombinations from './pages/UserCombinations';
import UserGoals from './pages/UserGoals';

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
                            element={<Navigate to='/home' replace={true}/>}
                        />

                        <Route
                            path='/home'
                            element={<Home />}
                        />

                        <Route
                            path='/explore'
                            element={<Explore />}
                        >
                            <Route
                                index
                                element={<Navigate to='/explore/combine' replace={true}/>}
                            />

                            <Route
                                path='/explore/browse'
                                element={<Browse />}
                            >
                                <Route
                                    index
                                    element={<Navigate to='/explore/browse/search' replace={true}/>}
                                />

                                <Route
                                    path='/explore/browse/search'
                                    element={<BrowseSearch />}
                                />

                                <Route
                                    path='/explore/browse/new'
                                    element={<BrowseNew />}
                                />

                                <Route
                                    path='/explore/browse/friends'
                                    element={<BrowseFriends />}
                                />
                            </Route>

                            <Route
                                path='/explore/combine'
                                element={<Combine />}
                            >
                                <Route
                                    index
                                    element={<Navigate to='/explore/combine/new' replace={true}/>}
                                />

                                <Route
                                    path='/explore/combine/new'
                                    element={<CombineNew />}
                                >
                                    <Route
                                        index
                                        element={<Navigate to='/explore/combine/new/search' replace={true}/>}
                                    />

                                    <Route
                                        path='/explore/combine/new/search'
                                        element={<FoodSearch />}
                                    />                                    
                                </Route>

                                <Route
                                    path='/explore/combine/:combinationId'
                                    element={<Combination />}
                                >
                                    <Route
                                        path='/explore/combine/:combinationId/search'
                                        element={<FoodSearch />}
                                    />
                                </Route>
                            </Route>
                        </Route>

                        <Route
                            path='/user'
                            element={<User />}
                        >
                            <Route
                                path='/user/:userId'
                                element={<UserPage />}
                            >
                                <Route
                                    path='/user/:userId/info'
                                    element={<UserInfo />}
                                />

                                <Route
                                    path='/user/:userId/combinations'
                                    element={<UserCombinations />}
                                />

                                <Route
                                    path='/user/:userId/goals'
                                    element={<UserGoals />}
                                />
                            </Route>
                        </Route>

                        <Route
                            path='/auth'
                            element={<Auth />}
                        >
                            <Route
                                index
                                element={<Navigate to='/auth/signup' replace={true}/>}
                            />

                            <Route
                                path='/auth/signup'
                                element={<Signup />}
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