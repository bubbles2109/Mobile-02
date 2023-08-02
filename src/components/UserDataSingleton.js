class UserDataSingleton {
    constructor() {
        if (!UserDataSingleton.instance) {
            this.data = null;
            UserDataSingleton.instance = this;
        }
        return UserDataSingleton.instance;
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }
}

const userDataSingleton = new UserDataSingleton();

export default userDataSingleton;