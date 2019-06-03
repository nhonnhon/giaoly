import { fromJS } from "immutable";
import { combineReducers } from "redux";
import {
  DATA_GROUP_POINT,
  SAVE_ALL_QUESTION,
  POINT_EACH_QUESTION
} from "../configs/constant";

const initialState = fromJS({
  amount: {
    currentAmountGroup: 0,
    currentAmountLevel: 0
  },
  pointEachQuestion: 10,
  dataGroupPoint: [],
  listAllQuestion: {}
});

function common(state = initialState, { type, payload }) {
  switch (type) {
    case DATA_GROUP_POINT:
      return state.set("dataGroupPoint", payload);

    case SAVE_ALL_QUESTION:
      return state.set("listAllQuestion", payload);

    case POINT_EACH_QUESTION:
      return state.set("pointEachQuestion", payload);

    default:
      return state;
  }
}

export default combineReducers({
  common
});
