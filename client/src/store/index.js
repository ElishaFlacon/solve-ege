import { makeAutoObservable } from 'mobx';
import AuthService from '../service/AuthService';
import axios from 'axios';
import { API_URL } from '../API';


export default class Store {
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(emai, password) {
        try {
            const response = await AuthService.login(emai, password);
            localStorage.setItem('token', response.data.accesToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async registration(emai, password) {
        try {
            const response = await AuthService.registration(emai, password);
            localStorage.setItem('token', response.data.accesToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${API_URL}/user/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accesToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
}