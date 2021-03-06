import React from "react";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import { Linking } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import constants from "../../constants";

import PlayersList from "../ui/PlayersList";
import CampaignDetails from "../ui/CampaignDetails";
import TwoButtonOverlay from "../ui/TwoButtonOverlay";

import CampaignLobbyHeader from "../ui/CampaignLobbyHeader";
import ScreenContainer from "../containers/ScreenContainer";
import { MainHeader, SubHeader } from "../text";
import ErrorMessage from "../ui/ErrorMessage";

const { c } = constants;

class AcceptInvite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      errorMessage: this.props.campaign.id
        ? "Sorry, you are already in a campaign."
        : null
    };
  }

  componentDidMount = async () => {
    const { dispatch, player } = this.props;
    const campaignId = this.props.navigation.getParam("campaignId", false);
    this.setState({ campaignId });
    dispatch({ type: c.FETCH_CAMPAIGN_INFO, id: campaignId });
  };

  componentDidUpdate(prevProps) {
    const { campaign } = this.props;
    if (!this.state.isReady && campaign.id) {
      if (campaign.startDate) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          errorMessage:
            "Sorry, it looks like that campaign has already started."
        });
      }
      this.setState({ isReady: true }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  joinCampaign() {
    this.props.dispatch({
      type: c.SEND_JOIN_CAMPAIGN_REQUEST,
      campId: this.props.campaign.id,
      playId: this.props.player.id
    });
    this.props.navigation.navigate("Lobby");
  }

  navigateToAbout() {
    this.props.navigation.navigate("About", {
      navigationOption: "back"
    });
  }

  render() {
    if (this.state.isReady) {
      return (
        <View style={{ backgroundColor: "#871C1D" }}>
          <ImageBackground
            source={this.props.screenProps.backgroundImage}
            style={{ width: "100%", height: "100%" }}
          >
            <ScreenContainer>
              <View style={customStyles.inviteContainer}>
                {this.state.errorMessage ? (
                  <ErrorMessage errorMessage={this.state.errorMessage} />
                ) : (
                  <View style={{ height: "100%" }}>
                    <CampaignLobbyHeader
                      campaign={this.props.campaign}
                      title="Join Campaign"
                      id={this.state.campaignId}
                    />

                    <View style={[customStyles.playerContainer]}>
                      <MainHeader>Players</MainHeader>

                      <View style={customStyles.playerListContainer}>
                        <PlayersList />
                      </View>
                    </View>

                    <TwoButtonOverlay
                      button1title="Join Campaign"
                      button1onPress={() => this.joinCampaign()}
                      button2title="About"
                      button2onPress={() => this.navigateToAbout()}
                    />
                  </View>
                )}
              </View>
            </ScreenContainer>
          </ImageBackground>
        </View>
      );
    }
    return (
      <View style={{ backgroundColor: "#871C1D" }}>
        <ImageBackground
          source={this.props.screenProps.backgroundImage}
          style={{ width: "100%", height: "100%" }}
        >
          <ScreenContainer>
            <SubHeader>AcceptInviteScreen</SubHeader>
          </ScreenContainer>
        </ImageBackground>
      </View>
    );
  }
}

const widthUnit = wp("1%");
const heightUnit = hp("1%");
const customStyles = StyleSheet.create({
  inviteContainer: {
    // flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column"
    // justifyContent: 'flex-start',
    // borderWidth: 1,
    // borderColor: 'white'
  },
  headerContainer: {
    width: "100%",
    flex: 1
  },
  playerContainer: {
    width: "100%",
    flex: 2
  },
  playerHeadlineContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  playerListContainer: {
    flex: 2,
    marginBottom: heightUnit * 5
  }
});

function mapStateToProps(state) {
  return {
    player: state.player,
    campaign: state.campaign
  };
}

export default connect(mapStateToProps)(AcceptInvite);
