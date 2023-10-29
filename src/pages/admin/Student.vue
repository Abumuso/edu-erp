<template>
  <div class="flex flex-col gap-3 items-start p-3">
    <studentModal ref="modal_value" />
    <div class="flex gap-[40px]">
      <VButton
        type="submit"
        btn_type="primary"
        :isLoading="loading"
        @click="openModal()">
        Create student
      </VButton>
      <div class="w-[500px]">
        <input
          type="text"
          v-model="search"
          placeHolder="Search"
          @change="handleChange($event)"
          class="w-full px-[15px] py-[12px] rext-[21px] otline-none border-[1px] border-global1 rounded-md" />
      </div>
    </div>
    <app-table :headers="headers" :body="store?.students">
      <template #body_action="{ item }">
        <VAction :item="item" :modal_value="modal_value" />
      </template>
    </app-table>
    <v-pagination
      v-model="params.page"
      :pages="params.last_page"
      :rangeSize="1"
      activeColor="#DCEDFF"
      @update:modelValue="store.getStudents(params)" />
  </div>
</template>

<script setup>
import { useStudentStore } from "../../stores/admin/student";
import { onMounted, ref, watch } from "vue";
import studentModal from "./Modals/studentModal.vue";
import VButton from "../../components/form/VButton.vue";
import AppTable from "../../components/ui/app-table.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VAction from "../../components/form/VAction.vue";
import VInput from "../../components/form/VInput.vue";

const store = useStudentStore();
const modal_value = ref("");
const loading = ref(false);
const search = ref("");
const params = {
  page: 1,
  limit: 10,
  last_page: null,
};
const openModal = () => {
  modal_value.value.openModal();
};

const handleChange = async (e) => {
  console.log(e.target.value);
  search.value = e.target.value;
  if (value == "") {
    window.location.reload();
  }
  await store.getStudentSearch(search.value);
};
watch(search, (value) => {
  if (value == "") {
    window.location.reload();
  }
});

const headers = ref([
  { title: "First name", value: "first_name" },
  { title: "Last name", value: "last_name" },
  { title: "Phone number", value: "phone" },
  { title: "Action", value: "action" },
]);

onMounted(() => {
  store.getStudents(params);
});
</script>

<style lang="scss" scoped></style>
