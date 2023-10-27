import {
  mdiAccount,
  mdiBook,
  mdiDoorOpen,
  mdiCogOutline,
  mdiAccountGroupOutline,
} from "@mdi/js";
export const AdminMenu = [
  {
    path: "/students",
    label: "Students",
    name: "students",
    icon: mdiAccount,
  },
  {
    path: "/courses",
    label: "Courses",
    name: "courses",
    icon: mdiBook,
  },
  {
    path: "/rooms",
    label: "Rooms",
    name: "rooms",
    icon: mdiDoorOpen,
  },
  {
    path: "/groups",
    label: "Groups",
    name: "groups",
    keys: "single_group",
    icon: mdiAccountGroupOutline,
  },
  {
    path: "/admin_profile",
    label: "Profile",
    name: "admin_profile",
    icon: mdiCogOutline,
  },
];
