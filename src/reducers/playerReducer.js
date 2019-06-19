import { v4 } from 'uuid';
import constants from '../constants';
const { c, storeData, retrieveData, initialState: { player } } = constants;
let newState;
import testState from '../constants/initialStates/tests/initialStatePlayerTest';

export default (state = player/*testState*/, action) => {
  switch (action.type) {

    case c.PLAYER_CREATED:
      newState = Object.assign({}, state, action.player);
      storeData('playerInfo', JSON.stringify(newState));
      return newState;
    case c.SEND_JOIN_CAMPAIGN_REQUEST:
      newState = {
        ...state,
        campaignId: action.campId,
      };
      storeData('playerInfo', JSON.stringify(newState));
      return newState;
    case c.PLAYER_FETCHED:
      newState = action.player;
      storeData('playerInfo', JSON.stringify(newState));
      return newState;
    case c.PLAYER_UPDATED:
      newState = action.player;
      storeData('playerInfo', JSON.stringify(newState));
      return newState;
    case c.ACCOUNT_RECOVERED:
      newState = action.player;
      storeData('playerInfo', JSON.stringify(newState));
      return newState;
    case c.UPDATE_PLAYER_STEPS:
      newState = {
        ...state,
        steps: action.steps,
      };
      storeData('playerInfo', JSON.stringify(newState));
      return newState;

    case c.UPDATE_HUNGER:
      newState = {
        ...state,
        hunger: action.hunger,
      };
      storeData('playerInfo', JSON.stringify(newState));
      return newState;

    case c.UPDATE_HEALTH:
      newState = {
        ...state,
        health: action.health,
      };
      storeData('playerInfo', JSON.stringify(newState));
      return newState;

    default:
      return state;
    }
}
