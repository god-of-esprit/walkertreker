import React from "react";
import Expo from "expo";
import { Pedometer } from "expo-sensors";
import * as BackgroundFetch from "expo-background-fetch";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  AppState,
  ScrollView,
  Button,
  Alert
} from "react-native";
import { connect } from "react-redux";

import * as actions from "../actions";
import constants from "../constants";

const { setAppState, setCampaignDates } = actions;
const { c, retrieveData } = constants;

class BackgroundPedometer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    if (this.props.player.id && this.props.campaign.id) {
      console.log("bg_ped: getting last step state");
      dispatch({ type: c.GET_LAST_STEP_STATE });
    }

    AppState.addEventListener("change", this._handleAppStateChange);

    this._checkPedometerAvailability();

    setTimeout(() => {
      if (
        this.props.steps.campaignDateArray !== null &&
        this.props.player.id !== null
      ) {
        dispatch({ type: c.GET_STEPS });
      }
    }, 1000);

    setInterval(() => {
      if (
        this.props.appState === "active" &&
        this.props.steps.campaignDateArray !== null &&
        this.props.player.id !== null
      ) {
        console.log("bg_ped: INTERVAl getting steps");
        dispatch({ type: c.GET_STEPS });
      }
    }, 60000);

    // TODO: remove these later. this is to reset the player in async storage
    // dispatch({type: c.FETCH_PLAYER, playId: 'b9de95ec-730e-4d64-b2f7-ba7e19857e67'});
    // dispatch({type: c.FETCH_CAMPAIGN_INFO, id: '11d6d6ca-5acb-4c22-a94b-9b6f1323ebdd'});
  }

  componentDidUpdate() {
    this._constructDateLog();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _checkPedometerAvailability = () => {
    const { dispatch } = this.props;
    Pedometer.isAvailableAsync().then(
      response => {
        console.log("PEDO_AVAILABLE,", response);
        dispatch({
          type: c.IS_PEDOMETER_AVAILABLE,
          pedometerIsAvailable: response
        });
      },
      error => {
        console.log("ERROR WITH PEDOMETER,", error);
        // maybe dispatch an action to the store to update state instead?
        Alert.alert(
          "Walker Treker can't connect to your phone's pedometer. Try closing the app and opening it again."
        );
      }
    );
  };

  _constructDateLog = () => {
    const { dispatch } = this.props;
    const { campaignDateArray, pedometerIsAvailable } = this.props.steps;
    const {
      difficultyLevel,
      length,
      startDate,
      stepTargets
    } = this.props.campaign;
    if (
      this.props.player.id &&
      startDate !== null &&
      campaignDateArray === null &&
      pedometerIsAvailable
    ) {
      console.log("Attempting to construct Date log");
      const stepGoalDayOne = stepTargets[0];
      console.log(
        "start date is +++++++++++++++++++++++++++++++++++++++++++ ",
        startDate
      );
      let day0 = new Date(startDate);
      day0 = new Date(day0.setTime(day0.getTime()));
      const day0Start = new Date(day0);
      const day0End = new Date(day0);
      day0Start.setHours(6, 0, 0, 0);
      day0End.setHours(20, 0, 0, 0);
      console.log("BACKGROUND PEDOMETER DAY0", day0Start);

      dispatch(
        setCampaignDates(
          day0Start,
          day0End,
          length,
          difficultyLevel,
          stepGoalDayOne
        )
      );
    }
  };

  _handleAppStateChange = nextAppState => {
    const { dispatch } = this.props;
    const { campaignDateArray } = this.props.steps;
    const { id } = this.props.player;
    if (
      this.props.appState.match(/inactive|background/) &&
      nextAppState === "active" &&
      campaignDateArray !== null &&
      id !== null
    ) {
      dispatch({ type: c.GET_STEPS });
    }
    dispatch(setAppState(nextAppState));
  };

  render() {
    return null;
  }
} // end of class

function mapStateToProps(state) {
  return {
    appState: state.appState,
    steps: state.steps,
    campaign: state.campaign,
    player: state.player,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(BackgroundPedometer);
