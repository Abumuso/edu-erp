import axiosClient from "../apiClient.js";

const teacherGroups = {
  getTeacherGroups(id) {
    const url = `teachers/get-groups/${id}`;
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
export default teacherGroups;
