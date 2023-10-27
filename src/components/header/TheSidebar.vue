<template>
  <div class="flex bg-white">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity opacity-50 lg:hidden bg-[#00111380]"></div>
    <div
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      class="w-[223px] bg-global1 pt-[70px] inset-y-0 fixed left-0 z-20 overflow-y-auto transition duration-300 transform lg:translate-x-0 lg:static">
      <router-link
        v-for="(item, index) in menu"
        :key="index"
        :to="item.path"
        class="flex py-[15px] px-[30px] gap-[15px] text-white"
        ><SvgIcon type="mdi" :path="item.icon" class="text-[20px]"></SvgIcon>
        <span>{{ item.label }}</span>
      </router-link>
    </div>
  </div>
</template>
<!-- :class="{`bg-[#F5FCCD] active`: $route.meta.child === `${item.keys}`}" -->
<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { computed, ref } from "vue";
import { useSidebar } from "../../hooks/UseSidebar";
import { AdminMenu } from "../menu/AdminMenu";
import { DirectorMenu } from "../menu/DirectorMenu";

const isOpen = useSidebar();
const props = defineProps({
  menu: Array,
});
let role = localStorage.getItem("role");
const menu = computed(() => {
  if (role == "admin") {
    return AdminMenu;
  } else if (role == "director") {
    return DirectorMenu;
  }
});
</script>

<style scoped>
.router-link-active {
  background: #f5fccd;
  color: #12486b;
}
</style>
