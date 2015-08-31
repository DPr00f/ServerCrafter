import React from 'react';
import InfoBar from './infobar.jsx';
import Router from 'react-router';
import ReactTooltip from 'react-tooltip';

class Servers extends React.Component {
  static get defaultProps() {
    return {
      servers: []
    };
  }


  constructor(props) {
    super(props);
    this.state = {
      servers: this.props.servers
    };
  }


  componentDidMount() {
    if (!this.state.servers.length) {
      console.log("Request list of servers now");
    }
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
              show servers here!
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
