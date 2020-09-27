import { useEffect, useState } from 'react';
import { SERVER_ERRORS } from '../constants';
import { ErrorObj } from '@models/common';

const emptyPageErrors = [
  SERVER_ERRORS.STOP_NOT_FOUND,
  SERVER_ERRORS.INVALID_TIME,
  SERVER_ERRORS.NO_RESULTS_IN_TIME,
  SERVER_ERRORS.NO_TRAIN_RESULTS_IN_TIME,
  SERVER_ERRORS.COULDNT_FIND_STOP,
];


export const useErrorHandler = (err: ErrorObj) => {
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [showEmptyStatePage, setEmptyStatePage] = useState(false);

  useEffect(() => {
    if (err.status) {
      if (emptyPageErrors.includes(err.message)) {
        setEmptyStatePage(true);
      } else {
        setShowErrorPage(true);
      }
    } else {
      setShowErrorPage(false);
      setEmptyStatePage(false);
    }
  }, [err]);

  return {
    showErrorPage,
    showEmptyStatePage
  }
}