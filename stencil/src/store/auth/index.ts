import { createStore } from "@stencil/store";
import AuthGetters from './getters';
import AuthActions from './actions';


const { state, onChange } = createStore({
  user: null,
  isLoggedIn: false
});

onChange('user', value => {
    state.isLoggedIn = !!value;
});

// const actions = {
//     login: user => {
//         state.user = {...user};
//     },
//     logout: () => {
//         state.user = null;
//     }
// }


export default {
    state,
    getters: new AuthGetters(state),
    actions: new AuthActions(state)
};