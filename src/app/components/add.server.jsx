import React from 'react';
import Router from 'react-router';
import InfoBar from './infobar.jsx';
import Input from './input.jsx';
import ReactTooltip from 'react-tooltip';


class AddServer extends React.Component {

  render() {
    return (
      <div className="content__addServer">
        <InfoBar name="Add Server">
          <Router.Link className="infobar__link flaticon-cancel28" data-tip='Cancel' to="servers"></Router.Link>
        </InfoBar>
        <div>
          <Input id="hostname">Hostname</Input>
        </div>
        <ReactTooltip place='bottom' type='dark' effect='solid'/>
      </div>
    );
  }
}

export default AddServer;
