import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../redux/actions/authActions';

const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{t('settings_title')}</h1>
      <div className="list-group">
        <button onClick={handleLogout} className="list-group-item list-group-item-action">
          <FaSignOutAlt /> {t('logout_option', 'Logout')}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;