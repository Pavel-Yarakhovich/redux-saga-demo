import {
  LOG_ACTION,
  LOG_ERROR,
  CLEAR_STORE,
  TIMER,
  CANCEL_TIMER,
} from "./demoActions";

const initialState = {
  actions: [],
  errors: [],
  timerIsOn: false,
};

export const demoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_ACTION:
      return {
        ...state,
        actions: [...state.actions, action.payload],
      };
    case LOG_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    case CLEAR_STORE:
      return {
        ...state,
        actions: [],
      };
    case TIMER:
      return {
        ...state,
        timerIsOn: action.payload,
      };
    case CANCEL_TIMER:
      return {
        ...state,
        timerIsOn: false,
      };
    default:
      return state;
  }
};
