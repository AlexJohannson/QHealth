const baseURL = '/api';

const auth = '/auth';
const users = '/users'

const urls = {
    auth: {
        login: auth,
        refresh: `${baseURL}/auth/refresh`,
        siteRole: `${auth}/qhealth_role`,
        socket: `${auth}/socket`,
    },
   users: {
    list: users,
    registrationUserAccount: `${baseURL}/users`,
  },

}

export {
    baseURL,
    urls
}
