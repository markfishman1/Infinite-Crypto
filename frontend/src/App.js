import { Switch, BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MarketsList from './pages/MarketsList';
import Trade from './pages/Trade';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import UserProfile from './pages/UserProfile';
import BuyAndSell from './pages/BuyAndSell';
import { useDispatch } from 'react-redux';
import { fetchCoinList } from './store/actions/app-actions';
import { useEffect } from 'react';
import WalletOverview from './components/Dashboard';
import Dashboard from './components/WalletOverview';
function App() {
    const dispatch = useDispatch();

    //Fetch API data and insert to DB
    useEffect(() => {
        dispatch(fetchCoinList());
    }, [dispatch]);

    return (
        //exact
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/markets" element={<MarketsList></MarketsList>}></Route>
                <Route path="/trade" element={<Trade></Trade>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/profile" element={<UserProfile />}>
                    <Route path="wallet-overview" element={<Dashboard />} />
                    <Route path="dashboard" element={<WalletOverview />} />
                </Route>
                <Route path="/coin/:id" element={<CoinPage></CoinPage>}></Route>
                <Route path="/buy-and-sell/:id" element={<BuyAndSell></BuyAndSell>}></Route>
            </Routes>
        </Layout>
    );
}

export default App;
