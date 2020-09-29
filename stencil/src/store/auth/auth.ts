import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  user: null,
  isLoggedIn: false
});

onChange('user', value => {
    state.isLoggedIn = !!value;
});

const getters = {
    isLoggedIn: () => {
        return !!state.user;
    }
}

const authStore = {
    state,
    getters
}


export default authStore;