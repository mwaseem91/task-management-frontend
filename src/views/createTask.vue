<script setup>
import { ref } from 'vue';
import { useStore } from '../stores/appStore';

const title = ref('');
const description = ref('')
const complete = ref('')
const store = useStore();
const storeTask = async() => {

    await store.storeTask({
        title: title.value,
        description: description.value,
        completed: complete.value,
    });  
}

</script>


<template>
    <form class="form" action="" method="POST">
      <div class="form-group">
        <label for="email">Title:</label>
        <input type="text"  v-model="title" class="form-control" id="email">
      </div>
      <div class="form-group">
        <label for="pwd">Description:</label>
        <input type="text"  v-model="description" name="description" class="form-control" >
      </div>
      <div class="checkbox">
        <label for="pwd"><input type="checkbox"  v-model="complete" ><b>Completed</b> </label>
      </div>
      <button type="button" @click="storeTask" class="btn btn-success" style="background-color: #5cb85c">Create Task</button>
    </form>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 110px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add shadow here */

}
</style>