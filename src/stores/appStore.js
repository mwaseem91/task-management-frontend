import { defineStore } from "pinia";
import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useStore = defineStore("appStore", {
  state: () => {
    return {
      token: "",
      user: {},
      authenticated: false,
      tasks: [],
    };
  },

  actions: {
    async verifyToken() {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (response.data.status == true) {
        this.setUser(response.data.user, token);
      } else {
        this.setEmptyUser();
      }
    },

    async loginUser(data) {
      await axios
        .post(`/login`, data)
        .then((response) => {
          if (response.data.status == true) {
            const data = response.data.data;
            this.setUser(data.user, data.token);
          } else {
            this.setEmptyUser();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async registerUser(data) {
      await axios
        .post(`/register`, data)
        .then((response) => {
          if (response.data.status == true) {
            const data = response.data.data;
            this.setUser(data.user, data.token);
          } else {
            this.setEmptyUser();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    setUser(user, token) {
      localStorage.setItem("token", token);
      this.token = token;
      this.user = user;
      this.authenticated = true;
    },

    logout() {
      localStorage.removeItem('token');
      this.setEmptyUser();
    },

    setEmptyUser() {
      this.token = "";
      this.authenticated = false;
      this.user = {};
    },
  },
});
