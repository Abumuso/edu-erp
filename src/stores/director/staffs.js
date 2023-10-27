import { ref, computed } from "vue";
import { defineStore } from "pinia";
import directorStaffs from "../../api/director/directorStaffs";
export const useStaffStore = defineStore({
  id: "staffs",
  state: () => ({
    staffs: [],
  }),
  actions: {
    async getStaffs(params) {
      try {
        let res = await directorStaffs.getStaffs(params);
        this.staffs = res.staffs;
      } catch (error) {
        console.log(error);
      }
    },
    // async createAdminRoom(payload) {
    //   try {
    //     await adminRoom.createAdminRoom(payload);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async updateAdminRoom(payload, id) {
    //   try {
    //     await adminRoom.updateAdminRoom(payload, id);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async deleteAdminRoom(id) {
    //   try {
    //     await adminRoom.deleteAdminRoom(id);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
});
