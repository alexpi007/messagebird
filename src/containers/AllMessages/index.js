import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Dimmer } from 'semantic-ui-react';
import { connect, PromiseState } from 'react-refetch';
import OverviewTable from './../../components/OverviewTable';
import MessageDetails from './../../components/MessageDetails';

class AllMessages extends React.Component {
  config = JSON.parse(sessionStorage.getItem("config"));

  constructor(props) {
    super(props);
    this.state = { 
      details: false,
    };
    this.openDetails = this.openDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.totalMessagesRequest(
      {
        apiUri: this.config.apiUri, 
        apiKey: this.config.apiKey
      }
    );
  }

  openDetails(id) {
    this.props.singleMessageRequest(
      {
        apiUri: this.config.apiUri, 
        apiKey: this.config.apiKey,
        id: id,
      }
    );
    this.setState({details: true});
  }

  closeModal() {
    this.setState({details: false});
  }

  render() {
    const { details } = this.state;
    const { totalMessagesResponse, singleMessageResponse } = this.props;

    let content;

    if(details) {
      if(singleMessageResponse){
        if (singleMessageResponse.fulfilled) {
          content =  <MessageDetails 
            data={singleMessageResponse.value}
            close={this.closeModal}
          />;
          return content;
        }
        if (singleMessageResponse.rejected) {
          content = <div>
            {JSON.stringify(singleMessageResponse.reason.cause.errors[0].description)}
          </div>;
          return content;
        }
      }
    }

    if(totalMessagesResponse) {
      if (totalMessagesResponse.rejected) {
        content = <div>
          {JSON.stringify(totalMessagesResponse.reason.cause.errors[0].description)}
        </div>;
        return content;
      }
      if (totalMessagesResponse.fulfilled) {
        content = <OverviewTable 
          data={totalMessagesResponse.value.items}
          details={this.openDetails}
        />;
        return content;
      }
    }

    content = (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );

    return (
      <div>
        {content}
      </div>
    )
  }
}

AllMessages.propTypes = {
  totalMessagesRequest: PropTypes.func,
  totalMessagesResponse: PropTypes.instanceOf(PromiseState),
};

export default connect(props => ({
  totalMessagesRequest: (params) => ({
    totalMessagesResponse: { 
      url: `${params.apiUri}/messages?access_key=${params.apiKey}`, 
      refreshInterval: 60000 // It trigs polling every 60s
    }
  }),
  singleMessageRequest: (params) => ({
    singleMessageResponse: { 
      url: `${params.apiUri}/messages/${params.id}?access_key=${params.apiKey}`,
    }
  }),
}))(AllMessages)
