import 'antd/dist/antd.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './store/user/actionCreators';
import Navbar from '../src/Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import style from './App.module.css';
import { Layout } from 'antd';
import ModalPage from './Components/Modal/Modal';
import FooterPage from './Components/Footer/Footer';
import ItemCard from './Components/ItemCard/ItemCard';
import SettingsPerson from './Components/SettingsPerson/SettingsPerson';
import LoginPage from './Components/Login/Login';
import Account from './Components/Account/Account';
import WishList from './Components/WishList/WishList';
import Orders from './Components/Orders/Orders';
import Cart from './Components/Cart/Cart';
import Chat from './Components/Chat/Chat';
import AllCards from './Components/Cards/AllCards';
import SearchRenderAllCards from './Components/Cards/SearchRenderAllCards';
import AdminCabinet from './Components/AdminCabinet/AdminCabinet';
import AdminPanel from './Components/AdminCabinet/AdminPanel';
import AdressForm from './Components/Cart/AdressForm';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async function () {
      const userFindBack = await fetch('/check', {
        method: 'GET',
        credentials: 'include',
      });
      const jsonFromBack = await userFindBack.json();
      dispatch(getUser(jsonFromBack));
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Main />} />
        <Route path="/search" element={<SearchRenderAllCards />} />
        <Route path="testcard" element={<ItemCard></ItemCard>}></Route>
        {/* <Route path="chat" element={<Chat />} /> */}
        {/* <Route path="/admin-cabinet" element={<AdminCabinet />} /> */}
        <Route path="/category/:id" element={<AllCards></AllCards>}></Route>
          <Route path='item-card' element={<ItemCard></ItemCard>}></Route>
          {/* <Route path='chat' element={<Chat />} /> */}
        {/* <Route path='/account' element={<SettingsPerson />} /> */}
        {/* <Route path="/testcard" element={<ItemCard />} /> */}
        <Route path="/account" element={<SettingsPerson />}>
          <Route path="info" element={<Account />} />
          <Route path="wish-list" element={<WishList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="cart" element={<Cart />} />
          <Route path="address-form" element={<AdressForm />}/>
          <Route path="chat" element={<Chat />} />
          {user.status === 'admin' || user.status === 'seller' ? (
            <Route path="upload-items" element={<AdminCabinet />} />
          ) : (
            ''
          )}
          {user.status === 'admin' ? (
            <Route path="admin-panel" element={<AdminPanel />} />
          ) : (
            ''
          )}
        </Route>

          {/* <Route path='/account' element={<SettingsPerson />} /> */}
          {/* <Route path='/item-card' element={<ItemCard/>}/>
           <Route path='/account' element={<SettingsPerson />}>
            <Route path='info' element={<Account />} />
            <Route path='wish-list' element={<WishList />} />
            <Route path='orders' element={<Orders />} />
            <Route path='cart' element={<Cart />} />
            <Route path='chat' element={<Chat />} />
          </Route>       */}
        </Routes>
        <FooterPage />   
      </div>
  );
}

export default App;
