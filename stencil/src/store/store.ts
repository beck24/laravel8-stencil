import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  clicks: 0,
  seconds: 0,
  squaredClicks: 0
});

onChange('seconds', value => {
  state.squaredClicks = Math.round(Math.random() * value);
});

export default state;