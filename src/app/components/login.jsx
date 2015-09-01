import React from 'react';
import SocketController from '../controllers/socket.client';
import SocketStore from '../stores/socket.client';
import SocketAction from '../actions/socket.client';
import SocketEvents from '../events/socket';
import Input from './input.jsx';
import Button from './button.jsx';


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      message: ""
    };
  }


  componentDidMount() {
    React.findDOMNode(this.refs.username).focus();
    this.request = require('browser-request');
    SocketStore.instance.on(SocketEvents.AUTHENTICATED, ()=> {
      this.setState({
        isLogged: true
      });
    });

    SocketStore.instance.on(SocketEvents.FAILED_AUTH, ()=> {
      console.log("Failed auth");
      this.setState({
        isLogged: false
      });
    });
    SocketAction.connect(this.props.token);
  }


  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      message: ""
    });
    this.request({
      method: 'POST',
      url: `/login`,
      json: {
        username: React.findDOMNode(this.refs.username.refs.input).value,
        password: React.findDOMNode(this.refs.password.refs.input).value
      }
    },
    (err, httpResponse, body) => {
      if(err) {
        throw err;
      }
      if (!body || body.error) {
        return this.setState({
          message: body.message
        });
      }

      if(!body || !body.token) {
        return this.setState({
          message: 'An error occurred'
        });
      }

      SocketAction.connect(body.token);
    });
  }


  render() {
    if (this.state.isLogged) {
      return (
        <div className="page">
          { this.props.children }
        </div>
      );
    }

    return (
      <div className="page">
        { this.state.message.length > 0 ? <div className="errorMessage">{ this.state.message }</div> : null }
        <div className="login">
          <div className="login__logo"></div>
          <div className="login__inputs">
            <form onSubmit={ this.handleSubmit.bind(this) }>
              <Input ref="username" id="username" extra={{ autoComplete: "off" }}>Username / Email</Input>
              <Input ref="password" id="password" isPassword={true} extra={{ autoComplete: "off" }}>Password</Input>
              <Button type="submit" className="login__button">
                <span>Login</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
