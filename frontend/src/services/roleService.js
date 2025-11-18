import {apiService} from "./apiService";
import {urls} from "../constants/urls";


const roleService = {
    getAll(params) {
        return apiService.get(urls.roles.list, {params}).then(res => res.data);
    },
    getRolesById(id) {
        return apiService.get(`${urls.roles.list}/${id}`);
    },
    createNewRole (data){
        return apiService.post(`${urls.roles.list}`, data);
    },
    blockRoleDoctor (id) {
        return apiService.patch(`${urls.roles.list}/block_staff_doctor/${id}`);
    },
    unblockRoleDoctor (id) {
        return apiService.patch(`${urls.roles.list}/unblock_staff_doctor/${id}`);
    },
    getListOfDoctors(params) {
        return apiService.get(`${urls.roles.list}/doctor_list`, {params}).then(res => res.data);
    },
    getProfileDoctorById(id) {
        return apiService.get(`${urls.roles.list}/doctor_list/${id}`);
    }
}

export {roleService};