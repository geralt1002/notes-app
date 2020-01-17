let DOM = {};

export const DOMInit = () => {
  DOM = {
    container: document.querySelector('#view'),
    introView: document.querySelector('#introView'),

    todoListBox: document.querySelector('#todoList'),
    formTasks: document.querySelector('#formTasks'),

    formAddInput: document.querySelector('#formAddInput'),
    searchInput: document.querySelector('#searchInput'),

    todoFormEdit: document.querySelector('#todoFormEdit'),
    todoContentEl: document.querySelector('#itemTitle'),
    todoMdContentPreview: document.querySelector('#todoMarkdownPreview'),
    todoMarkdownContent: document.querySelector('#todoMarkdownContent'),

    removeBtn: document.querySelector('#deleteItem'),
    saveBtn: document.querySelector('#saveItem'),
    saveMdBtn: document.querySelector('#saveMdItem'),
    markdownBtn: document.querySelector('#markdownBtn'),
    markdownPreviewBtn: document.querySelector('#markDownPreviewBtn'),
    editorPreviewBtn: document.querySelector('#editorPreviewBtn'),

    feedbackAddFrom: document.querySelector('#feedback'),
    feedbackEditTitle: document.querySelector('#feedbackEditTitle')
  };
};

const get = () => {
  return !DOMInit() ? DOM : DOMInit();
};
export default get;
