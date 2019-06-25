import * as types from "../configs/constant";

//get all data from import data and export json data to save local storage
function saveDataGroupAndPoints(groupAndPoint) {
  return {
    type: types.DATA_GROUP_POINT,
    payload: groupAndPoint
  };
}

function saveQuestionData(data) {
  return {
    type: types.SAVE_ALL_QUESTION,
    payload: data
  };
}

function saveTime(timeAll) {
  return {
    type: types.TIME_ALL,
    payload: timeAll
  };
}

function setCurrentMember(data) {
  return {
    type: types.CURRENT_MEMBER,
    payload: data
  };
}

export { saveDataGroupAndPoints, saveQuestionData, saveTime, setCurrentMember };
