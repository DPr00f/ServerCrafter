function serveRoute(app, route) {
  let funcs = route.mediators.slice();
  funcs.push(route.func);
  switch (route.type.toLowerCase()) {
    case 'all':
      app.all(route.route, ...funcs);
      break;
    case 'get':
      app.get(route.route, ...funcs);
      break;
    case 'post':
      app.post(route.route, ...funcs);
      break;
    case 'put':
      app.put(route.route, ...funcs);
      break;
    case 'delete':
      app.delete(route.route, ...funcs);
      break;
    default:
      throw new Error(route.type + ' is not as a valid request type.');
  }
}

class RoutesController {
  constructor(app) {
    this.app = app;
    this.routes = [];
  }


  add(route, type, func, mediators = []) {
    var obj = { route: route, type: type, func: func, mediators: mediators };
    this.routes.push(obj);
    serveRoute(this.app, obj);
  }
}

export default RoutesController;
