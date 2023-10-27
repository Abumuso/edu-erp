<template>
  <table>
    <thead>
      <tr>
        <th v-for="(item, index) in headers" :key="index">
          {{ item.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in body" :key="index">
        <td v-for="(BodyInHeader, BodyInIndex) in headers" :key="BodyInIndex">
          <slot :name="`body_${BodyInHeader.value}`" :item="item">{{
            item[BodyInHeader.value]
          }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  headers: {
    type: Array,
  },
  body: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  padding: 10px;
  border-collapse: separate;
  border-spacing: 0;
  overflow-x: scroll;
  thead {
    background-color: #eefbea;
    th {
      border-top: 1px solid #e1eaed;
      padding: 10px 36px;
      font-size: 14px;
    }
  }
  tbody {
    tr {
      font-size: 13px;
    }
    tr:nth-child(even) {
      background-color: rgb(239, 236, 236);
    }
  }
}

.nothing {
  width: 97%;
  margin-left: 1.5%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 16px;
  }
}

td {
  padding: 5px 30px;
  border: 1px solid #e1eaed;
  text-align: center;
}
tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}
tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}
tr:first-child th:first-child {
  border-top-left-radius: 10px;
  border-left: 1px solid #e1eaed;
}
tr:first-child th:last-child {
  border-top-right-radius: 10px;
  border-right: 1px solid #e1eaed;
}
</style>
