import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import admin from "./admin";
import director from "./director";
import finance from "./finance";
import student from "./student";
import teacher from "./teacher";
import page_not_found from "./page_not_found";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [auth, admin, director, finance, student, teacher, page_not_found],
});

export default router;
