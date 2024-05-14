<template>
    <MovingTaskCreateTop />
        <div class="create-moving-task">
            Создание новой задачи на перемещение
            <MovingTaskCreateTask />
        </div>
</template>

<script>
import MovingTaskCreateTop from '@/views/moving_tasks/create/MovingTaskCreateTop.vue';
import MovingTaskCreateTask from '@/views/moving_tasks/create/MovingTaskCreateTask.vue';

export default {
  name: 'MovingTaskCreate',
  components: {
    MovingTaskCreateTop,
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