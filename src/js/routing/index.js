import page from 'page';
import * as routes from './routes';

page.base('/dist');
page('/', routes.appView);
page('/appView', routes.appView);
page('/appView/:id', routes.appView);

page('*', routes.notFound);
page();
