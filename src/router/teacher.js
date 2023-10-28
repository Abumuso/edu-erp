export default {
  path: "/teacher",
  name: "teacher",
  component: import("../pages/teacher/Teacher.vue"),
  children: [
    {
      path: "/groups",
      name: "groups",
      component: import("../pages/teacher/Groups.vue"),
    },
  ],
};
