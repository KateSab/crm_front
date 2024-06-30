<template>
    <create-top title="Задачи на перемещение"/>
        <div class="create-moving-task">
            Создание новой задачи на перемещение
            <MovingTaskCreateTask />
        </div>
</template>

<script>
import CreateTop from '@/components/CreateTop.vue';
import MovingTaskCreateTask from '@/views/moving_tasks/create/MovingTaskCreateTask.vue';

export default {
  name: 'MovingTaskCreate',
  components: {
    CreateTop,
    MovingTaskCreateTask,
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