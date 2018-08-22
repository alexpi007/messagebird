import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';

import styles from './styles.css';

const SidebarItem = (props) => {
  return (
    <li 
      onClick={props.trigged}
      className={styles.item}
    >
      {
        !props.indexLink ?
        <Link
          to={props.href}
          className={`${styles.link}
            ${props.location.pathname === '/all-messages' ?
            styles.selected :
            '' }`
          } 
          activeClassName={styles.selected}
        >
          <img 
            className={styles.icon}
            src={props.icon}
            alt="icon"
          />
          <span 
            className={`${styles.title}
              ${!props.collapsed ?
              styles.hiddenTitle :
              styles.visibleTitle}`
            }
          >
            {props.title}
          </span>
        </Link> 
        :
        <IndexLink
          to={props.href}
          className={styles.link}
          activeClassName={styles.selected}
        >
          <img 
            className={styles.icon}
            src={props.icon}
            alt="icon"
          />
          <span 
            className={`${styles.title} ${!props.collapsed ?
              styles.hiddenTitle :
              styles.visibleTitle}`
            }
          >
            {props.title}
          </span>
        </IndexLink>
      }
    </li>
  );
};

SidebarItem.propTypes = {
  location: PropTypes.object.isRequired,
  trigged: PropTypes.func,
  indexLink: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default SidebarItem;


