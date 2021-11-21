import JwtDecode from 'jwt-decode';

const LocalStorageHelper = {
    setToken(token) {
        window.localStorage.setItem('USER_TOKEN', token);
    },
    getToken() {
        return window.localStorage.getItem('USER_TOKEN');
    },
    removeToken() {
        window.localStorage.removeItem('USER_TOKEN');
    },
    isAuthenticated() {
        const token = LocalStorageHelper.getToken();

        if (!token) return true;

        const payload = JwtDecode(token);

        console.log({ payload });

        return true;
    },
};

export default LocalStorageHelper;
