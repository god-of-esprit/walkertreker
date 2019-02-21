import constants from '../constants';
<<<<<<< HEAD:src/reducers/campaignReducer.js
const { c, initialState: { campaign } } = constants;
=======
const { c } = constants;
const initialStateCampaignDetailReducer = {
  campaignId: null, // populated by CreateCampaign
  campaignLength: '15', // populated by CreateCampaign
  difficultyLevel: 'easy', // populated by CreateCampaign
  randomEvents: 'low', // populated by CreateCampaign
  stepGoalDayOne: null, // populated by CreateCampaign
  invited: null, //populated by InvitePlayers
  players: [], // populated by each player inidividually through JoinCampaign
  startDate: null, // populated by CampaignStaging
  numPlayers: null, // derived in CampaignStaging once the host starts campaign
  stepTargets: [],
}
>>>>>>> master:src/reducers/campaignDetailReducer.js
let newState;

export default (state = campaign, action) => {
  switch (action.type) {
  case c.SET_CAMPAIGN_LENGTH:
    return {
      ...state,
      length: action.length
    }
  case c.SET_DIFFICULTY:
    return {
      ...state,
      difficultyLevel: action.difficultyLevel
    }
  case c.SET_EVENT_FREQUENCY:
    return {
      ...state,
      randomEvents: action.randomEvents
    }
  case c.INITIAL_CAMPAIGN_DATA_RECEIVED:
    return {
      ...state,
      id: action.id,
      stepTargets: action.steps,
      //this needs to change ^ it needs to return an array of step goals to state
    }
  case c.INVITES_SENT:
    return {
      ...state,
      invited: action.invites,
    }
  case c.CAMPAIGN_INFO_RECEIVED:
    // this is only temporary. once we have more built, we'll have this put into state in a more useful way.  this is just a proof of concept right now.  the following console log is to remind us of that fact
    console.log('this action type currently just puts the whole response into state.campaign.fromTheServer.  this is not the desired effect for production; it is just a placeholder.');
    return {
      ...state,
      fromTheServer: action.info,
    }
  case c.PLAYER_JOINED_CAMPAIGN: // should return the campaign, so refactor
    return {
      ...state,
      players: action.players
    }
  case c.CAMPAIGN_UPDATED:
    // this is only temporary. once we have more built, we'll have this put into state in a more useful way.  this is just a proof of concept right now.  the following console log is to remind us of that fact
    console.log('this action type currently just puts the whole response into state.campaign.fromTheServer.  this is not the desired effect for production; it is just a placeholder.');
    return {
      ...state,
      fromTheServer: action.info,
    }
  case c.CAMPAIGN_LEFT:
    return {
      ...state,
      players: action.players
    }
<<<<<<< HEAD:src/reducers/campaignReducer.js
  case c.PLAYER_FETCHED: // should only be the person whose phone it is
    newState = Object.assign({}, state);
    newState.players.push(action.player);
    return newState;
  case c.PLAYER_UPDATED: // should only be the person whose phone it is
    newState = Object.assign({}, state);
    const indexToUpdate = newState.players.findIndex(player => player.id === action.player.id);
    newState.players.splice(indexToUpdate, 1, action.player);
    return newState;
=======
  // case c.PLAYER_UPDATED:
  //   newState = Object.assign({}, state);
  //   const indexToUpdate = newState.players.findIndex(player => player.id === action.player.id);
  //   newState.players.splice(indexToUpdate, 1, action.player);
  //   return newState;
>>>>>>> master:src/reducers/campaignDetailReducer.js
  default:
    return state;
  }
}
