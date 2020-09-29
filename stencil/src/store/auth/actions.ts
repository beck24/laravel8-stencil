class AuthActions {
    state: any = {};

    constructor(state) {
        this.state = state;
    }

    login(user) {
        this.state.user = {...user};
    }

    logout() {
        this.state.user = null;
    }
}

export default AuthActions;