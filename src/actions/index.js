import constants from '../constants';
const { c } = constants;

// this one might be ok, but it might need to be refactored for saga
export const setAppState = (appState) => ({
  type: c.NEW_APP_STATE,
  appState: appState,
});

export const setCampaignDates = (firstDayStart, firstDayEnd, campaignLength, difficultyLevel, stepGoalDayOne) => {
  const dateArray = [];
  let start;
  let end;

  for (let i=0; i < campaignLength; i++) {
    let aGoal;
    start = new Date(firstDayStart);
    end = new Date(firstDayEnd);
    if (i = 0) {
      aGoal = stepGoalDayOne;
    } else {
      aGoal = null;
    }
    dateArray.push({
      day: i + 1,
      start: new Date(start.setDate(start.getDate() + i)),
      end: new Date(end.setDate(end.getDate() + i)),
      steps: null,
      goal: aGoal,
      bonus: null,
      timesScavenged: null,
      goalMet: false,
    });
  }
  return ({
    type: c.SET_CAMPAIGN_DATES,
    campaignDateArray: dateArray,
  });
}