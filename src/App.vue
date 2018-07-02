<template>
  <div id="app">
    <section class="mb-0 hero is-primary block">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Vue Tasks
          </h1>
          <h2 class="subtitle">
            Designed and Developed by PictureElement
          </h2>
        </div>
      </div>
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
  .mb-0 {
    margin-bottom: 0 !important;
  }
</style>
