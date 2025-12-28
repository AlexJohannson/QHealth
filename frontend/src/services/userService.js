import {apiService} from './apiService';
import {urls} from '../constants/urls';

const userService = {
    getAll(params) {
        return apiService.get(urls.users.list, {params}).then(res => res.data);
    },
    getAllPatientCard(params) {
        return apiService.get(urls.users.patientCards, {params}).then(res => res.data);
    },
    getPatientId(id) {
        return apiService.get(`${urls.users.patientCards}/${id}`);
    },
    getById(id) {
        return apiService.get(`${urls.users.list}/${id}`);
    },

    update(id, data) {
        return apiService.patch(`${urls.users.list}/${id}`, data);
    },

    delete(id) {
        return apiService.delete(`${urls.users.list}/${id}`);
    },
    blockUser(id) {
        return apiService.patch(`${urls.users.list}/${id}/block`).then(res => res.data);
    },
    unblockUser(id) {
        return apiService.patch(`${urls.users.list}/${id}/unblock`).then(res => res.data);
    },
    userToAdmin(id) {
        return apiService.patch(`${urls.users.list}/${id}/create_admin`).then(res => res.data);
    },
    revokeAdmin(id) {
        return apiService.patch(`${urls.users.list}/${id}/revoke_admin`).then(res => res.data);
    },
    verifyEmail(token) {
        return apiService.get(urls.users.verifyEmail(token));
    }

};

export {userService};