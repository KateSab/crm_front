<template>
    <Top />
        <div class="create-moving-task">
            Создание новой задачи на перемещение
            <Task />
        </div>
</template>

<script>
import Top from '../components/blocks/create_moving_task/Top.vue';
import Task from '../components/blocks/create_moving_task/Task.vue';

export default {
  name: 'CreateMovingTask',
  components: {
      Top,
      Task,
  }
}
</script>

<style>
  .create-moving-task {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>