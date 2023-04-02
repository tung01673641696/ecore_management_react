import axios from 'axios';
import {definesApi, environmentConfig, responseStatus} from './index';
import Cookies from "js-cookie";

export async function callService(uri, method, bodyParameters, hasToken, token, isFormUpload = false) {
	// console.log(hasToken);
	// console.log(uri);
	const user = JSON.parse(localStorage.getItem('user'))
	const access_token = localStorage.getItem('access_token')
	let url = `${environmentConfig.API_ENVIRONMENT_URL}${uri}`;

	try {
		let authen_token
		if (hasToken) {
			authen_token = access_token;
		}
		if (token) {
			authen_token = token
		}
		let headers = !hasToken ? {'Content-Type': 'application/json;charset=UTF-8'} :
			{
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': `Bearer ${authen_token}`,
				// 'Cookie': Cookies.get('sess'),
			}

		if (isFormUpload) {
			headers = !hasToken ? {'Content-Type': 'multipart/form-data'} :
				{
					'Content-Type': 'multipart/form-data',
					'Authorization': `Bearer ${authen_token}`,
				}
		}

		let configAxios
		configAxios = {
			url,
			method,
			headers,
			data: bodyParameters,
			timeout: environmentConfig.TIME_OUT,
			// withCredentials: true,
		}
		axios.defaults.withCredentials = true;
		return new Promise((resolve, reject) => {
			axios(configAxios)
				.then((response) => {
					if (response.status === responseStatus.SUCCESS && response.data === '') {
						return handleResponseSuccess({ status: 200, data: { statusRequest: 200 } }, resolve);
					}
					return handleResponseSuccess(response, resolve);
				}).catch((error) => {
				const res = error.response
				if(res.status === 401) {
					if(res.data.message === 'Token not verified!' && res.data.status === 401 && uri !== definesApi.logout.uri) {
						axios.post(
							environmentConfig.API_ENVIRONMENT_URL + definesApi.refreshToken.uri,
							{refreshToken: Cookies.get('sess')},
							{headers}
						).then((response) => {
							localStorage.setItem('user', JSON.stringify(response.data))
							callService(uri, method, bodyParameters, hasToken, token)
						}).catch(() => {
							Cookies.remove('sess')
							localStorage.removeItem('user')
							setTimeout(() => {
								window.location.reload()
							}, 1500)
						})
					}
				}
				return handleResponseFail(error, reject);
			});
		});
	} catch (error) {
		console.log('Error :' + error);
	}
}

const handleResponseSuccess = (response, resolve) => {
	switch (response.status) {
		case responseStatus.SUCCESS:
			return resolve(response.data)
		default:
			break;
	}
}

const handleResponseFail = (error, reject) => {
	const status = error.response ? error.response.status : error.status
	switch (status) {
		case responseStatus.TOKEN_EXPRIRED:
		case responseStatus.NOT_CONNECT:
		case responseStatus.FILE_NOT_FOUND:
		case responseStatus.REQUEST_TIMEOUT:
			return reject(error)
		default:
			return reject(error)
	}
}
