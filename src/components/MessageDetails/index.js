import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Modal, Icon, Header, Table } from 'semantic-ui-react';

const MessageDeatails = (props) => (
  <Modal
    size="large"
    open
    dimmer="inverted"
  >
    <Header icon="mail" content="Message information" />
    <Modal.Content>
      <Table definition>
        <Table.Body>

          <Table.Row>
            <Table.Cell collapsing>ID</Table.Cell>
            <Table.Cell>{props.data.id}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>Originator</Table.Cell>
            <Table.Cell>{props.data.originator}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>Send time</Table.Cell>
            <Table.Cell>{moment(props.data.createdDatetime).format('LLL')}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>Message</Table.Cell>
            <Table.Cell>{props.data.body}</Table.Cell>
          </Table.Row>
          
          { props.data.direction !== 'mt' ?

            <Table.Row>
              <Table.Cell collapsing>Reference</Table.Cell>
              <Table.Cell>{props.data.reference}</Table.Cell>
            </Table.Row>
            :
             <Table.Row>
              <Table.Cell collapsing>Summary</Table.Cell>
              <Table.Cell>

                <Table basic='very' collapsing >
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Delivered:</Table.Cell>
                      <Table.Cell>{props.data.recipients.totalDeliveredCount}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Not delivered:</Table.Cell>
                      <Table.Cell>{props.data.recipients.totalDeliveryFailedCount}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Total messages sent:</Table.Cell>
                      <Table.Cell>{props.data.recipients.totalSentCount}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>                    
              </Table.Cell>
            </Table.Row>         
          }
        
        </Table.Body>
      </Table>
    </Modal.Content>
    <Modal.Actions>
      <Button primary onClick={props.close}>
        <Icon name='checkmark' /> Ok
      </Button>
    </Modal.Actions>
  </Modal>
)

MessageDeatails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MessageDeatails;
