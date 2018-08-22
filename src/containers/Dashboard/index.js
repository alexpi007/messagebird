import React from 'react';
import { Image } from 'semantic-ui-react';
import bg from './../../assets/images/homepage-sm@2x.png';

class Dashboard extends React.Component {
  render() {
    return (
    	<div>
	      <h2>Welcome to my Dashboard! :)</h2>
	      <Image src={bg} size="huge" centered />
	    </div>
    );
  }
}

export default Dashboard;
