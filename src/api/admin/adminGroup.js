import axiosClient from "../apiClient";

const adminGroup = {
  getAdminGroups(params) {
    const url = `groups/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },
  createAdminGroup(payload) {
    const url = "groups/create-group";
    return axiosClient.post(url, payload);
  },
  updateAdminGroup(payload, id) {
    const url = `groups/update/${id}`;
    return axiosClient.put(url, payload);
  },
  deleteAdminGroup(id) {
    const url = `groups/delete/${id}`;
    return axiosClient.delete(url);
  },
  availableAdminRooms(payload) {
    const url = "groups/available-rooms";
    return axiosClient.post(url, payload);
  },
  createAdminStudent(payload) {
    const url = "group-students/add-student";
    return axiosClient.post(url, payload);
  },
  getGroupTeacher(id) {
    const url = `courses/all-teachers/${id}`;
    return axiosClient.get(url);
  },
  addGroupTeacher(payload) {
    const url = "groups/add-teacher";
    return axiosClient.post(url, payload);
  },
};
export default adminGroup;
