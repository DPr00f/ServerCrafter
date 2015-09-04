import Booter from '../../app/controllers/booter.client';
import Routes from '../../app/components/routes.jsx';

require('../../app/components/**/*.jsx', {glob: true});

var options = {
  routes: Routes,
  viewResolver: (viewName) => {
    return require('../../app/components/' + viewName);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Booter.startRouter(options);
});
