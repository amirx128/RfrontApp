import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import SearchPage from './pages/SearchPage';
import RegisterForm from "./pages/registerPage/RegisterForm"; // مسیر صحیح کامپوننت ثبت‌نام
import Login_Form from './pages/Login_Form';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div>
        {/* منو لینک‌ها */}
        <nav>
          <ul>
            <li>
              <Link to="/chat/123">به صفحه چت برو</Link>
            </li>
            <li>
              <Link to="/search">به صفحه جستجو برو</Link>
            </li>
            <li>
              <Link to="/registerForm">ثبت نام</Link>
            </li>
            <li>
              <Link to="/login">loginnnn</Link>
            </li>
            <li>
              <Link to={`/profile/172aeb93-c607-4e69-86ba-a4fb0bcc03c7`}>به پروفایل کاربر برو</Link>
            </li>
          </ul>
        </nav>

        {/* تعریف مسیرهای اپلیکیشن */}
        <Routes>
          <Route path="/chat/:userId" element={<ChatPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile/:stringId" element={<Profile />} />
          <Route path="/registerForm" element={<RegisterForm />} /> {/* استفاده‌ی صحیح از کامپوننت */}
          <Route path="/login" element={<Login_Form />} /> {/* استفاده‌ی صحیح از کامپوننت */}
          {/* سایر مسیرها */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
