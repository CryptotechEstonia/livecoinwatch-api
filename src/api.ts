// Typing
import type { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'
import type { CoinsEndpoint, CoinsMap } from './coins'

// Dependencies
import axios from 'axios'

// Api
import CoinsApi from './coins'

// Inline typing
export interface RequestParameters extends Object {}

export type RequestResponse = CoinsMap.Response

export type Endpoint = CoinsEndpoint

// Default export
export default class Api {
	private readonly base: string = 'https://api.livecoinwatch.com'
	private readonly token: string

	private readonly headers: RawAxiosRequestHeaders
	private readonly config: AxiosRequestConfig

	readonly coins: CoinsApi

	constructor(token: string) {
		this.token = token

		this.headers = {
			"content-type": "application/json",
			"x-api-key": this.token,
		}

		this.config = {
			headers: this.headers
		}

		this.coins = new CoinsApi(this)
	}

	async request<T>(endpoint: Endpoint, parameters: RequestParameters) {
		const url = this.base + endpoint

		const response = await axios.post<T>(url, parameters, this.config)

		return response.data
	}
}
