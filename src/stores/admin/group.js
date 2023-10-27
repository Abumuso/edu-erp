import { ref, computed } from "vue";
import { defineStore } from "pinia";
import adminGroup from "../../api/admin/adminGroup";
export const useGroupStore = defineStore({
  id: "group",
  state: () => ({
    groups: [],
    rooms: [],
    teachers: [],
    group_id: "",
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
    async getGroupTeacher(id) {
      try {
        let res = await adminGroup.getGroupTeacher(id);
        this.teachers = res.teachers;
      } catch (error) {
        console.log(error);
      }
    },
    async addGroupTeacher(payload) {
      try {
        await adminGroup.addGroupTeacher(payload);
      } catch (error) {
        console.log(error);
      }
    },
    async createAdminGroup(payload) {
      try {
        let res = await adminGroup.createAdminGroup(payload);
        this.group_id = res.group._id
        console.log(res);
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
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
