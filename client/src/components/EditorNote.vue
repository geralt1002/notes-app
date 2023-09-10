<template>
  <div class="container_note_app">
    <div class="btn--view-flex">
      <button class="btn_btn_mdpreview" type="button" @click="isPreview = true">Podgląd</button>
      <button class="btn_btn_mdpreview" type="button" @click="isPreview = false">Edytor</button>
      <button class="btn_btn_mdpreview" type="button" @click="$emit('pdf')">Pdf</button>
    </div>
    <form action="" class="form_editor">
      <textarea
        :value="singleNoteTitle"
        type="text"
        class="item_title"
        placeholder="Tytuł notatki..."
        @keyup="$emit('validateEditTitle', $events)"
        @blur="$emit('validateEditTitle', $events)"
        @input="event => $emit('update:singleNoteTitle', event.target.value)"
      ></textarea>
      <span v-if="errorEditTitle" class="feedback_input-title">{{ errorEditTitle }}</span>
      <textarea
        :value="singleNoteDescription"
        class="item_markdown_content"
        :class="[isPreview ? 'none' : '']"
        placeholder="Treść notatki..."
        @input="event => $emit('update:singleNoteDescription', event.target.value)"
      ></textarea>
      <div
        id="todoMarkdownPreview"
        class="item_markdown-preview"
        :class="[isPreview ? '' : 'none']"
        v-html="markdown"
      ></div>
      <button type="button" class="btn_btn--save" @click="$emit('save', $event)">Zapisz</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'EdiorNote',

  props: {
    singleNoteTitle: {
      type: String,
      required: true,
    },
    singleNoteDescription: {
      type: String,
      required: true,
    },
    markdown: {
      type: String,
      required: true,
    },
    errorEditTitle: {
      type: String,
      required: true,
    },
  },
  emits: [
    'update:singleNoteTitle',
    'update:singleNoteDescription',
    'pdf',
    'save',
    'validateEditTitle',
  ],

  setup() {
    let isPreview = ref(false);

    return { isPreview };
  },
};
</script>
