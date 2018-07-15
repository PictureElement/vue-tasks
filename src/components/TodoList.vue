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
    <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <TodoItem style="animation-duration: 0.2s;" class="px-1 py-1" v-for="(task, index) in filteredTasks" :key="task.id" :task="task" :index="index" v-on:delete-task="deleteTask" v-on:done-edit="doneEdit"></TodoItem>
    </transition-group>

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
          <transition name="fade">
            <button v-if="showClearBtn" @click="clearCompleted" class="clear-btn button is-small is-danger">Clear</button>
          </transition>
        </div>
      </div>
    </footer>

  </section>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  data() {
    return {
      newTask:  { id: 0, title: '', description: '', date: '', completed: false, titleEditing: false, descriptionEditing: false, taskEditing: false },
      tasks: [],
      filter: "all",
      id: 1
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
      if (this.filter == 'all') {
        return this.tasks;
      }
      else if (this.filter == 'active') {
        return this.tasks.filter(task => { return !task.completed });
      }
      else if (this.filter == 'completed') {
        return this.tasks.filter(task => { return task.completed });
      }
      return this.tasks;
    },
    showClearBtn: function() {
      return this.tasks.filter(task => { return task.completed }).length > 0
    }
  },
  methods: {
    addTask: function() {
      if (this.newTask.title) {
        this.tasks.push(this.newTask);
        this.newTask = { id: this.id, title: '', description: '', date: '', completed: false, titleEditing: false, descriptionEditing: false, taskEditing: false };
        this.id++;
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
    clearCompleted: function() {
      this.tasks = this.tasks.filter(task => { return !task.completed });
    },
    doneEdit: function(data) {
      this.tasks.splice(data.index, 1, data.task);
    }
  }
}
</script>

<style scoped>

  @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .filters {
    margin-bottom: 0 !important;
  }

  .remaining {
    font-size: 0.75rem;
    margin-bottom: 0.75rem;
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
