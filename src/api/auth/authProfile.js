import axiosClient from "../apiClient.js";

const authProfile = {
  getProfile() {
    const url = "profile/info";
    return axiosClient.get(url);
  },
  updateImage(payload) {
    const url = "profile/upload-image";
    return axiosClient.post(url, payload);
  },
  updateProfile(payload) {
    const url = "profile/upload";
    return axiosClient.post(url, payload);
  },
};
export default authProfile;
