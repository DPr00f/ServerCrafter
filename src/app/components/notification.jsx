import React from 'react';

class Notification extends React.Component {
  static get defaultProps() {
    return {
      onDelete: function () {},
      closingAnimationDuration: 300,
      autoClose: true,
      timeout: 8 * 1000
    };
  }


  constructor(props) {
    super(props);
    this.state = {
      closing: false
    };
  }


  close() {
    global.clearTimeout(this.autoCloseTimeout);
    this.setState({
      closing: true
    });

    global.setTimeout(this.props.onDelete, this.props.closingAnimationDuration);
  }


  componentDidMount() {
    if (this.props.autoClose) {
      this.autoCloseTimeout = global.setTimeout(this.close.bind(this), this.props.timeout);
    }
  }


  componentWillUnmount() {
    global.clearTimeout(this.autoCloseTimeout);
  }


  render() {
    var className = `notification ${ this.state.closing ? "is-hidden" : "is-visible"} is-${ this.props.type }`;
    return (
      <div className={ className }>
        <div className="notification__inner">
          { this.props.text }
        </div>
        <span className="notification__close" onClick={this.close.bind(this)}></span>
      </div>
    );
  }
}

export default Notification;
