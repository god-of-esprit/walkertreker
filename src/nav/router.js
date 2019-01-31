import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

// screens
import CreateCampaign from '../components/screens/CreateCampaign';
import NewCampaignPartyView from '../components/screens/NewCampaignPartyView';
import ContactsList from '../components/screens/ContactsList';
import Splash from '../components/screens/Splash';
import TOC from '../components/TOC';
import ActiveCampaignSummary from '../components/ActiveCampaignSummary';
import Inventory from '../components/Inventory';
import JoinCampaign from '../components/JoinCampaign';
import Map from '../components/Map';
import Profile from '../components/Profile';
import Team from '../components/Team';
import Pedometer2 from '../components/Pedometer2';

const AppNavigator = createStackNavigator({
    CreateCampaign: { screen: CreateCampaign },
    ContactsList: { screen: ContactsList },
    NewCampaignPartyView: { screen: NewCampaignPartyView, },
    CampaignSummary: { screen: ActiveCampaignSummary, },
    TOC: { screen: TOC, },
    Inventory: { screen: Inventory },
    JoinCampaign: { screen: JoinCampaign },
    Map: { screen: Map },
    Profile: { screen: Profile },
    Team: { screen: Team },
  },
  {
    initialRouteName: "CreateCampaign",
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export const AppContainer = createAppContainer(AppNavigator);