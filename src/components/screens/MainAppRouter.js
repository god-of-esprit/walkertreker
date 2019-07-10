import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import constants from '../../constants';
const { retrieveData } = constants;

import { NavigationEvents } from 'react-navigation';


class MainAppRouter extends React.Component {
  constructor(props) {
    super(props)
    console.log("MainAppRouter mounted");
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleRedirect();
  }

  handleRedirect() {
    console.log("handling redirect in MainAppRouter \n\n\n\n")
    const { campaign, navigation } = this.props;
      if(!campaign.id) {
        navigation.navigate("CreateCampaign");
      } else if(campaign.startDate) {
        navigation.navigate("CampaignSummary");
      } else {
        navigation.navigate("CampaignStaging");
      }
  }

  // Render any loading content that you like here
  render() {
    return (
      null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
    return {
      player: state.player,
      campaign: state.campaign,
    }
}

export default connect(mapStateToProps)(MainAppRouter);