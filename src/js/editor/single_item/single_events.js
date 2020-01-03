/* eslint-disable no-sequences */
import { setTimeout } from 'timers';
import page from 'page';
import showdown from 'showdown';
import DOM from '../../dom';
import * as todoAction from '../todo_events';

const mdConverter = new showdown.Converter();

// markdown preview
function showMdPreview() {
  DOM().todoMdContentPreview.classList.remove('none');
  DOM().todoMdContentPreview.classList.add('item_markdown-preview');
  DOM().todoMarkdownContent.classList.add('none');
  DOM().markdownPreviewBtn.classList.add('btn_btn--focus');
  DOM().editorPreviewBtn.classList.remove('btn_btn--focus');
}
function showList() {
  console.log('showlist');
  DOM().todoMdContentPreview.classList.add('none');
  DOM().todoMdContentPreview.classList.add('item_markdown-preview');
  DOM().todoMarkdownContent.classList.remove('none');
  DOM().markdownPreviewBtn.classList.remove('btn_btn--focus');
  DOM().editorPreviewBtn.classList.add('btn_btn--focus');
}

export function itemShowPreviewMarkdown() {
  DOM().markdownPreviewBtn.addEventListener('click', () => {
    const text = DOM().todoMarkdownContent.value;
    if (text) {
      const html = mdConverter.makeHtml(text);
      showMdPreview();
      DOM().todoMdContentPreview.innerHTML = html;
    }
  });
}
// list open

export function itemShowEditorList() {
  DOM().editorPreviewBtn.addEventListener('click', () => {
    showList();
  });
}
// delete event

export function remove(itemId) {
  DOM().removeBtn.addEventListener('click', () => {
    todoAction.remove(itemId).then(() => page('/appView'));
  });
}
// save event

function itemSave(itemId) {
  DOM().todoFormEdit.addEventListener('submit', e => {
    e.preventDefault();

    const feedbackInnerHTML2 =
      '<p>Treść zadania jest za długa. Max 12 znaków</p>';

    const todoContent = DOM().todoContentEl.value.trim();

    if (todoContent && todoContent.length < 12) {
      todoAction
        .save(itemId, todoContent)
        .then(() => page(`/appView/${itemId}`));
    } else {
      console.log('błąd - za dluga nazwa');

      setTimeout(() => {
        DOM().feedbackEditHeadline.classList.remove('none');
        const { feedbackEditHeadline } = DOM();
        feedbackEditHeadline.innerHTML = feedbackInnerHTML2;
      }, 100);

      setTimeout(() => {
        DOM().feedbackEditHeadline.classList.add('none');
      }, 5000);
    }
  });
}

function itemSaveMd(itemId) {
  DOM().todoFormEdit.addEventListener('submit', e => {
    e.preventDefault();
    const todoMDContent = DOM().todoMarkdownContent.value;
    todoAction
      .saveMD(itemId, todoMDContent)
      .then(() => page(`/appView/${itemId}`));
  });
}

export function ItemSaveAll(itemId) {
  itemSave(itemId);
  itemSaveMd(itemId);
}

// settings Key

export function settingsKey() {
  const headlineTextarea = DOM().todoContentEl;
  headlineTextarea.addEventListener('keydown', e => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      // alert('ok');
      return false;
    }
  });
}
