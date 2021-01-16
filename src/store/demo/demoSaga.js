import {
  takeEvery,
  takeLatest,
  takeLeading,
  put,
  select,
  call,
  fork,
  spawn,
  delay,
  retry,
} from "redux-saga/effects";
import {
  LOG_ACTION,
  LOG_ERROR,
  DEMO_TAKE_LATEST,
  DEMO_TAKE_LEADING,
  DEMO_TAKE_EVERY,
  DEMO_CALL,
  DEMO_FORK,
  DEMO_SPAWN,
  TEST_CALL,
  TEST_FORK,
  TEST_SPAWN,
  DEMO_RETRY,
} from "./demoActions";

function* demoTakeLatest(action) {
  yield put({
    type: LOG_ACTION,
    payload: `takeLatest: dispatched with value [${action.payload}]`,
  });
  yield delay(2000);
  yield put({
    type: LOG_ACTION,
    payload: `takeLatest: done with value [${action.payload}]`,
  });
}

function* demoTakeLeading(action) {
  yield put({
    type: LOG_ACTION,
    payload: `takeLeading: dispatched with value [${action.payload}]`,
  });
  yield delay(2000);
  yield put({
    type: LOG_ACTION,
    payload: `takeLeading: done with value [${action.payload}]`,
  });
}

function* demoTakeEvery(action) {
  yield put({
    type: LOG_ACTION,
    payload: `takeEvery: dispatched with value [${action.payload}]`,
  });
  yield delay(2000);
  yield put({
    type: LOG_ACTION,
    payload: `takeEvery: done with value [${action.payload}]`,
  });
}

function* helper(value, effect) {
  try {
    yield put({
      type: LOG_ACTION,
      payload: `${effect} helper function with value [${value}]`,
    });
    yield delay(2000);
    // throw new Error('Error in helper function');
    yield put({
      type: LOG_ACTION,
      payload: `Done helper function with value [${value}]`,
    });
  } catch (error) {
    throw new Error();
  }
}

function* demoCall(action) {
  try {
    yield put({
      type: LOG_ACTION,
      payload: `Dispatched outer function with value [${action.payload}]`,
    });
    yield call(helper, action.payload, "CALL");
    yield put({
      type: LOG_ACTION,
      payload: `Done outer function with value [${action.payload}]`,
    });
  } catch (error) {
    yield put({
      type: LOG_ERROR,
      payload: `Catched in call parent`,
    });
  }
}

function* demoFork(action) {
  try {
    yield put({
      type: LOG_ACTION,
      payload: `Dispatched outer function with value [${action.payload}]`,
    });
    yield fork(helper, action.payload, "FORK");
    yield put({
      type: LOG_ACTION,
      payload: `Done outer function with value [${action.payload}]`,
    });
  } catch (error) {
    yield put({
      type: LOG_ERROR,
      payload: `Catched in fork parent`,
    });
  }
}

function* demoSpawn(action) {
  try {
    yield put({
      type: LOG_ACTION,
      payload: `Dispatched outer function with value [${action.payload}]`,
    });
    yield spawn(helper, action.payload, "SPAWN");
    yield put({
      type: LOG_ACTION,
      payload: `Done outer function with value [${action.payload}]`,
    });
  } catch (error) {
    yield put({
      type: LOG_ERROR,
      payload: `Catched in spawn parent`,
    });
  }
}

function* testCall(action) {
  yield put({ type: TEST_CALL, payload: action.payload });
  yield put({
    type: LOG_ACTION,
    payload: `Dispatch the next action`,
  });
}

function* testFork(action) {
  yield put({ type: TEST_FORK, payload: action.payload });
  yield put({
    type: LOG_ACTION,
    payload: `Dispatch the next action`,
  });
}

function* testSpawn(action) {
  yield put({ type: TEST_SPAWN, payload: action.payload });
  yield put({
    type: LOG_ACTION,
    payload: `Dispatch the next action`,
  });
}

function* demoRetry(action) {
  try {
    yield put({
      type: LOG_ACTION,
      payload: `Dispatched outer function with value [${action.payload}]`,
    });
    yield retry(3, 1000, helper, action.payload, "RETRY");
    yield put({
      type: LOG_ACTION,
      payload: `Done outer function with value [${action.payload}]`,
    });
  } catch (error) {
    yield put({
      type: LOG_ERROR,
      payload: `Catched in call parent`,
    });
  }
}

function* demoWatcher() {
  yield takeLatest(DEMO_TAKE_LATEST, demoTakeLatest);
  yield takeLeading(DEMO_TAKE_LEADING, demoTakeLeading);
  yield takeEvery(DEMO_TAKE_EVERY, demoTakeEvery);
  yield takeEvery(DEMO_CALL, testCall);
  yield takeEvery(DEMO_FORK, testFork);
  yield takeEvery(DEMO_SPAWN, testSpawn);
  yield takeEvery(TEST_SPAWN, demoSpawn);
  yield takeEvery(TEST_FORK, demoFork);
  yield takeEvery(TEST_CALL, demoCall);
  yield takeEvery(DEMO_RETRY, demoRetry);
}

export default demoWatcher;
