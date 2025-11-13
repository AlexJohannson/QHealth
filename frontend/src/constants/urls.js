const baseURL = '/api';

const auth = '/auth';
const users = '/users'
const roles = '/roles';
const securityList = '/security';

const urls = {
    auth: {
        login: auth,
        refresh: `${auth}/refresh`,
        activateAccount: token => `${auth}/activate/${token}`,
        siteRole: `${auth}/qhealth_role`,
        recovery: `${auth}/recovery`,
        recoveryPassword: token =>`${auth}/recovery_password/${token}`,
        socket: `${auth}/socket`,
    },
    users: {
        list: users,
        registrationUserAccount: users,
    },
    roles: {
        list: roles,
    },
    securityList: {
        list: securityList,
    }
}

export {
    baseURL,
    urls
}
