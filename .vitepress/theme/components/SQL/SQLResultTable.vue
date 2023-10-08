<script lang="ts" setup>
import { QueryExecResult } from 'sql.js';

const props = defineProps<{
  result: QueryExecResult[]
}>();
</script>

<template>
  <table class="sql-result-table" v-for="table of props.result">
    <thead>
      <th v-for="column in table.columns">
        {{ column }}
      </th>
    </thead>
    <tbody>
      <template v-for="value in table.values">
        <tr>
          <template v-if="Array.isArray(value)" v-for="data of value">
            <td>
              {{ data }}
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.sql-result-table {
  margin: 0;
  min-width: 100%;
  table-layout: auto;

  thead, tbody {
    min-width: 100%;
  }
}
</style>