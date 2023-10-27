<template>
  <AppModal v-model="dialog">
    <h1>Group</h1>
    <input type="text" v-model="group_name" />
    <div class="block">
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="Start a date"
        :default-value="new Date()"
        @change="handleChangeDate($event)" />
    </div>
    <div>
      <select @change="handleChangeDays($event)" class="m-3 border-2">
        <option value="" selected hidden>Select Days</option>
        <option value="even">Even Days</option>
        <option value="odd">Odd Days</option>
      </select>
    </div>
    <div class="demo-range">
      <el-time-picker
        v-model="value1"
        is-range
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
        @change="handleChangeTime($event)" />
    </div>
    <div v-if="store?.rooms.length">
      <select class="m-3 border-2" v-model="select_room">
        <option value="" selected hidden>Selected rooms</option>
        <option
          :value="item._id"
          v-for="(item, index) in store?.rooms"
          :key="index">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div>
      <select
        class="m-3 border-2"
        v-model="select_course"
        @change="handleChangeCourse($event)">
        <option value="" selected hidden>Select course</option>
        <option
          :value="item._id"
          v-for="(item, index) in store2?.courses"
          :key="index">
          {{ item.name }}
        </option>
      </select>
      <select
        class="m-3 border-2"
        v-model="select_teacher"
        v-if="store?.teachers.length">
        <option value="" selected hidden>Select teacher</option>
        <option
          :value="item._id"
          v-for="(item, index) in store?.teachers"
          :key="index">
          {{ item.first_name }}
        </option>
      </select>
    </div>
    <VButton btn_type="primary" @click="save">create group</VButton>
    <!-- <VDelete v-model="dialog2" :deleteUser="deleteGroup" /> -->
  </AppModal>
</template>

<script setup>
import { computed, ref, watch, reactive } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
// import VInput from "../../../components/form/VInput.vue";
import { useGroupStore } from "../../../stores/admin/group";
import { useCourseStore } from "../../../stores/admin/course";
import moment from "moment";
// import VDelete from "../../../components/form/VDelete.vue";
import VButton from "../../../components/form/VButton.vue";

const group_store = useGroupStore();
const course_store = useCourseStore();
const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const unique_id = ref();
const payload = ref({});
const days = ref(null);
const group_name = ref("");
const select_room = ref("");
const select_course = ref("");
const select_teacher = ref("");
const start_time = ref();
const end_time = ref();
const values = reactive({
  start_date: "",
  start_time: "",
  end_time: "",
});
const value1 = ref([new Date(), new Date()]);
const value2 = ref("");

const handleChangeDays = (e) => {
  if (e.target.value == "even") {
    days.value = false;
  } else {
    days.value = true;
  }
};

const handleChangeDate = (e) => {
  values.start_date = moment(e).format("YYYY-MM-DD");
};

const handleChangeTime = async (e) => {
  let a = e[0].getHours();
  let b = e[0].getMinutes();
  let d = e[1].getHours();
  let f = e[1].getMinutes();
  start_time.value = a * 60 + b;
  end_time.value = d * 60 + f;
  payload.value = {
    start_date: values.start_date,
    start_time: start_time.value,
    end_time: end_time.value,
    days: days.value,
  };
  await group_store.availableAdminRooms(payload.value);
};

const handleChangeCourse = async (e) => {
  console.log(e.target.value);
  await group_store.getGroupTeacher(e.target.value);
};

let forms = ref({
  name: "",
  size: "",
});

const openModal = (item) => {
  dialog.value = true;
  course_store.getAdminCourses({
    page: 1,
    limit: 10,
    last_page: null,
  });
};

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

const openDeleteModal = (id) => {
  unique_id.value = id;
  dialog2.value = true;
};

const save = async () => {
  let result = {
    name: group_name.value,
    start_date: values.start_date,
    start_time: start_time.value,
    end_time: end_time.value,
    days: days.value,
    room_id: select_room.value,
    course: select_course.value,
    teacher_id: select_teacher.value,
    status: true,
  };
  await group_store.createAdminGroup(result);
  let result2 = {
    group: group_store?.group_id,
    teacher: select_teacher.value,
  };
  await group_store.addGroupTeacher(result2);
};

const schema = computed(() => {
  return {
    name: "required|min:3|max:25",
    size: "required|min:2|max:15",
  };
});
const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value.phone) {
      return "Edit";
    } else {
      return "Add";
    }
  }
});
const send = async (values) => {
  console.log(values);
  if (!forms.value._id) {
    loading.value = true;
    await group_store.createAdminGroup(values);
    loading.value = false;
  } else {
    loading.value = true;
    await group_store.updateAdminGroup(payload, forms.value._id);
    loading.value = false;
  }
};
const deleteGroup = async () => {
  await group_store.deleteAdminGroup(unique_id.value);
};
defineExpose({ openModal, openDeleteModal });
</script>

<style scoped>
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
</style>
