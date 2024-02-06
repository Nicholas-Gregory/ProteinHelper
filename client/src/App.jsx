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
                            element={<Navigate to='/home' />}
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
                                element={<Navigate to='/explore/combine' />}
                            />

                            <Route
                                path='/explore/browse'
                                element={<Browse />}
                            >
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
                                    element={<Navigate to='/explore/combine/new' />}
                                />

                                <Route
                                    path='/explore/combine/new'
                                    element={<CombineNew />}
                                >
                                    <Route
                                        index
                                        element={<Navigate to='/explore/combine/new/search' />}
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
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}