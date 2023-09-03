<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from "../stores/appStore"


const store = useStore();
const tasks = ref([])

const filters = ref([
  { name: "All", value: 'all' },
  { name: "Completed", value: 'completed' },
  { name: "Incomplete", value: 'incomplete' },
]);

const selectedFilter = ref('all');

onMounted(() => {
  getTasks();
})


function getTasks(filter = 'all') {
  selectedFilter.value = filter;

  store.getTasks(filter).then(() => {
    let allTasks = store.tasks.map((item) => ({
      ...item,

    }))

    tasks.value = allTasks;
  });
}

async function toggleTaskCompleted(task, index) {
  if (task.id) {
    const updatedTask = await store.toggleTaskComplete(task);
    task.completed = updatedTask.completed;

  } else {
    task.completed = !task.completed
  }
}
</script>




<template>
  <div class="task-list" style="width: 900px;">
    <div class="mb-10 flex justify-between">
      <h1 class="text-2xl font-bold">
        Tasks</h1>
      <div>

        <span class="mr-3 cursor-pointer" :class="{ 'text-gray-400': filter.value == selectedFilter }"
          v-for="filter in filters" @click="getTasks(filter.value)">
          {{ filter.name }}
        </span>
      </div>
      <RouterLink class="btn btn-primary" to="/create">Create Task</RouterLink>
    </div>
    <div class="mb-10">

      <div v-if="tasks.length">
        <table class="table">
          <thead>
            <tr class="font-bold success">
              <th class="font-bold">Status</th>
              <th class="font-bold">Title</th>
              <th class="font-bold">Description</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="(item, index) in tasks" :key="index">
              <td><input type="checkbox" :checked="item.completed" @click="toggleTaskCompleted(item, index)"></td>
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!tasks.length">
        <p class="text-gray-500">No tasks</p>
      </div>
    </div>
  </div>
</template>

<style>
.task-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 110px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

}
</style>



