import { all } from "redux-saga/effects";
import demoWatcher from "./demo/demoSaga";

export default function* saga() {
  yield all([demoWatcher()]);
}
