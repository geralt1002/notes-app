import page from 'page';
import { setTimeout } from 'timers';
import DOM from '../../dom';
import * as todoAction from '../todo_events';

// add section
export function initAdd(cb) {
  DOM().formTodo.addEventListener('submit', e => {
    e.preventDefault();

    const feedbackInnerHTML =
      '<p>Treść zadania jest za długa. Max 12 znaków</p>';

    const addInput = DOM().formAddInput.value.trim();

    if (addInput && addInput.length < 12) {
      todoAction.add(addInput).then(item => {
        cb(item).then(() => page('/appView/'));
      });
    } else {
      DOM().formAddInput.value = '';
      DOM().feedback.classList.remove('none');

      setTimeout(() => {
        DOM().feedback.classList.add('none');
      }, 5000);

      const { feedback } = DOM();
      feedback.innerHTML = feedbackInnerHTML;
    }
  });
}

// search section

let search = '';

export function getSearch() {
  return search;
}

export function initSearch(cb) {
  DOM().searchInput.addEventListener('input', function() {
    search = this.value;
    cb();
  });
}
