import {apiService} from "./apiService";
import {urls} from "../constants/urls";


const sickLeaveService = {
    getAllListSickLeaves (params) {
        return apiService.get(urls.sickLeave.list, {params}).then(res => res.data);
    },
    getSickLeaveById (id) {
        return apiService.get(`${urls.sickLeave.list}/${id}`);
    },
    createNewSickLeave (data) {
        return apiService.post(`${urls.sickLeave.list}`, data);
    },
    deleteSickLeaveById (id) {
        return apiService.delete(`${urls.sickLeave.list}/${id}`);
    }
}

export {sickLeaveService};