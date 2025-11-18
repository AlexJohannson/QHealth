import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const bookingDoctorService = {
    getAllListOfBookingDoctor (params) {
        return apiService.get(urls.bookingDoctor.list, {params}).then(res => res.data);
    },
    getBookingDoctorVisitById (id) {
        return apiService.get(`${urls.bookingDoctor.list}/${id}`);
    },
    createNewVisitToDoctor (data) {
        return apiService.post(`${urls.bookingDoctor.list}`, data);
    },
    deleteBookingVisitToDoctor (id) {
        return apiService.delete(`${urls.bookingDoctor.list}/${id}`);
    },
    canceledBookingVisitToDoctor (id) {
        return apiService.patch(`${urls.bookingDoctor.list}/cancelled/${id}`);
    }
}

export {bookingDoctorService};