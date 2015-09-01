import React from 'react';
import Router from 'react-router';
import InfoBar from './infobar.jsx';
import Input from './input.jsx';
import Button from './button.jsx';
import ReactTooltip from 'react-tooltip';


class AddServer extends React.Component {

  render() {
    return (
      <div className="content__addServer">
        <InfoBar name="Add Server">
          <Router.Link className="infobar__link flaticon-cancel28" data-tip='Cancel' to="servers"></Router.Link>
        </InfoBar>
        <div className="content__item">
          <Input id="name">Display name (eg. Digital Ocean Server)</Input>
          <Input id="hostname">Hostname/IP Address (eg. location.of.my.server.com)</Input>
          <Input className="input--small" id="port">Port (eg. 22)</Input>
          <br />
          <Input className="input--medium" id="username">Username (eg. root)</Input>
          <br />
          <Input className="input--medium" id="password" isPassword={true}>Password (eg. *******)</Input>
          <br />
          <Button type="submit">
            <span>Add Server</span>
          </Button>
        </div>
        <ReactTooltip place='bottom' type='dark' effect='solid'/>
      </div>
    );
  }
}

export default AddServer;
