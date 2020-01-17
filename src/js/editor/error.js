import DOM from '../dom';

const feedbackText = '<p>Tytuł zadania nie może być dłuższy niż 12 znaków</p>';
export function addItemFailHandler() {
  DOM().formAddInput.value = '';
  DOM().feedbackAddFrom.classList.remove('none');

  setTimeout(() => {
    DOM().feedbackAddFrom.classList.add('none');
  }, 5000);

  const { feedbackAddFrom } = DOM();
  feedbackAddFrom.innerHTML = feedbackText;
}

export function editItemFailHandler() {
  DOM().feedbackEditTitle.classList.remove('none');

  setTimeout(() => {
    DOM().feedbackEditTitle.classList.add('none');
  }, 5000);

  const { feedbackEditTitle } = DOM();
  feedbackEditTitle.innerHTML = feedbackText;
}
