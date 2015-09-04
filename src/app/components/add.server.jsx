import React from 'react';
import Router from 'react-router';
import InfoBar from './infobar.jsx';
import Input from './input.jsx';
import Button from './button.jsx';
import ReactTooltip from 'react-tooltip';
import SocketEvents from '../events/socket';
import SocketAction from '../actions/socket.client';
import SocketStore from '../stores/socket.client';
import router from '../controllers/router.client';


class AddServer extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    SocketAction.addServer(this.getForm());
  }


  onTestConnectionClick() {
    SocketAction.testServer(this.getForm());
  }


  getForm() {
    return {
      display_name: React.findDOMNode(this.refs.display_name.refs.input).value,
      hostname: React.findDOMNode(this.refs.hostname.refs.input).value,
      port: React.findDOMNode(this.refs.port.refs.input).value,
      username: React.findDOMNode(this.refs.username.refs.input).value,
      password: React.findDOMNode(this.refs.password.refs.input).value
    };
  }


  componentDidMount() {
    this.router = require('../controllers/router.client');
    SocketStore.instance.on(SocketEvents.ADDED_SERVER, this.onServerAddedSuccess.bind(this));
  }


  componentWillUnmount() {
    SocketStore.instance.removeAllListeners(SocketEvents.ADDED_SERVER);
  }


  onServerAddedSuccess() {
    this.router.transitionTo("servers");
  }


  render() {
    return (
      <div className="content__addServer">
        <InfoBar name="Add Server">
          <Router.Link className="infobar__link flaticon-cancel28" data-tip='Cancel' to="servers"></Router.Link>
        </InfoBar>
        <div className="content__item">
          <form onSubmit={ this.onSubmit.bind(this) }>
            <Input name="display_name" ref="display_name" id="name">Display name (eg. Digital Ocean Server)</Input>
            <Input name="hostname" ref="hostname" id="hostname">Hostname/IP Address (eg. location.of.my.server.com)</Input>
            <Input name="port" ref="port" className="input--small" id="port">Port (eg. 22)</Input>
            <br />
            <Input name="username" ref="username" className="input--medium" id="username">Username (eg. root)</Input>
            <br />
            <Input name="password" ref="password" className="input--medium" id="password" isPassword={true}>Password (eg. *******)</Input>
            <br />
            <Button onClick={this.onTestConnectionClick.bind(this)}>
              <span>Test Server Connection</span>
            </Button>
            <Button type="submit">
              <span>Add Server</span>
            </Button>
          </form>
        </div>
        <ReactTooltip place='bottom' type='dark' effect='solid'/>
      </div>
    );
  }
}

export default AddServer;
