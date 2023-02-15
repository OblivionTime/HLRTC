/*
 * @Description:
 * @Version: 2.0
 * @Autor: solid
 * @Date: 2021-12-23 22:30:23 +0800
 * @LastEditors: solid
 * @LastEditTime: 2022-08-30 12:12:28
 */
import axios from 'axios'
var baseURL = `https://127.0.0.1:7880/`
// var baseURL = 'http://192.168.6.68:7777/v0/api'
const service = axios.create({
	baseURL: baseURL,
	// withCredentials: true,
	timeout: 50000
})
service.interceptors.request.use(
	(config) => {

		// config.url
		return config
	},
	(error) => {
		// do something with request error
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	response => {
		return response.data
	},
	error => {
		console.log(error);
	}
)

export default service
