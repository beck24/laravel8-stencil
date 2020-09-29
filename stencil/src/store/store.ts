import { createStore } from "@stencil/store";

const shouldUpdate = (newValue, oldValue, _propChanged) => {
  return JSON.stringify(newValue) !== JSON.stringify(oldValue);
}

const { state } = createStore({
  auth: {
    user: null
  },
  count: 0,
  test: {
    foo: null
  }
}, shouldUpdate);

export default state;