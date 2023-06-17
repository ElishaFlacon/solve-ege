import $api from "../API";


export default class AuthService {
    static async login(emai, password) {
        return $api.post('/login', { emai, password });
    }

    static async registration(emai, password) {
        return $api.post('/registration', { emai, password });
    }

    static async logout() {
        return $api.post('/logout');
    }
}