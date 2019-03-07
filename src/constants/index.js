import * as types from './actionTypes';
import * as items from './itemImages';
import initialStateSteps from './initialStates/initialStateSteps';
import initialStateCampaign from './initialStates/initialStateCampaign';
import initialStatePlayer from './initialStates/initialStatePlayer';
import { storeData, retrieveData } from './asyncStorage'

export default {
  c: types,
  initialState: {
    campaign: initialStateCampaign,
    steps: initialStateSteps,
    player: initialStatePlayer,
  },
  storeData,
  retrieveData,
  item: items,
};
