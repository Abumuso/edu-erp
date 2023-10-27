<template>
  <div>
    <h1>Admin Rooms</h1>
    <roomModal ref="modal_value" />
    <VButton btn_type="primary" @click="openModal">Create room</VButton>
    <app-table :headers="headers" :body="store?.rooms">
      <template #body_action="{ item }">
        <VAction :item="item" :modal_value="modal_value" />

        <!-- <VButton btn_type="primary" @click="openEditModal(item)">Edit</VButton>
        <VButton btn_type="danger" @click="openDeleteModal(item._id)"
          >Delete</VButton
        > -->
      </template>
    </app-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoomStore } from "../../stores/admin/room";
import AppTable from "../../components/ui/app-table.vue";
import VButton from "../../components/form/VButton.vue";
import roomModal from "./Modals/roomModal.vue";
import VAction from "../../components/form/VAction.vue";

const modal_value = ref();

const store = useRoomStore();
const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});
const headers = ref([
  { title: "Room name", value: "name" },
  { title: "Room size", value: "size" },
  { title: "Action", value: "action" },
]);

const openModal = () => {
  modal_value.value.openModal();
};
// const openEditModal = (item) => {
//   room_modal.value.openModal(item);
// };
// const openDeleteModal = (id) => {
//   room_modal.value.openDeleteModal(id);
// };
onMounted(() => {
  store.getAdminRooms(params.value);
});
</script>

<style lang="scss" scoped></style>
