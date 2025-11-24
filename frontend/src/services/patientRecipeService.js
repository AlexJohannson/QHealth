import {apiService} from "./apiService";
import {urls} from "../constants/urls";


const patientRecipeService = {
    getAllPatientRecipe (params) {
        return apiService.get(urls.patientRecipe.list, {params}).then(res => res.data);
    },
    getPatientRecipeById (id) {
        return apiService.get(`${urls.patientRecipe.list}/${id}`);
    },
    createNewPatientRecipe (data) {
        return apiService.post(`${urls.patientRecipe.list}`, data);
    },
    deletePatientRecipeById (id) {
        return apiService.delete(`${urls.patientRecipe.list}/${id}`);
    }
}

export {patientRecipeService};