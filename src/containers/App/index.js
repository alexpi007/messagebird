import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import Sidebar from './../../containers/Sidebar';
import Nav from './../../components/Nav';

import styles from './styles.css';

class App extends Component {
  render() {
    const { children } = this.props;
    let sectionTitle;
    
    if (this.props.location.pathname === '/') {
      sectionTitle = 'Dashboard';
    } else {
      sectionTitle = 'Messages';
    }

    return (
      <div className={styles.main}>
        <div className={styles.nav}>
          <Sidebar {...this.props}/>
        </div>
        <div className={styles.section}>
          <Nav sectionTitle={sectionTitle} {...this.props}/>
          <Segment>
            {children}
          </Segment>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
}

export default App;
