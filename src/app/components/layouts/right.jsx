import React from 'react';

class RightLayout extends React.Component {

  render() {
    return (
      <div className="content">
        { this.props.children }
      </div>
    );
  }
}

export default RightLayout;
