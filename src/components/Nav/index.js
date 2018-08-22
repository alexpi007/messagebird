import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Header } from 'semantic-ui-react';
import Link from 'react-router/lib/Link';
import styles from './styles.css';

class Nav extends Component {
  
  componentDidMount() {
    this.setState({ activeItem: this.props.location.pathname.substring(1) })
  }

  render() {
    const { sectionTitle, location } = this.props;

    return (
      <Menu secondary>
        <Header as='h2' floated='right'>
          {this.props.sectionTitle}
        </Header>
        <Menu.Item 
          as={Link}
          to="/send-message"
          name='send-message'
          active={location.pathname.substring(1) === 'send-message'} 
          onClick={this.handleItemClick} 
          className={sectionTitle !== 'Messages' ? styles.hidden : ''}
        />
        <Menu.Item
          as={Link}
          to="/all-messages"
          name='all-messages'
          active={location.pathname.substring(1) === 'all-messages'}
          onClick={this.handleItemClick}
          className={sectionTitle !== 'Messages' ? styles.hidden : ''}
        />
      </Menu>
    )
  }
}

Nav.propTypes = {
  location: PropTypes.object.isRequired,
  sectionTitle: PropTypes.string.isRequired,
};

export default Nav;