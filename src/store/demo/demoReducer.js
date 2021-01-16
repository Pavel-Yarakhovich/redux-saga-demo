import { LOG_ACTION, LOG_ERROR, CLEAR_STORE } from "./demoActions";

const initialState = {
  actions: [],
  errors: [],
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
    default:
      return state;
  }
};
