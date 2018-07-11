<template>
  <section>

    <!-- INPUT AREA -->
    <div class="inputArea">
      <div class="group">      
        <input class="inputArea-input" required type="text" v-model="newTask.title" @keyup.enter="addTask">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label class="inputArea-label">Add a new task</label>
      </div>
    </div>
    
    <!-- TASK LIST -->
    <div class="taskList px-1 py-1" v-for="(task, index) in filteredTasks" :key="task.id">
      <input class="toggle" type="checkbox" v-model="task.completed">
      <div class="taskList-content">
        <div v-bind:class="{ 'completed': task.completed }">
          <label v-if="!task.titleEditing" @dblclick="editTitle(task)" class="view-title">{{ task.title }}</label>
          <input v-else class="edit-title" type="text" v-model="task.title" @blur="doneTitleEdit(task)" @keyup.enter="doneTitleEdit(task)" @keyup.esc="cancelTitleEdit(task)" v-focus>
        </div>
        <div v-bind:class="{ 'completed': task.completed }">
          <label v-if="!task.descriptionEditing" @dblclick="editDescription(task)" class="view-description">{{ task.description }}</label>
          <input v-else class="edit-description" type="text" v-model="task.description" @blur="doneDescriptionEdit(task)" @keyup.enter="doneDescriptionEdit(task)" @keyup.esc="cancelDescriptionEdit(task)" v-focus>
        </div>
      </div>
      <!-- EDIT FORM -->
      <div class="modal" v-bind:class="{ 'is-active': task.taskEditing }">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="edit-task">
            <div class="field">
              <div class="control">
                <input required class="input" type="text" placeholder="Title" v-model="task.title">
              </div>
              <p v-if="titleError" class="help is-danger">Title required</p>
            </div>
            <div class="field">
              <div class="control">
                <textarea class="textarea" placeholder="Description" v-model="task.description"></textarea>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input" type="date" placeholder="Date" v-model="task.date">
              </div>
            </div>
            <div class="field">
              <button class="button is-primary" @dblclick="doneTaskEdit(task)">Submit</button>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @dblclick="cancelTaskEdit(task)"></button>
      </div>
      <font-awesome-icon icon="edit" type="button" aria-label="edit" class="edit-icon" @dblclick="editTask(task)" />
      <font-awesome-icon icon="times" type="button" aria-label="delete" class="delete-icon" @dblclick="deleteTask(index)" />
    </div>

    <footer class="px-1 py-1">
      <div class="remaining">
        <span>{{ remaining }} tasks left</span>
      </div>
      <div class="level is-mobile filters">
        <div class="level-left">
          <div class="buttons has-addons">
            <span class="button is-small" v-bind:class="{ 'is-active': filter == 'all' }" @click="filter = 'all'">All</span>
            <span class="button is-small" v-bind:class="{ 'is-active': filter == 'active' }" @click="filter = 'active'">Active</span>
            <span class="button is-small" v-bind:class="{ 'is-active': filter == 'completed' }" @click="filter = 'completed'">Completed</span>
          </div>
        </div>
        <div class="level-right">
          <button class="clear-btn button is-small is-danger">Clear</button>
        </div>
      </div>
    </footer>

  </section>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      formVisible: false,
      newTask:  { title: '', desciption: '', date: '', completed: false, titleEditing: false, descriptionEditing: false, taskEditing: false },
      tasks: [],
      /*
      tasks: [
        { title: 'Meeting w. E. You', description: 'Discuss about the future of Vue.js.', date: '2018-09-13', completed: false, titleEditing: false, descriptionEditing: false, taskEditing: false },
        { title: 'Book Flight', description: 'Book flight with Etihad Airways to Paris.', date: '2018-09-10', completed: false, titleEditing: false, descriptionEditing: false, taskEditing: false },
        { title: 'Haircut', description: '', date: '2018-09-11', completed: false, titleEditing: false, descriptionEditing: false, taskEditing: false },
        { title: 'Bike Ride', description: 'Plan the best route.', date: '2018-09-12', completed: false, titleEditing: false, descriptionEditing: false, taskEditing: false },
        { title: 'Email to M. Zuckerberg', description: '', date: '2018-09-14', completed: false, titleEditing: false, descriptionEditing: false, taskEditing: false }
      ],
      */
      titleError: false,
      beforeEditTitle: "",
      beforeEditDescription: "",
      beforeEditDate: "",
      filter: "all"
    }
  },
  computed: {
    /*
    // ES5
    remaining: function() {
      return this.tasks.filter(function (task) {
        return !task.completed;
      }).length;
    },
    */
    // ES6 - Arrow functions
    remaining: function() {
      return this.tasks.filter(task => { return !task.completed }).length;
    },
    filteredTasks: function() {
      if (this.filter === 'all') {
        return this.tasks;
      }
      else if (this.filter === 'active') {
        return this.tasks.filter(task => { return !task.completed});
      }
      else {
        return this.tasks.filter(task => { return task.completed});
      }
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
    addTask: function() {
      if (this.newTask.title) {
        this.tasks.push(this.newTask);
        this.newTask = { title: '', desciption: '', date: '', completed: false, titleEditing: false, descriptionEditing: false, taskEditing: false };
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
      this.beforeEditTitle = task.title;
      task.titleEditing = true;
    },
    editDescription: function(task) {
      this.beforeEditDescription = task.description;
      task.descriptionEditing = true;
    },
    editTask: function(task) {
      this.beforeEditTitle = task.title;
      this.beforeEditDescription = task.description;
      this.beforeEditDate = task.date;
      task.taskEditing = true;
    },
    doneTitleEdit: function(task) {
      // We don't want empty title strings
      if (!task.title) {
        task.title = this.beforeEditTitle;
      }
      task.titleEditing = false;
    },
    doneDescriptionEdit: function(task) {
      task.descriptionEditing = false;
    },
    doneTaskEdit: function(task) {
      // We dont' want an empty title string
      if (task.title) {
        this.titleError = false;
        task.taskEditing = false;
        return;
      }
      else {
        this.titleError = true;
        this.newTask.title = '';
        return;
      }
    },
    cancelTitleEdit: function(task) {
      task.title = this.beforeEditTitle;
      task.titleEditing = false;
    },
    cancelDescriptionEdit: function(task) {
      task.description = this.beforeEditDescription;
      task.descriptionEditing = false;
    },
    cancelTaskEdit: function(task) {
      task.title = this.beforeEditTitle;
      task.description = this.beforeEditDescription;
      task.date = this.beforeEditDate;
      task.taskEditing = false;
    }
  }
}
</script>

<style scoped>

  .filters {
    margin-bottom: 0 !important;
  }

  .remaining {
    font-size: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .delete-icon, .edit-icon {
    cursor: pointer;
    margin-left: 1.5rem;
  }

  .taskList {
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break: break-word;
    border-bottom: 1px solid rgba(0,0,0,.125);
    min-height: 60px;
  }

  .toggle {
    margin-right: 1.5rem;
    cursor: pointer;
  }

  .taskList-content {
    width: 100%;
  }

  .view-title {
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
  }

  .view-description {
    font-size: .8rem;
    font-weight: 400;
    cursor: pointer;
    width: 100%;
  }

  .edit-title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1;
    border: none;
    color: #00d1b2;
    width: 100%;
  }

  .edit-title:focus {
    outline: none;
  }

  .edit-description {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1;
    border: none;
    color: #00d1b2;
    width: 100%;
  }

  .edit-description:focus {
    outline: none;
  }

  .completed {
    text-decoration: line-through;
  }

  .delete {
    margin-left: 1.5rem;
  }

  .edit-task {
    background: #fff;
    padding: 1rem;
    border-radius: 5px;
  }
  
  .px-1 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .py-1 {
    padding-top: .75rem;
    padding-bottom: .75rem;
  }

  /* Google Material Design Inputs */
  .group { 
    position:relative; 
    margin-bottom:0;
  }

  .inputArea {
    padding: 3rem 1.5rem;
  }

  .inputArea-input {
    font-size:1rem;
    padding:10px 10px 10px 5px;
    display:block;
    width:100%;
    border:none;
    border-bottom:1px solid rgba(0,0,0,.125);
  }

  .inputArea-input:focus { 
    outline:none; 
  }

  .inputArea-label {
    color:#999; 
    font-size:1rem;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:5px;
    top:10px;
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }

  .inputArea-input:focus ~ label, .inputArea-input:valid ~ label {
    top:-20px;
    font-size:14px;
    color:#00d1b2;
  }

  .bar { 
    position:relative; 
    display:block; 
    width:100%;
  }

  .bar:before, .bar:after {
    content:'';
    height:2px; 
    width:0;
    bottom:1px; 
    position:absolute;
    background:#00d1b2;
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }

  .bar:before {
    left:50%;
  }

  .bar:after {
    right:50%; 
  }

  .inputArea-input:focus ~ .bar:before, .inputArea-input:focus ~ .bar:after {
    width:50%;
  }

  .highlight {
    position:absolute;
    height:60%; 
    width:100px; 
    top:25%; 
    left:0;
    pointer-events:none;
    opacity:0.5;
  }

  .inputArea-input:focus ~ .highlight {
    -webkit-animation:inputHighlighter 0.3s ease;
    -moz-animation:inputHighlighter 0.3s ease;
    animation:inputHighlighter 0.3s ease;
  }

  @-webkit-keyframes inputHighlighter {
    from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
  @-moz-keyframes inputHighlighter {
    from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
  @keyframes inputHighlighter {
    from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
</style>
