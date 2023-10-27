<template>
  <AppModal v-model="dialog">
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms">
      <VInput type="text" label="Name" name="name" placeHolder="Room Name" />
      <VInput type="number" label="Size" name="size" placeHolder="Size" />
      <VButton type="submit" btn_type="primary" :isloading="loading">{{
        btn_title
      }}</VButton>
    </vee-form>
  </AppModal>
  <AppModal v-model="dialog2">
    <VDelete v-model="dialog2" :deleteUser="deleteRoom" />

    <!-- <h1>are you sure?</h1>
    <button class="border border-[aqua]" @click="dialog2 = false">
      cancel
    </button>
    <button class="border border-[red]" @click="deleteRoom">delete</button> -->
  </AppModal>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
import { useRoomStore } from "../../../stores/admin/room";
import VDelete from "../../../components/form/VDelete.vue";

const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const unique_id = ref();

const store = useRoomStore();

let forms = ref({
  name: "",
  size: null,
});

const openModal = (item) => {
  if (item) forms.value = { ...item };
  dialog.value = true;
};

const openDeleteModal = (id) => {
  console.log(id, "delete");
  unique_id.value = id;
  dialog2.value = true;
};
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});
const schema = computed(() => {
  return {
    name: "required|min:3|max:15",
    size: "required|min:1|max:15",
  };
});
const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value.phone) {
      return "Edit";
    } else {
      return "Add";
    }
  }
});
const send = async (values) => {
  console.log(values);
  if (!forms.value._id) {
    loading.value = true;
    await store.createAdminRoom(values);
    loading.value = false;
  } else {
    loading.value = true;
    await store.updateAdminRoom(payload, forms.value._id);
    loading.value = false;
  }
};
const deleteRoom = async () => {
  await store.deleteAdminRoom(unique_id.value);
};
defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
