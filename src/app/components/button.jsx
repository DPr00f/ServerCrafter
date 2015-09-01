import React from 'react';

class Button extends React.Component {
  static get defaultProps() {
    return {
      type: "button",
      onClick: function() {},
      className: false
    };
  }


  getText(children) {
    var text = "";
    if (typeof children === "string") {
      text = children;
    } else if (typeof children === "number") {
      text = children.toString();
    } else if (children instanceof Array) {
      text = this.getText(children[children.length - 1]);
    } else if (typeof children === "object"){
      // We assume it's a react element
      text = this.getText(children.props.children);
    } else {
      throw Error("Unrecognized children element");
    }

    return text;
  }


  render() {
    var className = "button" + (this.props.className ? ` ${this.props.className}` : "");
    var dataText = this.getText(this.props.children);
    return (
      <button onClick={ this.props.onClick.bind(this) }
              type={ this.props.type }
              data-text={ dataText }
              className={ className }>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
