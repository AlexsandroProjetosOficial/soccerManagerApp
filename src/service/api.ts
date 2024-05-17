import axios from "axios";

const api = axios.create({
	baseURL: 'http://192.168.0.10:8080/api/v1',
	responseType: 'json',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

export { api }

