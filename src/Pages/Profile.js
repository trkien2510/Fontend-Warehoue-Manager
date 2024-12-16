import React, { useState } from 'react';
import '../Styles/ProfileStyle.css';
import { useNavigate } from 'react-router-dom';
import updateUser from '../Service/UpdateUserService';

const Profile = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleUpdate = async () => {
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');

        if (!password || !newPassword || !confirmPassword) {
            alert('Vui lòng nhập đầy đủ thông tin mật khẩu.');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('Mật khẩu mới không khớp.');
            return;
        }

        try {
            const result = await updateUser(username, password, newPassword, email, newEmail || email);
            if (result.code === 555) {
                alert('Cập nhật thông tin thành công.');
                navigate('/');
            } else {
                alert(`Cập nhật thất bại: ${result.message}`);
            }
        } catch (error) {
            console.error('Lỗi cập nhật thông tin:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className='profile_page'>
            <div className='update_profile_form'>
                <div className='profiletitle'>
                    <strong>Thông tin người dùng</strong>
                </div>

                <hr className='hr' />

                <div className='username'>
                    <strong>Tên người dùng</strong>
                </div>
                <input
                    type='text'
                    value={localStorage.getItem('username')}
                    placeholder='Tên người dùng'
                    disabled
                />

                <div className='password'>
                    <strong>Mật khẩu</strong>
                </div>
                <input
                    type='password'
                    placeholder='Mật khẩu hiện tại'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className='password'>
                    <strong>Mật khẩu mới</strong>
                </div>
                <input
                    type='password'
                    placeholder='Mật khẩu mới'
                    autoComplete='new-password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <div className='password'>
                    <strong>Nhập lại mật khẩu mới</strong>
                </div>
                <input
                    type='password'
                    placeholder='Xác nhận mật khẩu mới'
                    autoComplete='new-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className='email'>
                    <strong>Email</strong>
                </div>
                <input
                    type='email'
                    value={localStorage.getItem('email')}
                    placeholder='Email hiện tại'
                    disabled
                />

                <div className='email'>
                    <strong>Email mới (nếu có)</strong>
                </div>
                <input
                    type='email'
                    placeholder='Email mới'
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />

                <button className='update_profile' type='button' onClick={handleUpdate}>
                    <strong>Cập nhật</strong>
                </button>

                <button className='go_home' type='button' onClick={handleGoHome}>
                    <strong>Trở về trang chủ</strong>
                </button>
            </div>
        </div>
    );
};

export default Profile;
