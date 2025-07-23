import axios from "axios";
import {
  CREATE_COMBO_REQUEST,
  CREATE_COMBO_SUCCESS,
  CREATE_COMBO_FAIL,
} from "../constant/comboConstant";

export const createCombo = (comboData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_COMBO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/v1/combo/create", comboData, config);

    dispatch({
      type: CREATE_COMBO_SUCCESS,
      payload: data.combo,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMBO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
