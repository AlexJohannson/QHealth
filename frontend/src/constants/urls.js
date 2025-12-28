const baseURL = '/api';

const auth = '/auth';
const users = '/users'
const roles = '/roles';
const securityList = '/security';
const diagnostics = '/diagnostics';
const bookingDiagnostic = '/booking_diagnostic';
const bookingDoctor = '/booking_doctor';
const patientJournal = '/patient_card';
const patientRecipe = '/patient_recipe';


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
        patientCards: `${users}/patient`,
        verifyEmail: token => `${users}/verify_email/${token}`,
    },
    roles: {
        list: roles,
    },
    securityList: {
        list: securityList,
    },
    diagnostics: {
        list: diagnostics,
    },
    bookingDiagnostic: {
        list: bookingDiagnostic,
    },
    bookingDoctor: {
        list: bookingDoctor,
    },
    patientJournal: {
        list: patientJournal,
    },
    patientRecipe: {
        list: patientRecipe,
    }
}

export {
    baseURL,
    urls
}
