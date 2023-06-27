import $api from "../API";


export default class UserService {
    static async fetchUsers() {
        return $api.get('/users');
    }
}