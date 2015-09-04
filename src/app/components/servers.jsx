import React from 'react';
import InfoBar from './infobar.jsx';
import Router from 'react-router';
import ReactTooltip from 'react-tooltip';
import ApplicationStore from '../stores/application.client';
import ApplicationEvents from '../events/application';

class Servers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servers: ApplicationStore.instance.getServers().slice(),
      newServer: {}
    };
  }


  componentDidMount() {
    ApplicationStore.instance.on(ApplicationEvents.ADDED_SERVER, this.onServerAdded.bind(this));
  }

  componentWillUnmount() {
    ApplicationStore.instance.removeAllListeners(ApplicationEvents.ADDED_SERVER);
  }


  onServerAdded(serverInfo) {
    this.setState({
      servers: ApplicationStore.instance.getServers().slice(),
      newServer: serverInfo
    });
  }


  render() {
    return (
      <div className="content__servers">
        <InfoBar name="Servers">
          <Router.Link className="flaticon-add34 infobar__link" data-tip='Add Server' to="serverAdd"></Router.Link>
        </InfoBar>
        { !!this.state.servers.length ?
          <div className="content__area">
            <div className="content__item">
              {
                this.state.servers.map(function addServer(server) {
                  return (
                    <div key={ server.id }>{server.displayName}</div>
                  );
                })
              }
            </div>
          </div>
          :
          <div className="notice">
            There are no servers yet, <Router.Link to="serverAdd">add one now!</Router.Link>
          </div>
        }

        <ReactTooltip place='bottom' type='dark' effect='solid'/>
      </div>
    );
  }
}

export default Servers;
