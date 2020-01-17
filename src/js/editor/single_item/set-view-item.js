import DOM from '../../dom';

export default function setView(setValueView = 'editorPreview') {
  if (setValueView === 'MdPreview') {
    DOM().todoMdContentPreview.classList.remove('none');
    DOM().todoMdContentPreview.classList.add('item_markdown-preview');
    DOM().todoMarkdownContent.classList.add('none');
    DOM().markdownPreviewBtn.classList.add('btn_btn--focus');
    DOM().editorPreviewBtn.classList.remove('btn_btn--focus');
  } else {
    DOM().todoMdContentPreview.classList.add('none');
    DOM().todoMdContentPreview.classList.remove('item_markdown-preview');
    DOM().todoMarkdownContent.classList.remove('none');
    DOM().markdownPreviewBtn.classList.remove('btn_btn--focus');
    DOM().editorPreviewBtn.classList.add('btn_btn--focus');
  }
}
