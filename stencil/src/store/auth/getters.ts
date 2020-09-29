class AuthGetters {
    state: any = {};

    constructor(state) {
        this.state = state;
    }

    getUser() {
        return this.state.user;
    }

    isLoggedIn() {
        return !!this.state.user;
    }
}

export default AuthGetters;