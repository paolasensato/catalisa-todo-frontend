import { Navigate } from 'react-router-dom';

import LocalStorageHelper from '../helpers/localstorage-helper';

const PrivateRoute = ({ children }) => (
  LocalStorageHelper.isAuthenticated()
    ? children
    : <Navigate to="/login" />
);

export default PrivateRoute;
