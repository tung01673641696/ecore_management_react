import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";
import Cookies from 'js-cookie'
import {message} from "antd";

export const useUserStore = create(set => ({
	// login
	login: async (bodyParameters) => {
		set({loading: true})
		try {
			const loginResponse = await callService(apis.login.uri, 'POST', bodyParameters);
			// const reloadResponse = await callService(apis.reload.uri, 'POST',
			// 	{}, true, loginResponse.accessToken)
			if (loginResponse.data.data_user.role !== 0) {
				set({userInfo: loginResponse.data.data_user, loading: false});
				localStorage.setItem('user', JSON.stringify(loginResponse.data.data_user))
				localStorage.setItem('access_token', loginResponse.data.access_token)
				Cookies.set('sess', loginResponse.data.refresh_token, {expires: 2})
				return true
			}
		} catch (e) {
			set({loading: false})
			return false
		}
	},
	userInfo: {},
	// setUserInfo: (data) => {
	// 	set({userInfo: data})
	// },
	loading: false,
	// change password
	changePassword: async (bodyParameters) => {
		set({loadingChangePass: true})
		try {
			await callService(apis.changePassword.uri, "POST", bodyParameters, true)
				.then(response => {
					set({loadingChangePass: false})
					console.log(response)
					if (response?.status === 200) {
						message.success("Đổi mật khẩu thành công")
					} else if (response.errors === "USER_PASSWORD_INVALID") {
						message.error("Mật khẩu cũ không chính xác")
					}
				})
				.catch(error => {
					set({loadingGetCate: false})
				})
		} catch (e) {
			set({loadingChangePass: false})
		}
	},
	loadingChangePass: false,

	// get user
	getUsers: async (pageIndex) => {
		set({loadingChangePass: true})
		try {
			const res = await callService(apis.getUser.uri + `?page_index=${pageIndex}&page_size=5`, "GET", {}, true)
			set({user: res.data, loadingGetUser: false})
		} catch (e) {
			set({loadingGetUser: false})
		}
	},
	user: [],
	loadingGetUser: false,

	// get user by id

	getUserById: async (params) => {
		set({loadingGetById: true})
		try {
			return await callService(apis.user.uri + params, "GET", {}, true)
		} catch (e) {
			return null
		} finally {
			set({loadingGetById: false})
		}
	},
	loadingGetById: false,

	// update user

	updateUser: async (params, bodyParameters) => {
		set({loadingUpdate: true})
		try {
			return await callService(apis.user.uri + params, "PUT", bodyParameters, true)
		} catch (e) {
			return null
		} finally {
			set({loadingUpdate: false})
		}
	},
	loadingUpdate: false,

	// delete user
	deleteUser: async (params) => {
		set({loadingDelete: true})
		try {
			return await callService(apis.user.uri + params, "DELETE", {}, true)
		} catch (e) {
			return null
		} finally {
			set({loadingDelete: false})
		}
	},
	loadingDelete: false,

	// get my user
	getMyProfile: async () => {
		set({loadingGetMyUser: true})
		try {
			const res = await callService(apis.myProfile.uri, "GET", {}, true)
			set({myProfile: res.data, loadingGetMyUser: false})
			localStorage.setItem('user', JSON.stringify(res.data))
		} catch (e) {
			set({loadingGetMyUser: false})
		}
	},
	myProfile:{},
	loadingGetMyUser: false,
}))
