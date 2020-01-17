import DOM from '../../dom';
import * as events from './single_events';

const init = itemToShow => {
  const { id } = itemToShow;

  DOM().todoContentEl.textContent = itemToShow.title;
  DOM().todoMarkdownContent.textContent = itemToShow.body;

  events.removeItem(id);

  events.itemSave(id);
  //   events.ItemSaveAll(id);

  events.ShowPreviewMarkdown();
  events.ShowEditorItem();

  events.disableEnterKey();
};
export default init;
