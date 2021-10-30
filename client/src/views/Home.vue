<template>
  <header class="page_header">
    <div v-if="feedbackAlert" class="feedback_input--add">
      <p>
        {{ feedbackAlert }}
      </p>
    </div>

    <h1>Notatnik</h1>
  </header>
  <main class="page_main">
    <AddNote
      v-model:title="title"
      v-model:search="searchQuery"
      @addNote="addNote"
      @deleteNote="deleteNote(singleNoteId)"
    />
    <section class="main_content">
      <EditorNote
        v-model:singleNoteTitle="singleNoteTitle"
        v-model:singleNoteDescription="singleNoteDescription"
        :markdown="markdown"
        @pdf="exportToPDF"
        @save="save(singleNoteId)"
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

import marked from 'marked';

import pdfMake from 'pdfmake';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import AddNote from '../components/AddNote.vue';
import EditorNote from '../components/EditorNote.vue';
import NoteLists from '../components/NoteLists.vue';

import services from '../services/api_call';

export default {
  name: 'Home',
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

    const feedbackAlert = computed(() => {
      return title.value.length > 12 || singleNoteTitle.value.length > 12
        ? 'Tytuł zadania nie może być dłuższy niż 12 znaków'
        : '';
    });

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
      if (title.value.length > 12) {
        title.value = '';
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
      feedbackAlert,
    };
  },
};
</script>
