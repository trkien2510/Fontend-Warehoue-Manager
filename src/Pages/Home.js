import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../Styles/HomeStyle.css'
import { getToken, removeToken } from '../Service/TokenService';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        removeToken();
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <div className='home'>
            <div className='navigation_bar'>
                <div className='account'>
                    {isLoggedIn ? <MyAcc onLogout={handleLogout} /> : <Account />}
                </div>
                <div className='product'>
                    <Link to="/product">
                        <button className='navigation_product'>Sản phẩm</button>
                    </Link>
                </div>
                <div className='category'>
                    <Link to="/category">
                        <button className='navigation_category'>Loại sản phẩm</button>
                    </Link>
                </div>
                <div className='supplier'>
                    <Link to="/supplier">
                        <button className='navigation_supplier'>Nhà cung cấp</button>
                    </Link>
                </div>
                <div className='audit_log'>
                    <Link to="/auditlog">
                        <button className='navigation_audit_log'>Hoạt động</button>
                    </Link>
                </div>
            </div>
            <div className='content_area'>
                <Outlet></Outlet>
            </div>
        </div>
    );

    function Account() {
        return (
            <div>
                <Link to="/register">
                    <button id="btn_register" type="button">Đăng ký</button>
                </Link>
                <Link to="/login">
                    <button id="btn_login" type="button">Đăng nhập</button>
                </Link>
            </div>
        );
    }

    function MyAcc({ onLogout }) {
        return (
            <div className="myaccount">
                <Link to="/profile">
                    <button className='my_profile' type="button">
                        <img src={"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} width="50px" height="50px" alt="" />
                    </button>
                </Link>
                <button className='log_out' type="button" onClick={onLogout}>
                    <img src={"https://cdn-icons-png.flaticon.com/512/1828/1828490.png"} width="35px" height="35px" alt="" />
                </button>
            </div>
        );
    }
};

export default Home;