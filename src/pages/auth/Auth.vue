<template>
  <section
    class="w-full h-screen bg-[#E7EDF0] flex items-center justify-center">
    <div class="w-[80%] flex items-center justify-center">
      <div class="w-[60%] flex justify-center flex-col items-center">
        <h1 class="text-[#12486B] font-bold text-[44px]">Najot Ta'limga</h1>
        <p class="text-global1 text-[32px]">Xush kelibsiz!</p>
        <vee-form
          :validation-schema="schema"
          class="w-[90%] mt-[70px] mx-auto flex flex-col gap-[30px]"
          @submit="send">
          <div class="w-full">
            <VInput
              type="text"
              label="Phone number"
              name="phone_number"
              mask="(+998)-##-###-##-##"
              placeHolder="(+998)-99-999-99-99" />
          </div>
          <div class="w-full flex justify-between items-center">
            <VPasswordInput
              type="password"
              label="Password"
              name="password"
              placeHolder="Enter your password"
              class="w-[90%]" />
          </div>
          <VButton type="submit" btn_type="primary" :isLoading="loading">{{
            btn_title
          }}</VButton>
        </vee-form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import VInput from "../../components/form/VInput.vue";
import VPasswordInput from "../../components/form/VPasswordInput.vue";
import useAuthStore from "../../stores/auth";
import VButton from "../../components/form/VButton.vue";

const authStore = useAuthStore();

const schema = computed(() => {
  return {
    password: "required|min:3|max:15",
    phone_number: "required|min:19|max:19",
  };
});

const loading = ref(false);
const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    return "Login";
  }
});
const send = async (values) => {
  loading.value = true;
  let a = values.phone_number.split("");
  let b = a.filter((item) => !isNaN(+item));
  let c = "+" + b.join("");
  console.log(c);
  let payload = {
    phone: c,
    password: values.password,
  };
  await authStore.authLogin(payload);
  // if (authStore.error) {
  //   danger(authStore.error);
  //   authStore.error = null;
  // } else {
  //   success("Login Success");
  // }
  // console.log(authStore.user);
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
