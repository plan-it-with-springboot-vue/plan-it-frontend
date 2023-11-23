/* eslint-disable no-useless-catch */
// import { localAxios } from "../utils/http-commons";

import axios from "axios";

async function userConfirm(param) {
  try {
    const response = await axios.post("http://localhost/user/login", param);

    return response; // 성공 시 응답 데이터 반환
  } catch (error) {
    throw error; // 실패 시 에러 throw
  }
}

// ID로 사용자 정보 조회
async function findById(userId) {
  try {
    const token = sessionStorage.getItem("accessToken");
    const response = await axios.get(`http://localhost/user/info/${userId}`, {
      headers: { Authorization: token },
    });

    return response; // 성공 시 응답 데이터 반환
  } catch (error) {
    throw error; // 실패 시 에러 throw
  }
}

// 토큰 재발급
async function tokenRegeneration(user) {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");
    const response = await axios.post("http://localhost/user/refresh", user, {
      headers: {
        "Content-Type": "application/json",
        refreshToken: refreshToken,
      },
    });
    console.log("토큰 재발급 완료");

    return response; // 성공 시 응답 데이터 반환
  } catch (error) {
    throw error; // 실패 시 에러 throw
  }
}

// 로그아웃
async function logout(userid) {
  try {
    const response = await axios.get(`http://localhost/user/logout/${userid}`);
    return response; // 성공 시 응답 데이터 반환
  } catch (error) {
    throw error; // 실패 시 에러 throw
  }
}

export { userConfirm, findById, tokenRegeneration, logout };
