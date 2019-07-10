import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { Linking } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c } = constants;

import PlayersList from '../ui/PlayersList';
import CampaignDetails from '../ui/CampaignDetails';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';

import CampaignLobbyHeader from './../ui/CampaignLobbyHeader';
import ScreenContainer from './../containers/ScreenContainer';
import { MainHeader, SubHeader } from './../text';


class AcceptInvite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
    }
  }

  componentDidMount = async () => {
    console.log("ACCEPTINVITE MOUNTED")
    const { dispatch } = this.props
    const campaignId = this.props.navigation.getParam('campaignId', false)
    this.setState({ campaignId })
    dispatch({ type: c.FETCH_CAMPAIGN_INFO, id: campaignId })
  }

  componentDidUpdate(prevProps) {
    if (!this.state.isReady && this.props.campaign.id) {
      this.setState({ isReady: true })
    }
  }

  joinCampaign() {
    console.log("AcceptInvite(38) - Attempting to Join Campaign CampaignID = " + this.props.campaign.id + " with playerID = " + this.props.player.id)
    this.props.dispatch({
      type: c.SEND_JOIN_CAMPAIGN_REQUEST,
      campId: this.props.campaign.id,
      playId: this.props.player.id,
    })
    this.props.navigation.navigate('WaitForStart')
  }

  navigateToAbout() {
    this.props.navigation.navigate('About', {
      navigationOption: 'back'
    })
  }

  render() {
    if (this.state.isReady) {
      return (
        <ImageBackground
          source={this.props.screenProps.backgroundImage}
          style={{width: '100%', height: '100%'}}
        >
          <ScreenContainer>

            <View style={customStyles.inviteContainer}>

              <CampaignLobbyHeader campaign={this.props.campaign} title="New Campaign"/>

              <View style={[ customStyles.playerContainer ]}>

                  <MainHeader>Players</MainHeader>


                <View style={customStyles.playerListContainer}>
                  <PlayersList />
                </View>

              </View>
            </View>

            <TwoButtonOverlay
              button1title='Join Campaign'
              button1onPress={() => this.joinCampaign()}
              button2title='About'
              button2onPress={() => this.navigateToAbout()}
            />
          </ScreenContainer>
        </ImageBackground>
      )
    } else {
      return (
        <ImageBackground
          source={this.props.screenProps.backgroundImage}
          style={{width: '100%', height: '100%'}}
        >
          <ScreenContainer>
            <SubHeader>AcceptInviteScreen</SubHeader>
          </ScreenContainer>
        </ImageBackground>
      )
    }
  }
}

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  inviteContainer: {
    // flex: 1,
    width: '100%',
    height: '85%',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // borderWidth: 1,
    // borderColor: 'white'
  },
  headerContainer: {
    width: '100%',
    flex: 1,
  },
  playerContainer: {
    width: '100%',
    flex: 2,
  },
  playerHeadlineContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerListContainer: {
    flex: 2,
    marginBottom: heightUnit*5,
  },
})

function mapStateToProps(state) {
  return {
    player: state.player,
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(AcceptInvite);
