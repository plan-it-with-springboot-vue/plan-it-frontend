import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

import { userConfirm, findById, tokenRegeneration, logout } from "@/api/user";
import { HttpStatusCode } from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
  }),
  actions: {
    async userLogin(loginUser) {
      try {
        const response = await userConfirm(loginUser);
        if (response.status === HttpStatusCode.Created) {
          const { data } = response;
          const accessToken = data["access-token"];
          const refreshToken = data["refresh-token"];
          this.isLogin = true;
          this.isLoginError = false;
          this.isValidToken = true;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);

          console.log("login succes");
        } else {
          this.isLogin = false;
          this.isLoginError = true;
          this.isValidToken = false;
          console.log("login failed");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getUserInfo(token) {
      try {
        const decodeToken = jwtDecode(token);
        const response = await findById(decodeToken.userId);
        if (response.status === HttpStatusCode.Ok) {
          this.userInfo = response.data.userInfo;
        } else {
          console.log("유저 정보 없음!!!!");
        }
      } catch (error) {
        console.error(
          "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
          error.response.status
        );
        this.isValidToken = false;
        await this.tokenRegenerate();
      }
    },

    async tokenRegenerate() {
      try {
        const response = await tokenRegeneration(JSON.stringify(this.userInfo));
        if (response.status === HttpStatusCode.Created) {
          const accessToken = response.data["access-token"];
          sessionStorage.setItem("accessToken", accessToken);
          this.isValidToken = true;
        }
      } catch (error) {
        if (error.response.status === HttpStatusCode.Unauthorized) {
          await this.handleUnauthorizedToken();
        }
      }
    },

    async handleUnauthorizedToken() {
      try {
        await logout(this.userInfo.userId);
        alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
        this.isLogin = false;
        this.userInfo = null;
        this.isValidToken = false;
        // router.push({ name: "login" });
      } catch (error) {
        console.error(error);
        this.isLogin = false;
        this.userInfo = null;
      }
    },

    async userLogout(userId) {
      try {
        const response = await logout(userId);
        if (response.status === HttpStatusCode.Ok) {
          this.isLogin = false;
          this.userInfo = null;
          this.isValidToken = false;
          console.log("logout success");
        } else {
          console.error("유저 정보 없음!!!!");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
