import React from 'react';
import TopLayout from '../layouts/top.jsx';
import LeftLayout from '../layouts/left.jsx';
import RightLayout from '../layouts/right.jsx';
import Notifications from '../notifications.jsx';
import Login from './login.jsx';

class PagesBody extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <title>{ this.props.title }</title>
          <link href="/css/main.css" rel="stylesheet" type="text/css" />
        </head>
        <body>
          <Login { ...this.props }>
            <div className="content--pusher" />
            <Notifications { ...this.props } />
            <TopLayout { ...this.props } />
            <LeftLayout { ...this.props } />
            <RightLayout { ...this.props } />
          </Login>
          <script src="/js/main.js"></script>
        </body>
      </html>
    );
  }
}

export default PagesBody;
