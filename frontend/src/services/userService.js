import {apiService} from './apiService';
import {urls} from '../constants/urls';

const userService = {
  getAll(params) {
    return apiService.get(urls.users.list, { params }).then(res => res.data);
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
};

export {userService};