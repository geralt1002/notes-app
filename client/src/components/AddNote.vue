<template>
  <section class="toolbar">
    <form class="form_toolbar--grid">
      <div class="form_input_task">
        <label for="formAddInput" class="form_label">Dodaj nowe zadanie</label>
        <input
          :value="title"
          type="text"
          name="formAddInput"
          class="add_input form_input_element"
          placeholder="np. Zadanie 1"
          autocomplete="off"
          @keyup="$emit('validateTitle', $events)"
          @blur="$emit('validateTitle', $events)"
          @input="event => $emit('update:title', event.target.value)"
        />
        <span v-if="errorTitle" class="feedback_input-title">{{ errorTitle }}</span>
      </div>
      <div class="btn_btn--submit">
        <button class="btn btn_btn--add" type="button" @click="$emit('addNote', $events)">
          Dodaj
        </button>
        <button type="button" class="btn btn_btn--remove" @click="$emit('deleteNote', $event)">
          Usuń
        </button>
      </div>
      <div class="form_input_task">
        <label for="formSearchInput" class="form_label">Wyszukaj zadanie</label>
        <input
          :value="search"
          type="text"
          name="formSearchInput"
          class="input_search form_input_element"
          placeholder="np. Zadanie 1"
          @input="event => $emit('update:search', event.target.value)"
        />
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'AddNote',
  props: {
    title: {
      type: String,
      required: true,
    },
    search: {
      type: String,
      required: true,
    },
    errorTitle: {
      type: String,
      required: true,
    },
  },
  emits: ['update:search', 'update:title', 'addNote', 'deleteNote', 'validateTitle'],
};
</script>
