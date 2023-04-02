import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useTireStore = create(set => ({
	// get tire
	getTire: async (pageIndex) => {
		set({loadingGetTire: true})
		try {
			const res = await callService(apis.getTire.uri + `?page_index=${pageIndex}&page_size=5`, "GET", {}, true)
			set({listTire: res.data, loadingGetTire: false})
		} catch (e) {
			set({loadingGetTire: false})
		}
	},
	listTire: [],
	loadingGetTire: false,

	//get tire by id
	getTireById: async (id) => {
		set({loadingGetTireById: false})
		try {
			return await callService(apis.tire.uri + id, "GET", {}, true)
		} catch (e) {
			return null
		}finally {
			set({loadingGetTireById: false})
		}
	},
	loadingGetTireById: false,

	//add tire
	addTire: async (bodyParameters) => {
		set({loadingAddTire: false})
		try {
			return await callService(apis.tire.uri, "POST", bodyParameters, true)
		} catch (e) {
			return null
		}finally {
			set({loadingAddTire: false})
		}
	},
	loadingAddTire: false,

	// update tire
	updateTire: async (id,bodyParameters) => {
		set({loadingUpdateTire: false})
		try {
			return await callService(apis.tire.uri + id, "PUT", bodyParameters, true)
		} catch (e) {
			return null
		}finally {
			set({loadingUpdateTire: false})
		}
	},
	loadingUpdateTire: false,

	// delete tire
	deleteTire: async (id) => {
		set({loadingDeleteTire: false})
		try {
			return await callService(apis.tire.uri + id, "DELETE", {}, true)
		} catch (e) {
			return null
		}finally {
			set({loadingDeleteTire: false})
		}
	},
	loadingDeleteTire: false,

}))
