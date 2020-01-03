let DOM = {};

export const DOMInit = () => {
  DOM = {
    container: document.querySelector('#view'),
    introView: document.querySelector('#introView'),
    header: document.querySelector('#header'),

    todoListBox: document.querySelector('#todoList'),
    formTodo: document.querySelector('#formTodo'),

    formAddInput: document.querySelector('#formAddInput'),
    searchInput: document.querySelector('#searchInput'),

    todoFormEdit: document.querySelector('#todoFormEdit'),
    todoContentEl: document.querySelector('#todoContent'),
    todoMdContentPreview: document.querySelector('#todoMarkdownPreview'),
    todoMarkdownContent: document.querySelector('#todoMarkdownContent'),

    removeBtn: document.querySelector('#deleteItem'),
    saveBtn: document.querySelector('#saveItem'),
    saveMdBtn: document.querySelector('#saveMdItem'),
    markdownBtn: document.querySelector('#markdownBtn'),
    markdownPreviewBtn: document.querySelector('#markDownPreviewBtn'),
    editorPreviewBtn: document.querySelector('#editorPreviewBtn'),
    todoListBtn: document.querySelector('#todoListBtn'),

    feedback: document.querySelector('#feedback'),
    feedbackEditHeadline: document.querySelector('#feedback-edit-headline')
  };
};

const get = () => DOM;

export default get;
