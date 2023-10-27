import axiosClient from "../apiClient.js";

const directorStaffs = {
  getStaffs(params) {
    const url = `director/get-staffs/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url, params);
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
export default directorStaffs;
