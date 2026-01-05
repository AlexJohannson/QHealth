let navigateFn = null;

const setNavigate = (navigate) => {
    navigateFn = navigate;
};

const navigate = (path) => {
    if (navigateFn) {
        navigateFn(path);
    }
};

export {setNavigate, navigate};