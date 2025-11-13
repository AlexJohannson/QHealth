import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const securityService = {
    getAll(params) {
        return apiService.get(urls.securityList.list, {params}).then(res => res.data);
    },
    deleteSecurityById(id) {
        return apiService.delete(`${urls.securityList.list}/${id}`);
    }
}
export {securityService};