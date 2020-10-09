import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Map, GoogleApiWrapper } from 'google-maps-react';


class MapContainer extends Component{
  state = {

  }
  
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%',
    };
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176}}
      />
    );
  }
}

function mapStateToProps(props) {
    return {
      props
    };
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAxnbgzk6BRWWumBc2TwPC2sBQWPOE_Wt4'
})(MapContainer);

  
const connectedMapContainer = connect(mapStateToProps)(MapContainer);
export { connectedMapContainer as MapContainer };