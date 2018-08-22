import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Icon, Header } from 'semantic-ui-react';

const ResultModal = (props) => (
  <Modal
    size="tiny"
    open
    dimmer="inverted"
  >
    <Header icon={props.icon} content={props.title} />
    <Modal.Content>
      <p>
        {props.data}
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button primary onClick={props.close}>
        <Icon name='checkmark' /> Ok
      </Button>
    </Modal.Actions>
  </Modal>
)

ResultModal.propTypes = {
  close: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ResultModal;
