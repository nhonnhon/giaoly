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

function savePointQuestion(point) {
  return {
    type: types.POINT_EACH_QUESTION,
    payload: point
  };
}

function setCurrentMember(data) {
  return {
    type: types.CURRENT_MEMBER,
    payload: data
  };
}

export {
  saveDataGroupAndPoints,
  saveQuestionData,
  savePointQuestion,
  setCurrentMember
};
