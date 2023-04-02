import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useBoxStore = create(set => ({
	// get box
	getBox: async (pageIndex) => {
		set({loadingGetBox: true})
		try {
			const res = await callService(apis.getBox.uri + `?page_index=${pageIndex}&page_size=5`, "GET", {}, true)
			set({listBox: res.data, loadingGetBox: false})
		} catch (e) {
			set({loadingGetBox: false})
		}
	},
	listBox: [],
	loadingGetBox: false,

	// get box by id
	getBoxById: async (params) => {
		set({loadingGetBoxById: true})
		try {
			return await callService(apis.box.uri + params, "GET", {}, true)
		} catch (e) {
			return null
		} finally {
			set({loadingGetBoxById: false})
		}
	},
	loadingGetBoxById: false,

	//add box
	addBox: async (bodyParameters) => {
		set({loadingAddBox: true})
		try {
			return await callService(apis.box.uri, "POST", bodyParameters, true)
		} catch (e) {
			return null
		} finally {
			set({loadingAddBox: false})
		}
	},
	loadingAddBox: false,

	//delete box
	deleteBox: async (params) => {
		set({loadingDeleteBox: true})
		try {
			return await callService(apis.box.uri + params, "DELETE", {}, true)
		} catch (e) {
			return null
		} finally {
			set({loadingDeleteBox: false})
		}
	},
	loadingDeleteBox:false
}))
