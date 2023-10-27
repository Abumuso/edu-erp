<template>
  <main>
    <h1 class="bg-indigo-500">edu-erp</h1>
    <div class="form">
      <vue-tel-input @change="handleChange($event)" @submit="save"></vue-tel-input>
      <button type="submit">save</button>
    </div>
    <!-- <vee-form :validation-schema="schema" @submit="save"> -->
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import {useAuthStore} from "../stores/auth"
import VInput from "../components/form/VInput.vue";

const authstore = useAuthStore()
const phone = ref("")
const selected = ref("")
const schema = computed(() => {
  return {
    username: "required|min:3|max:10",
    password: "required|min:3|max:10",
  };
});
const handleChange = (e) => {
  phone.value(e.target.value)
  console.log(e.target.value);
}
const save = async (value) => {
  console.log(phone.value);
  console.log(value.username);
  console.log(value.password);
};
</script>
