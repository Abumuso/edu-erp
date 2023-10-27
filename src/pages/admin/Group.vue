<template>
  <div>
    <groupModal ref="modal_value" />
    <h1>Admin Groups</h1>
    <VButton btn_type="primary" @click="openModal">Create group</VButton>
    <app-table :headers="headers" :body="store?.groups">
      <template #body_days="{ item }">
        <div v-if="item.days" class="flex gap-2">
          <span>Mon</span>
          <span>Wen</span>
          <span>Fri</span>
        </div>
        <div v-else class="flex gap-2">
          <span>Tue</span>
          <span>Thu</span>
          <span>Sat</span>
        </div>
      </template>
      <template #body_start_date="{ item }">
        <span>{{ formatData(item?.start_date) }}</span>
      </template>
      <template #body_end_date="{ item }">
        <span>{{ formatData(item?.end_date) }}</span>
      </template>
      <template #body_start_time="{ item }">
        <span>{{ formatTime(item?.start_time) }}</span>
      </template>
      <template #body_end_time="{ item }">
        <span>{{ formatTime(item?.end_time) }}</span>
      </template>
      <template #body_course_id="{ item }">
        <span>{{ item?.course_id?.name }}</span>
      </template>
      <template #body_action="{ item }">
        <VAction :item="item" :modal_value="modal_value" path="/single_group"/>

        <!-- <VButton btn_type="primary" @click="openEditModal(item)">Edit</VButton>
        <VButton btn_type="danger" @click="openDeleteModal(item._id)"
          >Delete</VButton
        > -->
      </template>
    </app-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useGroupStore } from "../../stores/admin/group";
import AppTable from "../../components/ui/app-table.vue";
import VButton from "../../components/form/VButton.vue";
import groupModal from "./Modals/groupModal .vue";
import moment from "moment";
import VAction from "../../components/form/VAction.vue";

const store = useGroupStore();
const modal_value = ref();

const formatData = (data) => {
  return moment(data).format("YYYY-MM-DD");
};

const formatTime = (time) => {
  let hour = `${parseInt(time / 60)}`.padStart(2, 0);
  let minute = `${time % 60}`.padStart(2, 0);
  let result = `${hour}:${minute}`;
  return result;
};

const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});
const headers = ref([
  { title: "Group name", value: "name" },
  { title: "Course name", value: "course_id" },
  { title: "Start date", value: "start_date" },
  { title: "End date", value: "end_date" },
  { title: "Days", value: "days" },
  { title: "Start time", value: "Start_time" },
  { title: "End time", value: "End_time" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action" },
]);

const openModal = () => {
  modal_value.value.openModal();
};

onMounted(() => {
  store.getAdminGroups(params.value);
});
</script>

<style lang="scss" scoped></style>
