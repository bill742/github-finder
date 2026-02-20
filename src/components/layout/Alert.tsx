import React, { useContext } from 'react';
import { useAlertContext } from '../../context/alert/alertContext';

const Alert = () => {
  const { alert, setAlert } = useAlertContext();

  return (
    (alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.msg}
      </div>
    )) || <></>
  );
};

export default Alert;
