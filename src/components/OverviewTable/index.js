import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';
import moment from 'moment';
import styles from './styles.css';

const OverviewTable = (props) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Recipient</Table.HeaderCell>
        <Table.HeaderCell>Originator</Table.HeaderCell>
        <Table.HeaderCell>Message</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {
        props.data.map((item)=>{
          return (
            <Table.Row key={item.id}>
              <Table.Cell collapsing>
                {
                  item.direction === 'mo' ? 
                  <Icon name="arrow left"/> :
                  <Icon name="arrow right"/>
                }
              </Table.Cell>

              <Table.Cell>
                {item.recipients.items.map((item)=>{
                  return <span key={item.recipient}>{item.recipient}</span>
                })}
              </Table.Cell>

              <Table.Cell>{item.originator}</Table.Cell>

              <Table.Cell>{item.body}</Table.Cell>

              <Table.Cell>
                {item.direction === 'mo' ? 'received': item.recipients.items.map((item)=>{
                  return <span key={item.recipient}>
                    {item.status === 'delivery_failed' ? 'not delivered' : item.status}</span>
                })}
              </Table.Cell>

              <Table.Cell>{moment(item.createdDatetime).format('LLL')}</Table.Cell>

              <Table.Cell collapsing>
                <div 
                  className={styles.details} 
                  onClick={() => props.details(item.id)}
                >
                  <Icon name="eye"/>
                </div>
              </Table.Cell>
            </Table.Row>
          )
        })
      }
    </Table.Body>
  </Table>
)

OverviewTable.propTypes = {
  data: PropTypes.array.isRequired,
  details: PropTypes.func.isRequired,
};

export default OverviewTable;
