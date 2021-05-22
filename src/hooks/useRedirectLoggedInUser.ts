import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTES } from 'src/constants/routes';
import useVerifyAuth from './useVerifyAuth';

const useRedirectLoggedInUser = () => {
  const history = useHistory();
  const { user: loggedInUser } = useVerifyAuth();

  useEffect(() => {
    if (loggedInUser?.token) {
      history.push(ROUTES.DASHBOARD);
    }
  }, [history, loggedInUser?.token]);
};

export default useRedirectLoggedInUser;
