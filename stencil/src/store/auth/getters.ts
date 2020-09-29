const authGetters = {
    getUser: state => {
        return state.auth.user;
    },
    isLoggedIn: state => {
        return !!state.auth.user
    }
}

export default authGetters;