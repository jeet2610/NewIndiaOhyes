const isBrowser = () => typeof window !== 'undefined';

const getUser = () =>
    isBrowser()
    && window.localStorage.getItem('indiaohyesuser')
    && window.localStorage.getItem('indiaohyesuser');

const setUser = user => user
    ? window.localStorage.setItem('indiaohyesuser', user)
    : window.localStorage.removeItem('indiaohyesuser');

const login = user => setUser(user);

const isLoggedIn = () => Boolean(getUser());

const logout = callback => {
    setUser();
    callback?.();
};

export default isLoggedIn;
export { getUser, login, logout };