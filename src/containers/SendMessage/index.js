import React from 'react';
import MessageForm from './../../components/MessageForm';
import ResultModal from './../../components/ResultModal';

class SendMessage extends React.Component {
  config = JSON.parse(sessionStorage.getItem("config"));
  messagebird = require('messagebird')(this.config.apiKey);
  constructor(props) {
    super(props);

    this.state = { 
      modal: false,
      confirmed: false,
    };

    this.modal = this.modal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({modal: false, confirmed: false});
  }

  modal(content) {
    let message;
    let confirmed = this.state.confirmed;
    switch (content) {
      case 2:
          message = "Request not allowed";
          break;
      case 9:
          message = "Missing params";
          break;
      case 10:
          message = "Invalid params";
          break;
      case 20:
          message = "Not found";
          break;
      case 21:
          message = "Bad request";
          break;
      case 25:
          message = "Not enough balance";
          break;
      case 98:
          message = "API not found";
          break;
      case 99:
          message = "Internal error";
          break;
      default:
        message = content;
        confirmed = true;
    }
    this.setState({modal: message, confirmed: confirmed});
  }

  render() {
    const {modal, confirmed} = this.state;

    if(modal) {
      return <ResultModal 
        data={modal}
        title={confirmed ? 'Message sent' : 'Error'}
        icon={confirmed ? 'checkmark' : 'attention'}
        close={this.closeModal}
      />
    }

    return (
      <div>
        <MessageForm modal={this.modal}/>
      </div>
    );
  }
}
export default SendMessage;
