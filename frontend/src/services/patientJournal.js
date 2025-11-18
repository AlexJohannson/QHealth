import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const patientJournal = {
    getAllPatientJournal (params) {
        return apiService.get(urls.patientJournal.list, {params}).then(res => res.data);
    },
    getPatientJournalById (id) {
        return apiService.get(`${urls.patientJournal.list}/${id}`);
    },
    createNewPatientJournal (data) {
        return apiService.post(`${urls.patientJournal.list}`, data);
    },
    deletePatientJournal (id) {
        return apiService.delete(`${urls.patientJournal.list}/${id}`);
    }
}

export {patientJournal};