import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { Linking } from 'expo';
import constants from './../constants';
const { c } = constants;

// screens
import CreateCampaign from '../components/screens/CreateCampaign/';
import InvitePlayers from '../components/screens/InvitePlayers';
import CampaignStaging from '../components/screens/CampaignStaging';
import AcceptInvite from '../components/screens/AcceptInvite';
import WaitForStart from '../components/screens/WaitForStart';
import CampaignSummary from '../components/screens/CampaignSummary';
import Safehouse from '../components/screens/Safehouse';
import EndOfDaySummary from '../components/screens/EndOfDaySummary';
import Inventory from '../components/screens/Inventory';
import RandomEvent from '../components/screens/RandomEvent';
import RandomEventResult from '../components/screens/RandomEventResult';
import CampaignIsLost from '../components/screens/CampaignIsLost';
import CampaignIsWon from '../components/screens/CampaignIsWon';
import RecoverAccount from '../components/screens/RecoverAccount';
import AuthCheck from './../components/screens/AuthCheck';
import SignUp from './../components/screens/SignUp';
import AccountRecovery from './../components/ui/AccountRecovery';
import MainAppRouter from './../components/screens/MainAppRouter';
import Lobby from './../components/screens/Lobby';
import {store} from './../store';


const AuthStack = createStackNavigator(
  {
    SignUp: SignUp,
    AccountRecovery: AccountRecovery,
    RecoverAccount: {
      screen: RecoverAccount,
      path: 'recovery'
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    }
  }
)

const LobbyNavigator = createStackNavigator({
  Lobby: { screen : Lobby },
  InvitePlayers: { screen : InvitePlayers }
})



const MainApp = createSwitchNavigator(
  {
    MainAppRouter: { screen: MainAppRouter },
    CreateCampaign: { screen : CreateCampaign },
    Lobby : { screen : LobbyNavigator},
    CampaignSummary: { screen : CampaignSummary },
    RandomEvent: { screen: RandomEvent },
    RandomEventResult: { screen: RandomEventResult },
    Inventory: { screen: Inventory },
    
    Join: {
      screen: AcceptInvite,
      path: 'join'
    }, 
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: "MainAppRouter" 
  }
)

const MainSwitchNavigator = createSwitchNavigator(
  {
    AuthCheck: AuthCheck,
    Auth: {screen: AuthStack, path : ''},
    MainApp: { screen: MainApp, path: ''},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: "AuthCheck"
  }
);




export const AppContainer = createAppContainer( MainSwitchNavigator );