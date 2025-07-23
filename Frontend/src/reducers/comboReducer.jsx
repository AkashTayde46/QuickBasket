import {
  CREATE_COMBO_REQUEST,
  CREATE_COMBO_SUCCESS,
  CREATE_COMBO_FAIL,
} from "../constant/comboConstant";

export const comboCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMBO_REQUEST:
      return { loading: true };
    case CREATE_COMBO_SUCCESS:
      return { loading: false, success: true, combo: action.payload };
    case CREATE_COMBO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
