import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from './containers/App';
import SendMessage from './containers/SendMessage';
import Dashboard from './containers/Dashboard';
import AllMessages from './containers/AllMessages';
import PageNotFound from './components/PageNotFound';
import request from './utils/request';

const config = request("./config.json", {
  headers: { 
  	Accept: "application/json",
  	"Content-Type": "application/json"
  }
});

Promise.all([config]).then(value => {
	sessionStorage.setItem("config", JSON.stringify(value[0]));
	ReactDOM.render(
		<Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/send-message" component={SendMessage} />
        <Route path="/all-messages" component={AllMessages} />
        <Route path="*" exact={true} component={PageNotFound} />
      </Route>
  	</Router>
	, document.getElementById('root'));
})


