import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const bookingDiagnosticsService = {
    getAllLisr (params) {
        return apiService.get(urls.bookingDiagnostic.list, {params}).then(res => res.data);
    },
    getBookingDiagnosticById(id) {
        return apiService.get(`${urls.bookingDiagnostic.list}/${id}`);
    },
    bookDiagnostic (data) {
        return apiService.post(`${urls.bookingDiagnostic.list}`, data);
    },
    deleteBookingDiagnostic(id) {
        return apiService.delete(`${urls.bookingDiagnostic.list}/${id}`);
    }
}

export {bookingDiagnosticsService};