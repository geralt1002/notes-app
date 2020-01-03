import DOM from '../../dom';
import * as events from './single_events';

const init = itemToShow => {
  const itemId = itemToShow.id;

  DOM().todoContentEl.textContent = itemToShow.title;
  DOM().todoMarkdownContent.textContent = itemToShow.body;

  events.remove(itemId);

  events.ItemSaveAll(itemId);

  events.itemShowPreviewMarkdown();
  events.itemShowEditorList();

  events.settingsKey();
};
export default init;
