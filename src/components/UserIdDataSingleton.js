class UserIdDataSingleton {
    constructor() {
        if (!UserIdDataSingleton.instance) {
            this.data = null;
            UserIdDataSingleton.instance = this;
        }
        return UserIdDataSingleton.instance;
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }
}

const userIdDataSingleton = new UserIdDataSingleton();

export default userIdDataSingleton;