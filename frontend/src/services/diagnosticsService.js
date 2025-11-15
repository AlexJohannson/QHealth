import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const diagnosticsService = {
    getAllDiagnosticsService (params) {
        return apiService.get(urls.diagnostics.list, {params}).then(res => res.data);
    },
    getDiagnosticsById (id) {
        return apiService.get(`${urls.diagnostics.list}/${id}`);
    },
    createNewDiagnostic (data) {
        return apiService.post(`${urls.diagnostics.list}`, data);
    },
    updateDiagnostic (id, data) {
        return apiService.patch(`${urls.diagnostics.list}/${id}`, data);
    },
    deleteDiagnostic (id) {
        return apiService.delete(`${urls.diagnostics.list}/${id}`);
    }
}

export {diagnosticsService};