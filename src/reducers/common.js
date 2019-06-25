import { fromJS } from "immutable";
import { combineReducers } from "redux";
import {
  DATA_GROUP_POINT,
  SAVE_ALL_QUESTION,
  TIME_ALL,
  CURRENT_MEMBER
} from "../configs/constant";

const initialState = fromJS({
  amount: {
    currentAmountGroup: 0,
    currentAmountLevel: 0
  },
  dataGroupPoint: [],
  listAllQuestion: {},
  currentMember: {}
});

function common(state = initialState, { type, payload }) {
  switch (type) {
    case DATA_GROUP_POINT:
      return state.set("dataGroupPoint", payload);

    case SAVE_ALL_QUESTION:
      return state.set("listAllQuestion", payload);

    case TIME_ALL:
      return state.set("timeAll", payload);

    case CURRENT_MEMBER:
      return state.set("currentMember", payload);

    default:
      return state;
  }
}

export default combineReducers({
  common
});
