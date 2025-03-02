import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FaCommentDots, FaSearch, FaFile, FaSignOutAlt, FaTimes } from 'react-icons/fa'; // اضافه کردن آیکن بستن
import { Navigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Alert, CardActionArea } from '@mui/material';
import { GetCountOfUnreadMessages, LastUsersCheckedMeApi, getDefaultAvatarAddress, getUserProfilePhoto } from './api'; // اضافه کردن متد جدید

import { FaBars, FaBan, FaUserSlash, FaHeart, FaStar, FaEye, FaUserCircle } from "react-icons/fa";
import ChatPage from './pages/ChatPage';
import SearchPage from './pages/SearchPage';
import RegisterForm from "./pages/registerPage/RegisterForm";
import Login_Form from './pages/Login_Form';
import Profile from './pages/UsersProfile';
import UploadPicture from './pages/UploadPicture';
import UpdateProfile from './pages/UpdateProfile';
import Messages from './pages/Messages';
import BlockedUsers from "./pages/BlockedUsers";
import BlockedMeUsers from './pages/BlockedMeUsers';
import FavoritedMeUsers from './pages/FavoritedMeUsers';
import FavoriteUsers from './pages/FavoriteUsers';
import LastUsersCheckedMe from './pages/LastUsersCheckedMe';
import ForgatePassword from './pages/ForgatePassword';
import './App.css';
function App() {
  return (
    <Router>
      <Main />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login_Form />} />
        <Route path="/chat/:userId" element={<ChatPage />} />
        <Route path="/profile/:stringId" element={<Profile />} />
        <Route path="/UploadPicture" element={<UploadPicture />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route path="/login" element={<Login_Form />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/blocked" element={<BlockedUsers />} />
        <Route path="/blockedMe" element={<BlockedMeUsers />} />
        <Route path="/favoritedMe" element={<FavoritedMeUsers />} />
        <Route path="/Favorite" element={<FavoriteUsers />} />
        <Route path="/CheckedMe" element={<LastUsersCheckedMe />} />
        <Route path="/ForgatePassword" element={<ForgatePassword />} />

      </Routes>
    </Router>
  );
}

function Main() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // وضعیت منوی نام و نام خانوادگی
  const menuRef = useRef(null); // برای تشخیص کلیک بیرون از منو
  const hamburgerRef = useRef(null); // برای تشخیص کلیک روی همبرگر
  const userMenuRef = useRef(null); // برای تشخیص کلیک بیرون از منوی نام و نام خانوادگی
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null); // حالت برای عکس پروفایل
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0); // حالت برای تعداد پیام‌های خوانده‌نشده
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen); // تغییر وضعیت منوی نام و نام خانوادگی
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };


  const isRoot = window.location.pathname === '/';
  const isLoginPage = window.location.pathname.toLowerCase() === '/login'.toLowerCase();
  const isRegisterPage = window.location.pathname.toLowerCase() === '/registerForm'.toLowerCase();
  const forgatePassword = window.location.pathname.toLowerCase() === '/ForgatePassword'.toLowerCase();

  const hideHeaderAndMenu = isRoot || isLoginPage || isRegisterPage || forgatePassword;

  useEffect(() => {
    // اگر منو باز است و کاربر بیرون از منو کلیک کند، منو بسته می‌شود
    const handleClickOutside = (event) => {
      if (
        (menuRef.current && !menuRef.current.contains(event.target)) &&
        (userMenuRef.current && !userMenuRef.current.contains(event.target)) &&
        (hamburgerRef.current && !hamburgerRef.current.contains(event.target))
      ) {
        setIsMenuOpen(false); // منو را ببندید
        setIsUserMenuOpen(false); // منوی نام و نام خانوادگی را ببندید
      }
    };

    // اضافه کردن event listener به document
    document.addEventListener('click', handleClickOutside);

    // پاک کردن event listener هنگام خارج شدن از کامپوننت
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const photoUrl = await getUserProfilePhoto(userId);
        console.log('Photo URL:', photoUrl); // چک کن چی برگشته
        setProfilePhoto(photoUrl);
      }
    };
    fetchProfilePhoto();
  }, []);

  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const response = await GetCountOfUnreadMessages(); // فرض می‌کنم این تابع توی api.js تعریف شده
        console.log('Unread Messages Count:', response); // چک کن چی برگشته
        if (response.data.isSuccess) {
          setUnreadMessagesCount(response.data.model);
          console.log('(response.data.isSuccess , ' , response.data.isSuccess);
          console.log('(response.data.model , ' , response.data.model);
        }
      }
    };
    fetchUnreadMessagesCount();
  }, []);


  const defaultAvatar = getDefaultAvatarAddress();

  return (
    <div className="app-container">
      {!hideHeaderAndMenu && (
        <>
          <header className="header">
            <div className="hamburger-container" onClick={toggleMenu} ref={hamburgerRef}>
              <div className="hamburger" onClick={toggleMenu} ref={hamburgerRef}>
                <FaBars className="hamburger" onClick={toggleMenu} ref={hamburgerRef} /> {/* آیکن همبرگر */}
              </div>
              <span className="hamburger-text" onClick={toggleMenu} ref={hamburgerRef}>امکانات</span>

            </div>

            <div className="header-center">
              خوش آمدید
            </div>

            <div className="user-info user-name user-name-left" ref={userMenuRef}>
              <Link to="/Messages" className="nav-button messages-link">
                <FaCommentDots style={{ fontSize: '24px' }} /> {/* سایز بزرگ‌تر */}
                <span className="unread-count">{unreadMessagesCount}</span>
              </Link>

              <span className="user-name user-name-left" onClick={toggleUserMenu}>
                {localStorage.getItem('gender')} {' '} {localStorage.getItem('firstName')}
              </span>

              <img
                src={profilePhoto} // استفاده از state به جای تابع مستقیم
                // 
                //    src={getUserProfilePhoto(localStorage.getItem('userId'))}
                alt="Profile"
                style={styles.profileImage}
                onClick={toggleUserMenu}
                onError={(e) => {
                  e.target.onerror = null; // جلوگیری از حلقه بی‌پایان
                  e.target.src = defaultAvatar; // نمایش عکس پیش‌فرض
                }}
              />

              {isUserMenuOpen && (
                <div className="user-menu">
                  <button>
                    <Link to={`/profile/${localStorage.getItem('userId')}`} className="nav-button">
                      مشاهده پروفایل خودم
                      <FaUserCircle /> {/* آیکن پروفایل کاربر (برای نمایش پروفایل) */}
                    </Link>
                  </button>
                  <button>
                    <Link to="/update" className="nav-button">
                      ویرایش پروفایل
                      <FaFile />
                    </Link>
                  </button>
                  <button className="nav-button" onClick={handleLogout}>
                    خروج
                    <FaSignOutAlt />
                  </button>


                </div>
              )}
            </div>
          </header>

          <nav className={`navbar ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
            <div className="close-icon" onClick={() => setIsMenuOpen(false)}>
              <span className="close-text">بستن</span> {/* کلمه بستن */}
              <FaTimes /> {/* آیکن بستن */}
            </div>

            <br />
            <br />

            <ul className="nav-links">
              <li>
                <Link to="/search" className="nav-button">
                  کاربران
                  <FaSearch />
                </Link>
              </li>
              <li>
                <Link to="/Messages" className="nav-button  nav-button messages-link">
                  مرکز پیام
                    <FaCommentDots style={{ fontSize: '24px' }} /> {/* سایز بزرگ‌تر */}
                    <span className="unread-count">{unreadMessagesCount}</span>

                </Link>
              </li>
              {/* <li>
                <Link to="/update" className="nav-button">
                  ویرایش پروفایل
                  <FaFile />
                </Link>
              </li> */}
              <li>
                <Link to="/blocked" className="nav-button">
                  مسدود شده ها
                  <FaBan /> {/* آیکن ممنوعیت (بلاک) */}
                </Link>
              </li>

              <li>
                <Link to="/blockedMe" className="nav-button">
                  مسدود کنندگان
                  <FaUserSlash /> {/* آیکن کاربر حذف‌شده (برای نشان دادن بلاک) */}
                </Link>
              </li>

              <li>
                <Link to="/Favorite" className="nav-button">
                  علاقه مندی های من
                  <FaHeart /> {/* آیکن قلب (برای علاقه‌مندی‌ها) */}
                </Link>
              </li>

              <li>
                <Link to="/favoritedMe" className="nav-button">
                  علاقه مندان به من
                  <FaStar /> {/* آیکن ستاره (برای نشان دادن اهمیت) */}
                </Link>
              </li>

              <li>
                <Link to="/CheckedMe" className="nav-button">
                  بازدیدکنندگان من
                  <FaEye /> {/* آیکن چشم (برای نمایش بازدیدها) */}
                </Link>
              </li>

              {<li className="logout-button">
                <Link onClick={handleLogout} className="nav-button">
                  خروج
                  <FaUserCircle />
                </Link>
              </li>}


            </ul>
          </nav>

        </>
      )}
      {/* مسیرها */}
    </div>
  );
}
const styles = {
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userNameContainer: {
    display: 'flex',
    alignItems: 'center', // برای تراز عمودی آیکن و متن
  },
};

export default App;