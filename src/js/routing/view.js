import DOM from '../dom';

// HTML template
const getTemplate = url => new Promise(resolve => resolve(url));

// Render the view

const render = html => (DOM().container.innerHTML = html);

export const load = view =>
  new Promise((resolve, reject) => {
    getTemplate(view).then(html => {
      render(html);
      resolve();
    });
  });
