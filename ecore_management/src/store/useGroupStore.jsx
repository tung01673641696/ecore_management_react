import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useGroupStore = create(set => ({
	// get group
	getGroup: async (pageIndex) => {
		set({loadingGetGroup: true})
		try {
			const res = await callService(apis.getGroup.uri + `?page_index=${pageIndex}&page_size=5`, "GET", {}, true)
			set({listGroup: res.data, loadingGetGroup: false})
		} catch (e) {
			set({loadingGetGroup: false})
		}
	},
	listGroup: [],
	loadingGetGroup: false,

	// get by id
	getGroupById: async (params) => {
		set({loadingGetGroupById: true})
		try {
			return await callService(apis.groups.uri + params, "GET", {},true)
		} catch (e) {
			return null
		} finally {
			set({loadingGetGroupById: false})
		}
	},
	loadingGetGroupById: false,



}))
