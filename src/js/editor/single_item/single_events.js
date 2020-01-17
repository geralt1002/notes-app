/* eslint-disable no-sequences */
import DOM from '../../dom';
import showdown from 'showdown';
import page from 'page';
import * as client from '../../api-client';
import setView from './set-view-item';
import * as failHandler from '../error';

const mdConverter = new showdown.Converter();

export function ShowPreviewMarkdown(setValueView) {
  DOM().markdownPreviewBtn.addEventListener('click', () => {
    const text = DOM().todoMarkdownContent.value;
    if (text) {
      const html = mdConverter.makeHtml(text);
      setView((setValueView = 'MdPreview'));
      console.log(setValueView);

      DOM().todoMdContentPreview.innerHTML = html;
    }
  });
}
// list open

export function ShowEditorItem(setValueView) {
  DOM().editorPreviewBtn.addEventListener('click', () => {
    setView((setValueView = 'editorPreview'));
    console.log(setValueView);
  });
}

// delete event

export function removeItem(id) {
  DOM().removeBtn.addEventListener('click', () => {
    client.remove(id).then(() => page('/appView'));
  });
}
// save event

export function itemSave(id) {
  DOM().todoFormEdit.addEventListener('submit', e => {
    e.preventDefault();

    const todoContent = DOM().todoContentEl.value.trim();
    const todoMDContent = DOM().todoMarkdownContent.value;

    if (todoContent && todoContent.length < 12 && todoMDContent) {
      client
        .save(id, todoContent, todoMDContent)
        .then(() => page(`/appView/${id}`));
    } else {
      console.log('błąd - za dluga nazwa');
      failHandler.editItemFailHandler();
    }
  });
}

// settings Key

export function disableEnterKey() {
  const headlineTextarea = DOM().todoContentEl;
  headlineTextarea.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // alert('ok');
    }
  });
}
