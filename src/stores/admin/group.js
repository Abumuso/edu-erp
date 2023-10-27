import { ref, computed } from "vue";
import { defineStore } from "pinia";
import adminGroup from "../../api/admin/adminGroup";
export const useGroupStore = defineStore({
  id: "group",
  state: () => ({
    groups: [],
    rooms: [],
  }),
  actions: {
    async getAdminGroups(params) {
      try {
        let res = await adminGroup.getAdminGroups(params);
        this.groups = res.groups;
      } catch (error) {
        console.log(error);
      }
    },
    async createAdminGroup(payload) {
      try {
        await adminGroup.createAdminGroup(payload);
      } catch (error) {
        console.log(error);
      }
    },
    async updateAdminGroup(payload, id) {
      try {
        await adminGroup.updateAdminGroup(payload, id);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAdminGroup(id) {
      try {
        await adminGroup.deleteAdminGroup(id);
      } catch (error) {
        console.log(error);
      }
    },
    async availableAdminRooms(payload) {
      try {
        let res = await adminGroup.availableAdminRooms(payload);
        this.rooms = res;
      } catch (error) {
        console.log(error);
      }
    },
    async createAdminStudent(payload) {
      try {
        let res = await adminGroup.createAdminStudent(payload);
        // this.rooms = res;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
;