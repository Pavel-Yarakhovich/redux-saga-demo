import React from "react";
import "./App.css";
import { connect } from "react-redux";
import {
  DEMO_TAKE_LATEST,
  CLEAR_STORE,
  DEMO_TAKE_LEADING,
  DEMO_TAKE_EVERY,
  DEMO_CALL,
  DEMO_FORK,
  DEMO_SPAWN,
  DEMO_RETRY,
} from "./store/demo/demoActions";

const effects = [
  "takeLeading",
  "takeLatest",
  "takeEvery",
  "call",
  "fork",
  "spawn",
  "retry",
];

const App = ({
  demo,
  demoTakeLatest,
  clearStore,
  demoTakeLeading,
  demoTakeEvery,
  demoCall,
  demoFork,
  demoSpawn,
  demoRetry,
}) => {
  const [count, setCount] = React.useState(0);
  const [chosenEffect, setChosenEffect] = React.useState(effects[0]);
  const handleEffect = (effect) => {
    setCount((prev) => prev + 1);
    switch (effect) {
      case "takeLatest":
        demoTakeLatest(count + 1);
        break;
      case "takeLeading":
        demoTakeLeading(count + 1);
        break;
      case "takeEvery":
        demoTakeEvery(count + 1);
        break;
      case "call":
        demoCall(count + 1);
        break;
      case "fork":
        demoFork(count + 1);
        break;
      case "spawn":
        demoSpawn(count + 1);
        break;
      case "retry":
        demoRetry(count + 1);
        break;
      default:
    }
  };
  const handleClear = () => {
    setCount(0);
    clearStore();
  };
  return (
    <div className="App">
      <div className="clear" onClick={handleClear}>
        Clear log
      </div>
      <div className="effects_list">
        {effects.map((effect) => (
          <div
            className={effect === chosenEffect ? "effect_active" : "effect"}
            key={effect}
            name={effect}
            onClick={(e) => setChosenEffect(effect)}
          >
            {effect}
          </div>
        ))}
      </div>
      <div className="right">
        <div className="manage">
          <span className="count">{count}</span>
          <button onClick={() => handleEffect(chosenEffect)} className="button">
            {chosenEffect}
          </button>
        </div>
        <div className="timer_wrap">
          {demo.timerIsOn ? <div className="timer" /> : null}
        </div>
        <div className="log">
          {demo.actions.map((a, i) => (
            <p key={i}>{a}</p>
          ))}
        </div>
        <div className="error">
          {demo.errors.map((a, i) => (
            <p key={i}>{a}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    demo: state.demo,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    demoTakeLatest: (value) => {
      dispatch({ type: DEMO_TAKE_LATEST, payload: value });
    },
    demoTakeLeading: (value) => {
      dispatch({ type: DEMO_TAKE_LEADING, payload: value });
    },
    demoTakeEvery: (value) => {
      dispatch({ type: DEMO_TAKE_EVERY, payload: value });
    },
    demoCall: (value) => {
      dispatch({ type: DEMO_CALL, payload: value });
    },
    demoFork: (value) => {
      dispatch({ type: DEMO_FORK, payload: value });
    },
    demoSpawn: (value) => {
      dispatch({ type: DEMO_SPAWN, payload: value });
    },
    demoRetry: (value) => {
      dispatch({ type: DEMO_RETRY, payload: value });
    },
    clearStore: () => dispatch({ type: CLEAR_STORE }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
