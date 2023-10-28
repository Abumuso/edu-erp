<template>
  <AppModal v-model="dialog">
    <div class="my-[20px]">
      <h1 v-if="!forms._id" class="text-center text-[30px] text-global1">
        Add Group
      </h1>
      <h1 v-else class="text-center text-[30px] text-global1">Edit Group</h1>
    </div>
    <Form @submit="save">
      <label for="name" class="text-global1 text-[20px] font-normal"
        >Name</label
      >
      <Field
        rules="required"
        :modelValue="forms.name"
        v-slot="{ errors }"
        name="Name">
        <input
          type="text"
          v-model="forms.name"
          id="name"
          placeholder="Enter your name"
          class="w-full px-[15px] py-[12px] text-[21px] outline-none border-[1px] border-global1 rounded-md" />
        <p
          class="text-error_color mt-2 text-[20px] font-medium"
          v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <div class="flex flex-col">
        <label for="name" class="text-global1 text-[18px] font-normal"
          >Select Date</label
        >
        <Field
          rules="required"
          :modelValue="forms.name"
          v-slot="{ errors }"
          name="Date">
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="Start a date"
            :default-value="new Date()"
            @change="handleChangeDate($event)"
            style="
              width: 100%;
              height: 50px;
              border: 2px solid #12486b;
              border-radius: 5px;
              outline: none;
              font-size: 21px;
            " />
          <p
            class="text-error_color mt-2 text-[18px] font-medium"
            v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
      </div>
      <div class="flex flex-col">
        <label for="name" class="text-global1 text-[20px] font-normal"
          >Select Date</label
        >
        <Field
          rules="required"
          :modelValue="forms.name"
          v-slot="{ errors }"
          name="Days">
          <select
            @change="handleChangeDays($event)"
            class="w-full py-[12px] px-[10px] outline-none border-[1px] border-global1 rounded-md text-[21px]">
            <option value="" selected hidden>Select Days</option>
            <option value="even">Even Days</option>
            <option value="odd">Odd Days</option>
          </select>
          <p
            class="text-error_color mt-2 text-[18px] font-medium"
            v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
      </div>
      <div class="flex flex-col">
        <label for="name" class="text-global1 text-[20px] font-normal"
          >Select Time</label
        >
        <Field
          rules="required"
          :modelValue="forms.name"
          v-slot="{ errors }"
          name="Date">
          <el-time-picker
            v-model="value1"
            is-range
            range-separator="To"
            start-placeholder="Start time"
            end-placeholder="End time"
            @change="handleChangeTime($event)" />
          <p
            class="text-error_color mt-2 text-[18px] font-medium"
            v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
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
    </Form>
  </AppModal>
</template>

<script setup>
import { computed, ref, watch, reactive } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VButton from "../../../components/form/VButton.vue";
import moment from "moment";
import { useGroupStore } from "../../../stores/admin/group";
import { useCourseStore } from "../../../stores/admin/course";
import { Form, Field } from "vee-validate";

const group_store = useGroupStore();
const course_store = useCourseStore();
// const dialog2 = ref(false);
const dialog = ref(false);
const loading = ref(false);
const forms = ref({
  name: "",
  start_date: "",
  start_time: "",
  end_time: "",
  room: "",
  course: "",
  days: "",
  status: "",
  teacher: "",
});
const date_time_picker = ref({
  date: "",
  time: [new Date(), new Date()],
});

const handleChangeDays = (e) => {
  if (e.target.value == "even") {
    forms.value.days = false;
  } else {
    forms.value.days = true;
  }
};

const handleChangeDate = (e) => {
  forms.value.start_date = moment(e).format("YYYY-MM-DD");
};

const handleChangeTime = async (e) => {
  let get_h0 = e[0].getHours();
  let get_m0 = e[0].getMinutes();
  let get_h1 = e[1].getHours();
  let get_m1 = e[1].getMinutes();
  forms.value.start_time = get_h0 * 60 + get_m0;
  forms.value.end_time = get_h1 * 60 + get_m1;
  let payload = {
    start_date: forms.value.start_date,
    start_time: forms.value.start_time,
    end_time: forms.value.end_time,
    days: forms.value.days,
  };
  await group_store.availableAdminRooms(payload);
};

const handleChangeCourse = async (e) => {
  console.log(e.target.value);
  await group_store.getGroupTeacher(e.target.value);
};

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

const save = async () => {
  await group_store.createAdminGroup({ teacher: null, ...forms.value });
  let result2 = {
    group: group_store?.group_id,
    teacher: forms.value.teacher,
  };
  await group_store.addGroupTeacher(result2);
};

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

const unique_id = ref();
const payload = ref({});
const group_name = ref("");
const select_room = ref("");
const select_course = ref("");
const select_teacher = ref("");

const value1 = ref([new Date(), new Date()]);
const value2 = ref("");

// let forms = ref({
//   name: "",
//   size: "",
// });

const openDeleteModal = (id) => {
  unique_id.value = id;
  dialog2.value = true;
};

const schema = computed(() => {
  return {
    name: "required|min:3|max:25",
    size: "required|min:2|max:15",
  };
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
