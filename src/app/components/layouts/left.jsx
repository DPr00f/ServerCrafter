import React from 'react';
import Router from 'react-router';
import ReactTooltip from 'react-tooltip';

class LeftLayout extends React.Component {

  render() {
    return (
      <div className="navbar">
        <div className="navbar__container">
          <ul className="navbar__menu">
            <li className="navbar__item--category">Navigation</li>
            <li className="navbar__item">
              <Router.Link className="navbar__link" to="home">
                <i className="flaticon-house158 navbar__icon"></i>
                <span className="text">Dashboard</span>
              </Router.Link>
            </li>
            <li className="navbar__item">
              <Router.Link className="navbar__link" to="servers">
                <i className="flaticon-servers1 navbar__icon"></i>
                <span className="text">Servers</span>
              </Router.Link>
            </li>
          </ul>
        </div>
        <div className="navbar__menu--bottom">
          <Router.Link data-tip='Settings' className="navbar__link--bottom" to="settings">
            <i className="flaticon-gears10 navbar__icon--bottom"></i>
          </Router.Link>
          <Router.Link data-tip='Profile' className="navbar__link--bottom" to="profile">
            <i className="flaticon-user168 navbar__icon--bottom"></i>
          </Router.Link>
          <a href="/logout" data-tip='Logout' className="navbar__link--bottom">
            <i className="flaticon-power27 navbar__icon--bottom"></i>
          </a>
        </div>
        <ReactTooltip place='top' type='dark' effect='solid'/>
      </div>
    );
  }
}

export default LeftLayout;
