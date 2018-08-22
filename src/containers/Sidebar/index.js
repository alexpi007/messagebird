import React from 'react';
import SidebarItem from './../../components/SidebarItem';
import home from './../../assets/images/home.svg';
import message from './../../assets/images/message.svg';
import logo from './../../assets/images/glyph-white.svg';
import styles from './styles.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.collapse = this.collapse.bind(this);
  }
  
  collapse() {
    this.setState({collapse: !this.state.collapse});
  } 

  render() {
    const {collapse} = this.state;
    return (
      <nav className={`${styles.nav} ${collapse ? styles.open : ''}`}>
        <div className={styles.collapser} onClick={this.collapse}>
          <div className={styles.clicker}></div>
        </div>
        <a className={styles.logoLink} onClick={this.handleClick}>
          <img className={styles.logo} alt="logo" src={logo}></img>
        </a>
        <ul>
          <SidebarItem 
            indexLink
            href="/"
            icon={home}
            title="Dashboard"
            collapsed={collapse}
            trigged={this.handleClick}
            {...this.props}
          />
          <SidebarItem
            href="/send-message"
            icon={message}
            title="Messages"
            collapsed={collapse}
            {...this.props}
          />
        </ul>
      </nav>
    );
  }
}

export default Sidebar;


