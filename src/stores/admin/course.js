import { ref, computed } from "vue";
import { defineStore } from "pinia";
import adminCourse from "../../api/admin/adminCourse";
export const useCourseStore = defineStore({
  id: "course",
  state: () => ({
    courses: [],
  }),
  actions: {
    async getAdminCourses(params) {
      try {
        let res = await adminCourse.getAdminCourses(params);
        this.courses = res.courses;
        params.last_page = Math.ceil(res.count / params.limit);
      } catch (error) {
        console.log(error);
      }
    },
    async createAdminCourse(payload) {
      try {
        await adminCourse.createAdminCourse(payload);
      } catch (error) {
        console.log(error);
      }
    },
    async updateAdminCourse(payload, id) {
      try {
        await adminCourse.updateAdminCourse(payload, id);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAdminCourse(id) {
      try {
        await adminCourse.deleteAdminCourse(id);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
