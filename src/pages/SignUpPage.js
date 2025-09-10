import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { signup } from '../redux/actions/authActions';
import { useTranslation } from 'react-i18next';

const SignUpPage = ({ signup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up Data:', { email, password, confirmPassword });
    if (password !== confirmPassword) {
      toast.error(t('passwords_do_not_match'));
      return;
    }
    signup(email, password);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>{t('sign_up_title')}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">{t('email_address')}</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder={t('enter_email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">{t('password')}</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder={t('password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">{t('confirm_password')}</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder={t('confirm_password')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">{t('sign_up_title')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { signup })(SignUpPage);
