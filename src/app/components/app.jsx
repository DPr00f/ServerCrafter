import React from 'react';
import Router from 'react-router';
import Page from './page.jsx';
import ApplicationActions from '../actions/application.client';

class App extends React.Component {
  componentDidMount() {
    ApplicationActions.setServers(this.props.servers);
  }


  render() {
    return (
      <Page {...this.props}>
        <Router.RouteHandler {...this.props} />
      </Page>
    );
  }
}

export default App;
