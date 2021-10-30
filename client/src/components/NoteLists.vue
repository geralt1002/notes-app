<template>
  <div class="section_note_list">
    <div class="todo_list_item">
      <a v-for="note in notes" :key="note._id" href="#" class="list_item--link">
        <div class="list_item" @click="getNote(note._id)">
          <h4 class="item_headline">{{ note.title }}</h4>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteList',
  props: {
    notes: {
      type: Array,
      required: true,
    },
    getNote: {
      type: Function,
      required: true,
    },
  },
};
</script>
