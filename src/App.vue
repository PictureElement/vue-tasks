<template>
  <div id="app" class="container">
    <section class="p-1 has-background-dark">
      <h1 class="title has-text-centered has-text-white">Vue Tasks</h1>
    </section>
    <TodoList></TodoList>
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
    max-width: 425px !important;
  } 
  .p-1 {
    padding: 2rem;
  }
  .pb-1 {
    padding-bottom: 1.5rem;
  }
  #app{
    border: 1px solid rgba(0,0,0,.125);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .05);
  }
</style>
