import React from 'react';
import InfoBar from './infobar.jsx';

class Index extends React.Component {

  render() {
    return (
      <div className="content__index">
        <InfoBar name="Dashboard" />
        Wooohoooo!
      </div>
    );
  }
}

export default Index;
