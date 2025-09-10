import React from 'react';
import pricingPlans from '../config/pricingPlans';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PricePage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{t('our_pricing_plans')}</h1>
      <div className="row justify-content-center">
        {pricingPlans.map((plan, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white text-center">
                <h4 className="my-0 font-weight-normal">{plan.category}</h4>
              </div>
              <div className="card-body d-flex flex-column">
                <h1 className="card-title pricing-card-title text-center">${plan.price} <small className="text-muted">{t('per_month')}</small></h1>
                <ul className="list-unstyled mt-3 mb-4 flex-grow-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-center">{feature}</li>
                  ))}
                </ul>
                <Link to="/signup" className="btn btn-lg btn-block btn-outline-primary mt-auto">{t('sign_up_for')} {plan.category}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricePage;
