import { ref, computed } from "vue";
import { defineStore } from "pinia";
import directorRoles from "../../api/director/directorRoles";
export const useRoleStore = defineStore({
  id: "roles",
  state: () => ({
    roles: [],
  }),
  actions: {
    async getRoles() {
      try {
        let res = await directorRoles.getRoles();
        this.roles = res.roles;
      } catch (error) {
        console.log(error);
      }
    },
    async createRole(payload) {
      try {
        await directorRoles.createRole(payload);
      } catch (error) {
        console.log(error);
      }
    },
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
