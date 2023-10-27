<template>
  <div class="flex-col flex relative my-3">
    <label
      :for="name"
      class="block my-2 text-base font-medium text-paragraph-default"
      >{{ label }}</label
    >
    <vee-field
      :type="type"
      :name="name"
      class="relative focus: outline-none border-paragraph-default border-[2px]"
      :placeholder="placeHolderProps"
      as="textarea"
      rows="4"
      cols="50" />
    <slot name="prepend_icon"></slot>
    <div class="append_icon">
      <slot name="append_icon"></slot>
    </div>
    <ErrorMessage class="text-danger text-sm" :name="name" />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  name: {
    type: String,
  },
  placeHolderProps: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.append_icon {
  position: absolute;
  right: 0;
  padding: 0 10px;
  top: 30%;
  transform: translate(-5%, 60%);
  cursor: pointer;
}
</style>
