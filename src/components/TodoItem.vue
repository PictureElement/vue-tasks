<template>
  <section class="task">
    <input class="toggle" type="checkbox" v-model="completed" @change="doneEdit()">
    <div class="task-content">
      <div v-bind:class="{ 'completed': completed }">
        <label v-if="!titleEditing" @dblclick="editTitle()" class="view-title">{{ title }}</label>
        <input v-else class="edit-title" type="text" v-model="title" @blur="doneEdit()" @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()" v-focus>
      </div>
      <div v-bind:class="{ 'completed': completed }">
        <label v-if="!descriptionEditing" @dblclick="editDescription()" class="view-description">{{ description }}</label>
        <input v-else class="edit-description" type="text" v-model="description" @blur="doneEdit()" @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()" v-focus>
      </div>
    </div>
    <!-- EDIT FORM -->
    <div class="modal" v-bind:class="{ 'is-active': taskEditing }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="edit-task">
          <div class="field">
            <div class="control">
              <input required class="input" type="text" placeholder="Title" v-model="title">
            </div>
            <p v-if="titleError" class="help is-danger">Title required</p>
          </div>
          <div class="field">
            <div class="control">
              <textarea class="textarea" placeholder="Description" v-model="description"></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="date" placeholder="Date" v-model="date">
            </div>
          </div>
          <div class="field">
            <button class="button is-primary" @click="doneEdit()">Submit</button>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="cancelEdit()"></button>
    </div>
    <font-awesome-icon icon="edit" type="button" aria-label="edit" class="edit-icon" @click="editTask()" />
    <font-awesome-icon icon="times" type="button" aria-label="delete" class="delete-icon" @click="deleteTask(index)" />
  </section>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    task: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
      date: this.task.date,
      completed: this.task.completed,
      titleEditing: this.task.titleEditing,
      descriptionEditing: this.task.descriptionEditing,
      taskEditing: this.task.taskEditing,
      
      titleError: false,
      beforeEditTitle: "",
      beforeEditDescription: "",
      beforeEditDate: "",
      formVisible: false
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
  watch: {
    
  },
  methods: {
    deleteTask(index) {
      this.$emit('delete-task', index); // Send message to parent with event
    },
    editTask: function() {
      this.beforeEditTitle = this.title;
      this.beforeEditDescription = this.description;
      this.beforeEditDate = this.date;
      this.taskEditing = true;
    }, 
    editTitle: function() {
      this.beforeEditTitle = this.title;
      this.titleEditing = true;
    },
    editDescription: function() {
      this.beforeEditDescription = this.description;
      this.descriptionEditing = true;
    },
    doneEdit: function() {
      // We dont' want an empty title string
      if (this.title) {
        this.titleError = false;
        this.taskEditing = false;
        this.$emit('done-edit', {
          index: this.index,
          task: {
            id: this.id,
            title: this.title, 
            description: this.description, 
            date: this.date, 
            completed: this.completed, 
            titleEditing: this.titleEditing, 
            descriptionEditing: this.descriptionEditing, 
            taskEditing: this.taskEditing
          }
        });
      }
      else {
        this.titleError = true;
        this.title = this.beforeEditTitle;
      }
    },
    cancelEdit: function() {
      this.title = this.beforeEditTitle;
      this.titleEditing = false;
      this.description = this.beforeEditDescription;
      this.descriptionEditing = false;
      this.date = this.beforeEditDate;
      this.taskEditing = false;
    }
  }
}
</script>

<style>
  .delete-icon, .edit-icon {
    cursor: pointer;
    margin-left: 1.5rem;
  }

  .task {
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

  .task-content {
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
</style>
