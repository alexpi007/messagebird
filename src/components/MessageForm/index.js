import React from 'react';
import PropTypes from 'prop-types';
import { connect, PromiseState } from 'react-refetch';
import { Label, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';
import {
  Form as Formsy
} from 'formsy-semantic-ui-react';

class MessageForm extends React.Component {
  config = JSON.parse(sessionStorage.getItem("config"));
  messagebird = require('messagebird')(this.config.apiKey);

  constructor(props) {
    super(props);
    this.onValidSubmit = this.onValidSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.sendMessageResponse && !nextProps.sendMessageResponse.pending) {
      if (nextProps.sendMessageResponse.rejected) {
        nextProps.modal(nextProps.sendMessageResponse.reason.cause.errors[0].code);
      }
      if (nextProps.sendMessageResponse.fulfilled) {
        const message = nextProps.sendMessageResponse.value.recipients.items.map((item, i) => {
          return <span
            key={i}>
            {`Message ${item.status} to ${item.recipient} at ${moment(item.createdDatetime).format('LT')}`}
          </span>
        });
        nextProps.modal(message);
      }
    }
  }

  onValidSubmit(formData) {
    const params = {
      'originator': formData.originator,
      'recipients': [
        formData.recipients
      ],
      'body': formData.body
    };

    this.props.sendMessageRequest(
      {
        apiUri: this.config.apiUri,
        apiKey: this.config.apiKey,
        formDataParams: params,
      }
    );
  } 

  render() {
    const errorLabel = <Label color="red" pointing/>

    return (
      <Formsy
        onValidSubmit={ this.onValidSubmit }
        ref={(ref) => { this.form = ref; }}
      >
        <Formsy.Group widths='equal'>
          <Formsy.Input
            name="recipients"
            placeholder="Recipient *"
            required
            errorLabel={ errorLabel }
            validationErrors={{
              isDefaultRequiredValue: "Recipient cannot be blank.",
            }}
          />
          <Formsy.Input
            name="originator"
            placeholder="Originator"
            defaultValue="MessageBird"
          />
        </Formsy.Group>
        <Formsy.Group widths="equal">
        <Formsy.TextArea
          name="body"
          placeholder="Message"
        />
        </Formsy.Group>

        <Formsy.Group widths="equal" className="custom-field">
          <Button 
            primary
            type="submit"
          >
            <Icon name="comment" />
            Send SMS
          </Button>
        </Formsy.Group>
      </Formsy>
    )
  }
}


MessageForm.propTypes = {
  sendMessageRequest: PropTypes.func,
  sendMessageResponse: PropTypes.instanceOf(PromiseState),
};

export default connect(props => ({
  sendMessageRequest: (params) => ({
    sendMessageResponse: { 
      url: `${params.apiUri}/messages?access_key=${params.apiKey}`,
      method: 'POST',
      body: JSON.stringify(params.formDataParams)
    }
  }),
}))(MessageForm)