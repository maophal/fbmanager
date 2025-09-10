import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSignInAlt } from 'react-icons/fa';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{t('settings_title')}</h1>
      <div className="list-group">
        <Link to="/login" className="list-group-item list-group-item-action">
          <FaSignInAlt /> {t('login_option')}
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
