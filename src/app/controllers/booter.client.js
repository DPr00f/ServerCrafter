import React from 'react';
import router from './router.client';
import Router from 'react-router';

export default {
  props: function props() {
    return window.__REACT_ENGINE__;
  },


  startRouter: function startRouter(options, callback) {
    var Routes = options.routes;
    var viewResolver = options.viewResolver;

    var props = this.props();

    router.run(function onRouterRun(Component) {

      var componentInstance = React.createElement(Component, props);

      React.render(componentInstance, document);
    });

    // call the callback with the data that was used for rendering
    return callback && callback(props);
  }
};
