<template>
  <div class="w-full flex h-screen select-none">
    <TheSidebar class="h-full"></TheSidebar>
    <div class="w-full flex flex-col">
      <TheHeader></TheHeader>
      <div class="pl-7 pb-5 pr-3 overflow-auto bg-[#E7EDF0] h-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheSidebar from "../components/header/TheSidebar.vue";
import TheHeader from "../components/header/TheHeader.vue";
</script>

<style scoped></style>
