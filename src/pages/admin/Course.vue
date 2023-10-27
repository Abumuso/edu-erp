<template>
  <div>
    <courseModal ref="modal_value" />
    <h1>Admin Courses</h1>
    <VButton btn_type="primary" @click="openModal">Create course</VButton>
    <app-table :headers="headers" :body="store?.courses">
      <template #body_action="{ item }">
        <VAction :item="item" :modal_value="modal_value" />

        <!-- <VButton btn_type="info" @click="openEditModal(item)">Edit</VButton>
        <VButton btn_type="danger" @click="openDeleteModal(item._id)"
          >Delete</VButton
        > -->
      </template>
    </app-table>
  </div>
</template>

<script setup>
import { useCourseStore } from "../../stores/admin/course";
import { onMounted, ref } from "vue";
import AppTable from "../../components/ui/app-table.vue";
import VButton from "../../components/form/VButton.vue";
import courseModal from "./Modals/courseModal.vue";
import VAction from "../../components/form/VAction.vue";

const store = useCourseStore();
const modal_value = ref('');
const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});
const openModal = () => {
  modal_value.value.openModal();
};
// const openEditModal = (item) => {
//   course_modal.value.openModal(item);
// };
// const openDeleteModal = (id) => {
//   course_modal.value.openDeleteModal(id);
// };
const headers = ref([
  { title: "Course name", value: "name" },
  { title: "Course price", value: "price" },
  { title: "Course period", value: "period" },
  { title: "Action", value: "action" },
]);

onMounted(() => {
  store.getAdminCourses(params.value);
});
</script>

<style lang="scss" scoped></style>
