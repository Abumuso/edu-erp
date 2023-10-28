<template>
  <div>
    <MainLayout>
      <router-view></router-view>
    </MainLayout>
  </div>
</template>

<script setup>
import MainLayout from "../../layout/MainLayout.vue";
// import { onMounted } from "vue";
// import useAuthStore from "../../stores/auth";

// const store = useAuthStore();
// onMounted(() => {
//   store.getProfile();
// });
</script>

<style lang="scss" scoped></style>
