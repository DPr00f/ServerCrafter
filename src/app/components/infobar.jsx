import React from 'react';

class InfoBar extends React.Component {
  static get defaultProps() {
    return {
      name: "undefined"
    };
  }


  render() {
    return (
      <div className="infobar">
        <div className="infobar__name">{ this.props.name }</div>
        <div className="infobar__menu">{ this.props.children }</div>
      </div>
    );
  }
}

export default InfoBar;
