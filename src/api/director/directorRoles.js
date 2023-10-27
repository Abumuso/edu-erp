import axiosClient from "../apiClient.js";

const directorRoles = {
  getRoles() {
    const url = `roles/all`;
    return axiosClient.get(url);
  },
  createRole(payload) {
    const url = `roles/create-role`;
    return axiosClient.post(url, payload);
  },
  //   updateImage(payload) {
  //     const url = "profile/upload-image";
  //     return axiosClient.post(url, payload);
  //   },
  //   updateProfile(payload) {
  //     const url = "profile/upload";
  //     return axiosClient.post(url, payload);
  //   },
};
export default directorRoles;
