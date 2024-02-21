import router from '@/router'
import axios from 'axios'

export const auth = {
    namespaced: true,
    state: {
        userInfo: null,
        isLogin: false,
      },
      getters: {
        isLogin: state => state.isLogin,
      },
      mutations: { // 로그인 상태를 변경해주는 코드
        loginSuccess: function (state, payload) {
          this.dispatch("util/updateIsLoading",false);
          state.userInfo = payload
          state.isLogin = true
          router.push("/home")
        },
        logout: function (state) {
          state.userInfo = null
          state.isLogin = false
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          router.push("/")
        },
      },
      actions: {
        login (dispatch, loginObj) {
          axios
            .post('http://localhost:8081/login', loginObj) // 로그인 URL로 ID, PW를 보냄
            .then((res) => {
              const token = res.data.tokenInfo.accessToken;
              const refretoken = res.data.tokenInfo.refreshToken;
              localStorage.setItem('access_token', token); // 토큰을 저장함
              localStorage.setItem('refresh_token', refretoken); // 토큰을 저장함
              axios.defaults.headers.common.Authorization = `Bearer ${token}`
              if(loginObj.checked) {
                localStorage.setItem('rememberId',loginObj.memberId);
              }else {
                localStorage.removeItem('rememberId');
              }
              this.dispatch('auth/getMemberInfo'); // 유저 정보를 가져오는 actions 호출
            }).catch((err) => {
              if(err.code == 'ERR_BAD_REQUEST') {
                alert('아이디와 비밀번호를 확인하세요.');
              }else {
                alert('서버에 접속할 수 없습니다. 관리자에게 문의해 주세요');
              }
              this.dispatch("util/updateIsLoading",false);
            })
        },
        logout_act ({ commit }) { // 로그아웃 actions
          commit('logout')
        },
        getMemberInfo ({ commit }) { // 토큰으로 유저 정보를 받아오는 코드
          const token = localStorage.getItem('access_token') // 저장된 access 토큰을 가져옴
          const config = {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
          axios
            .get('http://localhost:8081/test', {}) // 가져온 토큰을 헤더에 Authorization 로 담아서 요청을 보냄
            .then((response) => {
              const userInfo = {
                pk: 1,
                name: response.data,
              } // 유저 정보를 받아옴
              commit('loginSuccess', userInfo) // mutations 호출
            })
        }
      }
};
