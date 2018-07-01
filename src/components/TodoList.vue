<template>
  <div>
    <!-- FORM -->
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <article class="message">
          <div class="message-body">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input required class="input" type="text" placeholder="Task title" v-model="newTask.title" v-bind:class="{ 'is-danger': titleError }">
              </div>
              <p v-if="titleError" class="help is-danger">Title required</p>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea class="textarea" placeholder="Task desciption" v-model="newTask.description"></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label">Date</label>
              <div class="control">
                <input required class="input" type="date" placeholder="Task date" v-model="newTask.date" v-bind:class="{ 'is-danger': dateError }">
              </div>
              <p v-if="dateError" class="help is-danger">Date required</p>
            </div>
            <div class="field">
              <button class="button is-primary" v-on:click="addTask">Submit</button>
            </div>
          </div>
        </article>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- TASK LIST -->
    <div v-for="(task, index) in tasks" :key="task.id">
      <article class="message is-small">
        <div class="message-header">
          <p>{{ task.title }} | {{ task.date }}</p>
          <button class="delete" aria-label="delete" v-on:click="deleteTask(index)"></button>
        </div>
        <div v-if="task.description" class="message-body">
          {{ task.description }}
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      newTask: {},
      tasks: [
        { title: 'Meeting w. E. You', description: 'Discuss about the future of Vue.js', date: '2018-09-13' },
        { title: 'Book Flight', description: 'Book flight with Etihad Airways to Paris, from 2018-09-20 to 2018-09-30', date: '2018-09-10' },
        { title: 'Haircut', description: '', date: '2018-09-11' },
        { title: 'Bike Ride', description: 'Plan the best route', date: '2018-09-12' },
        { title: 'Email to M. Zuckerberg', description: '', date: '2018-09-14' },
        { title: 'Find the Answer', description: 'Why are both of Spongebob\'s parents round like sea sponges while he is square like a kitchen sponge?', date: '2018-09-15' }
      ],
      titleError: false,
      dateError: false
    }
  },
  methods: {
    addTask: function(e) {
      if (this.newTask.title && this.newTask.date) {
        this.tasks.push(this.newTask);
        this.newTask = { title: '', desciption: '', date: ''};
        this.titleError = false;
        this.dateError = false;
        return;
      }
      if (!this.newTask.title) {
        this.titleError = true;
        this.newTask.title = '';
      }
      if (!this.newTask.date) {
        this.dateError = true;
        this.newTask.date = '';
      }
      e.preventDefault();
    },
    deleteTask: function(index) {
      if (confirm("Are you sure you want to delete this event?")) {
        console.log(index);
        this.tasks.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped>
  article {
    margin-bottom: 1.5rem;
  }
</style>
