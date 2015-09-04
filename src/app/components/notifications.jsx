import React from 'react';
import ApplicationStore from '../stores/application.client';
import ApplicationEvents from '../events/application';
import Notification from './notification.jsx';

class Notifications extends React.Component {
  static get defaultProps() {
    return {
      notifications: []
    };
  }


  constructor(props) {
    super(props);
    this.state = {
      notifications: this.props.notifications
    };
  }


  componentDidMount() {
    ApplicationStore.instance.on(ApplicationEvents.GOT_NOTIFICATION, (notification) => {
      this.setState({
        notifications: this.state.notifications.concat([{
          id: +new Date(),
          text: notification.message,
          type: notification.type
        }])
      });
    });
  }


  onNotificationDelete(item) {
    this.setState({
      notifications: this.state.notifications.filter(o => o.id !== item.id )
    });
  }


  render() {
    return (
      <div className="notifications">
        { this.state.notifications.map( (item) => {
          return (
            <Notification
              key={ item.id }
              onDelete={this.onNotificationDelete.bind(this, item)}
              text={ item.text }
              type={ item.type }
              />
          );
        })}
      </div>
    );
  }
}

export default Notifications;
