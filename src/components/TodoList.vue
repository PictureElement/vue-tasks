<template>
  <div>
    <!-- FORM -->
    <div class="modal" v-bind:class="{ 'is-active': formVisible }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <form>
          <div class="field">
            <div class="control">
              <input required class="input" type="text" placeholder="Task title" v-model="newTask.title" v-bind:class="{ 'is-danger': titleError }">
            </div>
            <p v-if="titleError" class="help is-danger">Title required</p>
          </div>
          <div class="field">
            <div class="control">
              <textarea class="textarea" placeholder="Task desciption" v-model="newTask.description"></textarea>
            </div>
          </div>
          <div class="field">
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
    <div class="task container" v-for="(task, index) in tasks" :key="task.id">
      <input class="toggle" type="checkbox" v-model="tasks[index].completed">
      <div class="task-content">
        <div class="titleWrapper" v-bind:class="{ 'completed': tasks[index].completed }">
          <label v-if="!task.titleEditing" @dblclick="editTitle(task)" class="title">{{ task.title }}</label>
          <input v-else class="edit-title" type="text" v-model="task.title" @blur="doneTitleEdit(task)" @keyup.enter="doneTitleEdit(task)" @keyup.esc="cancelTitleEdit(task)" v-focus>
        </div>
        <div class="descriptionWrapper" v-bind:class="{ 'completed': tasks[index].completed }">
          <label v-if="!task.descriptionEditing" @dblclick="editDescription(task)" class="description">{{ task.description }}</label>
          <input v-else class="edit-description" type="text" v-model="task.description" @blur="doneDescriptionEdit(task)" @keyup.enter="doneDescriptionEdit(task)" @keyup.esc="cancelDescriptionEdit(task)" v-focus>
        </div>
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
        { title: 'Meeting w. E. You', description: 'Discuss about the future of Vue.js.', date: '2018-09-13', completed: false, titleEditing: false, descriptionEditing: false },
        { title: 'Book Flight', description: 'Book flight with Etihad Airways to Paris.', date: '2018-09-10', completed: false, titleEditing: false, descriptionEditing: false },
        { title: 'Haircut', description: '', date: '2018-09-11', completed: false, titleEditing: false, descriptionEditing: false },
        { title: 'Bike Ride', description: 'Plan the best route.', date: '2018-09-12', completed: false, titleEditing: false, descriptionEditing: false },
        { title: 'Email to M. Zuckerberg', description: '', date: '2018-09-14', completed: false, titleEditing: false, descriptionEditing: false }
      ],
      titleError: false,
      dateError: false,
      beforeEditCache: ""
    }
  },
  // Register your own directive (i.e. v-focus). 
  // All elements that have this directive, gain focus when the page loads.
  directives: {
    focus: {
      inserted: function (el) {
        // Focus the element
        el.focus()
      }
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
        this.newTask = { title: '', desciption: '', date: '', completed: false, titleEditing: false, descriptionEditing: false };
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
    },
    editTitle: function(task) {
      this.beforeEditCache = task.title;
      task.titleEditing = true;
    },
    editDescription: function(task) {
      this.beforeEditCache = task.desciption;
      task.descriptionEditing = true;
    },
    doneTitleEdit: function(task) {
      // We don't want empty strings
      if (!task.title) {
        task.title = this.beforeEditCache;
        return;
      }
      task.titleEditing = false;
    },
    doneDescriptionEdit: function(task) {
      task.descriptionEditing = false;
    },
    cancelTitleEdit: function(task) {
      task.title = this.beforeEditCache;
      task.titleEditing = false;
    }
  }
}
</script>

<style scoped>
  article {
    margin-bottom: 1.5rem;
  }
  .task {
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break: break-word;
    padding: 0 10px;
    border-bottom: 1px solid #e5e5e5;
    min-height: 60px;
    user-select: none;
  }
  .toggle {
    margin-right: 20px;
    cursor: pointer;
  }
  .task-content {
    width: 100%;
  }
  .title {
    font-size: 1rem;
    cursor: pointer;
  }
  .description {
    font-size: 0.8rem;
    cursor: pointer;
  }
  .completed {
    text-decoration: line-through;
  }
  .delete {
    margin-left: 20px;
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
  .edit-title {
    font-size: 1rem;
    font-weight: 600;
    padding-left: 0;
    line-height: 1.125;
    border: none;
    color: #00d1b2;
    user-select: none;
    width: 100%;
  }
  .edit-title:focus {
    outline: none;
    user-select: none;
  }
  .edit-description {
    font-size: 0.8rem;
    font-weight: 400;
    padding-left: 0;
    line-height: 1.5;
    border: none;
    color: #00d1b2;
    user-select: none;
    width: 100%;
  }
  .edit-description:focus {
    outline: none;
    user-select: none;
  }
</style>
