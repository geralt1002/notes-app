<template>
  <header class="page_header">
    <h1>Notatnik</h1>
  </header>
  <main class="page_main">
    <AddNote
      v-model:title="title"
      v-model:search="searchQuery"
      :error-title="errorTitle"
      @add-note="addNote"
      @delete-note="deleteNote(singleNoteId)"
      @validate-title="validateTitle"
    />
    <section class="main_content">
      <EditorNote
        v-model:singleNoteTitle="singleNoteTitle"
        v-model:singleNoteDescription="singleNoteDescription"
        :markdown="markdown"
        :error-edit-title="errorEditTitle"
        @pdf="exportToPDF"
        @save="save(singleNoteId)"
        @validate-edit-title="validateEditTitle"
      />
      <NoteLists :notes="searchedNote" :get-note="getNote" />
    </section>
  </main>
  <footer class="page_footer">
    <p>| Krzysztof Umiński | 2021</p>
  </footer>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import {marked} from 'marked';

import pdfMake from 'pdfmake';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import AddNote from '../components/AddNote.vue';
import EditorNote from '../components/EditorNote.vue';
import NoteLists from '../components/NoteLists.vue';

import services from '../services/api_call';

export default {
  name: 'HomeView',
  components: {
    AddNote,
    EditorNote,
    NoteLists,
  },
  setup() {
    let notes = ref([]);
    let singleNoteTitle = ref('');
    let singleNoteDescription = ref('');
    let singleNoteId = ref();

    const router = useRouter();
    const title = ref('');
    const description = ref('');

    let errorTitle = ref('');

    const validateTitle = () => {
      errorTitle.value =
        title.value === ''
          ? 'Tytuł nie może być pusty'
          : title.value.length > 12
          ? 'Tytuł nie może przekraczać 12 znaków'
          : '';
    };

    let errorEditTitle = ref('');

    const validateEditTitle = () => {
      errorEditTitle.value =
        singleNoteTitle.value === ''
          ? 'Tytuł nie może być pusty'
          : singleNoteTitle.value.length > 12
          ? 'Tytuł nie może przekraczać 12 znaków'
          : '';
    };

    // Get All

    const getAllNotes = async () => {
      await services
        .fetchNotes()
        .then(response => {
          notes.value = response.data.notes;
          console.log(response.data.notes);
        })
        .catch(err => {
          console.log(err);
        });
    };

    // Add Note

    const addNote = async () => {
      if (title.value === '' || title.value.length > 12) {
        errorTitle.value = 'Tytuł nie może być pusty oraz nie może przekraczać 12 znaków';
      } else {
        services
          .addNote({
            title: title.value,
            description: title.value,
          })
          .then(res => {
            console.log(res);
            router.go({
              name: 'Home',
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    };

    // Delete Note

    const deleteNote = async singleNoteId => {
      await services
        .deleteNote(singleNoteId)
        .then(res => {
          console.log(res);
          router.go({
            path: '/',
          });
        })
        .catch(err => {
          console.log(err);
        });
    };

    // Get Single Note

    const getNote = id => {
      services
        .getNote(id)
        .then(response => {
          singleNoteTitle.value = response.data.title;
          singleNoteDescription.value = response.data.description;
          singleNoteId.value = response.data._id;
        })
        .catch(err => {
          console.log(err);
        });
    };

    // Save

    const save = async singleNoteId => {
      if (singleNoteTitle.value === '' || singleNoteTitle.value.length > 12) {
        errorEditTitle.value = 'Tytuł nie może być pusty oraz nie może przekraczać 12 znaków';
      } else {
        await services
          .updateNote(singleNoteId, {
            title: singleNoteTitle.value,
            description: singleNoteDescription.value,
          })
          .then(res => {
            console.log(res);
            router.go({
              path: '/',
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    };

    const markdown = computed(() => marked(singleNoteDescription.value));

    const exportToPDF = async () => {
      const pdfTable = markdown.value;
      const html = htmlToPdfmake(pdfTable);
      const titleNote = htmlToPdfmake(`<h1>${singleNoteTitle.value}</h1>`);

      const documentDefinition = {
        pageSize: 'A4',
        pageMargins: [100, 50, 100, 50],
        content: [
          {
            color: '#444',
            table: {
              widths: [400],
              body: [
                [
                  {
                    text: titleNote,
                    alignment: 'center',
                    fillColor: '#ba4b01',
                    color: '#fff',
                    margin: 5,
                    bold: true,
                  },
                ],
                [html],
              ],
            },
          },
        ],
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).download();
    };

    // search note

    const searchQuery = ref('');

    const searchedNote = computed(() => {
      return notes.value.filter(note => {
        return note.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1;
      });
    });

    onMounted(getAllNotes);

    return {
      title,
      description,
      singleNoteTitle,
      singleNoteDescription,
      singleNoteId,
      searchQuery,
      searchedNote,
      getAllNotes,
      addNote,
      deleteNote,
      getNote,
      save,
      markdown,
      exportToPDF,
      errorTitle,
      errorEditTitle,
      validateTitle,
      validateEditTitle,
    };
  },
};
</script>
