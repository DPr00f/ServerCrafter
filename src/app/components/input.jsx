import React from 'react';

class Input extends React.Component {
  static get defaultProps() {
    return {
      extra: {},
      name: ""
    };
  }


  constructor(props) {
    super(props);
    this.state = {
      hasText: false
    };
  }


  onBlur() {
    var val = React.findDOMNode(this.refs.input).value;
    this.setState({
      hasText: (val.length > 0)
    });
  }


  render() {
    if(!this.props.id) {
      throw Error("InputComponent requires an id");
    }
    var classNames = {
      container: `input${this.state.hasText ? " input--filled": ""}${this.props.className ? ` ${this.props.className}` : ""}`,
      field: `input__field${this.props.className ? ` ${this.props.className}__field` : ""}`,
      label: `input__label${this.props.className ? ` ${this.props.className}__label` : ""}`,
      labelContent: `input__labelContent${this.props.className ? ` ${this.props.className}__labelContent` : ""}`,
    };
    return (
      <div className={classNames.container}>
        <input name={ this.props.name } {...this.props.extra} ref="input" onBlur={this.onBlur.bind(this)} className={classNames.field} type={this.props.isPassword ? "password" : "text"} id={this.props.id} />
        <label className={classNames.label} htmlFor={this.props.id}>
          <span className={classNames.labelContent}>{ this.props.children }</span>
        </label>
      </div>
    );
  }
}

export default Input;
