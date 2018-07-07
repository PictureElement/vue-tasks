<template>
  <div id="app" class="container">
    <section class="p-1 has-background-primary">
      <h1 class="title has-text-centered">Vue Tasks</h1>
    </section>
    <TodoList class="todo-list"></TodoList>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'app',
  components: {
    TodoList
  }
}
</script>

<style>
  .container {
    max-width: 640px !important;
  } 
  .p-1 {
    padding: 2rem;
  }
  .pb-1 {
    padding-bottom: 1.5rem;
  }
  .todo-list {
    border: 1px solid rgba(0,0,0,.125);
    border-top: none;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .05);
  }
</style>
