<template>
  <div>
    <h1>Single Group</h1>
    <input type="text" v-model="phone_number" class="border-2" />
    <button @click="save">save</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useGroupStore } from "../../stores/admin/group";

const route = useRoute();
const phone_number = ref("");
const store = useGroupStore();

const save = async () => {
  let payload = {
    group_id: `${route.params.id}`,
    student_phone: phone_number.value,
  };
  await store.createAdminStudent(payload);
};
</script>

<style lang="scss" scoped></style>
