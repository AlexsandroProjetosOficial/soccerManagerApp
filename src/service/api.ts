import axios from "axios";

const api = axios.create({
	baseURL: 'http://192.168.0.10:8081',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

export { api }

