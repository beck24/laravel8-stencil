// import { createStore } from "@stencil/store";
import { createLocalStore } from 'stencil-store-storage';
import AuthGetters from './getters';
import AuthActions from './actions';

let initialState = {
  user: null,
  isLoggedIn: false
};

// https://github.com/Serabe/stencil-store-storage
const { state, onChange } = createLocalStore('auth', initialState, true);

onChange('user', value => {
    state.isLoggedIn = !!value;
});

export default {
    state,
    getters: new AuthGetters(state),
    actions: new AuthActions(state)
};