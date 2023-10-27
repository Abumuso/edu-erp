<template>
  <div class="w-full flex flex-col">
    <label :for="name" class="text-global1 text-[20px] font-normal">{{
      label
    }}</label>
    <div class="flex justify-between items-center">
      <vee-field
        id="password"
        :type="active ? 'password' : 'text'"
        :name="name"
        :placeholder="placeHolder"
        class="custom_style border outline-none rounded-s-lg px-3 py-2 text-[18px] placeholder:text-global1/50 w-[89%] focus:border-global1 select-none" />
      <span
        @click="changeType"
        class="w-[10%] border-none outline-none bg-white cursor-pointer rounded-e-lg p-2 text-[18px] placeholder:text-global1 flex items-center py-[9px] justify-center">
        <svg-icon
          v-if="active"
          type="mdi"
          :path="mdiEye"
          class="text-global1"></svg-icon>
        <svg-icon
          v-else
          type="mdi"
          :path="mdiEyeOff"
          class="text-global1"></svg-icon>
      </span>
    </div>
    <ErrorMessage
      :name="name"
      class="text-error_color mt-2 text-[18px] font-medium" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

const active = ref(false);
const changeType = (e) => {
  e.preventDefault();
  active.value = !active.value;
};
console.log(active.value);
const props = defineProps({
  name: {
    type: String,
  },
  placeHolder: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
