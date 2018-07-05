<template>
  <div>
    <!-- FORM -->
    <div class="modal" v-bind:class="{ 'is-active': formVisible }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <form>
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
        </form>
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="closeForm"></button>
    </div>
    <!-- TASK LIST -->
    <div class="taskItem-body container" v-for="(task, index) in tasks" :key="task.id">
      <input type="checkbox" v-model="tasks[index].completed">
      <div class="taskItem-titleWrapper" v-bind:class="{ 'completed': tasks[index].completed }">
        <span class="taskItem-title">{{ task.title }}</span>
        <span class="taskItem-description">{{ task.description }}</span>
      </div>
      <button class="delete is-small" aria-label="delete" v-on:click="deleteTask(index)"></button>
    </div>
    <button class="add-task button is-primary is-rounded" v-on:click="openForm">+ Add a task</button>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      formVisible: false,
      newTask:  { title: '', desciption: '', date: '', completed: false },
      tasks: [
        { title: 'Meeting w. E. You', description: 'Discuss about the future of Vue.js.', date: '2018-09-13', completed: false },
        { title: 'Book Flight', description: 'Book flight with Etihad Airways to Paris.', date: '2018-09-10', completed: false },
        { title: 'Haircut', description: '', date: '2018-09-11', completed: false },
        { title: 'Bike Ride', description: 'Plan the best route', date: '2018-09-12', completed: false },
        { title: 'Email to M. Zuckerberg', description: '', date: '2018-09-14', completed: false }
      ],
      titleError: false,
      dateError: false
    }
  },
  methods: {
    openForm: function() {
      this.formVisible = true;
    },
    closeForm: function() {
      this.formVisible = false;
    },
    addTask: function(e) {
      e.preventDefault();
      if (this.newTask.title && this.newTask.date) {
        this.formVisible = false;
        swal({
          text: "Task has been added.",
          icon: "success",
        });
        this.tasks.push(this.newTask);
        this.newTask = { title: '', desciption: '', date: '', completed: false };
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
    },
    deleteTask: function(index) {
      swal({
        title: "Delete this task?",
        text: "This will permanently remove it!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.tasks.splice(index, 1);
          swal("Task has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Task is safe!");
        }
      });
    }
  }
}
</script>

<style scoped>
  article {
    margin-bottom: 1.5rem;
  }
  .taskItem-body {
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break: break-word;
    padding: 0 10px;
    border-bottom: 1px solid #e5e5e5;
    min-height: 60px;
  }
  .taskItem-titleWrapper {
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
  }
  .taskItem-title {
    font-size: 1rem;
  }
  .taskItem-description {
    font-size: 80%;
  }
  .completed {
    text-decoration: line-through;
  }
  .delete {
    margin-left: auto;
  }
  .add-task {
    margin-top: 30px;
    display: block;
    margin: 30px auto 0 auto;
  }
  form {
    background: #fff;
    padding: 1rem;
    border-radius: 5px;
  }
</style>
