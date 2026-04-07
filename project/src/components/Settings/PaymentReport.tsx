import React from 'react';
import IframeContainer from '../common/IframeContainer';
import { PROJECT_URLS, ROUTES } from '../../constants/routes';

const PaymentReport = () => {
  return (
    <IframeContainer
      src={PROJECT_URLS[ROUTES.PAYMENT_REPORT]}
      title="Report de Pagamentos"
      data-iframe="payment-report"
    />
  );
};

export default PaymentReport;