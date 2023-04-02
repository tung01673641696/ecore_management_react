import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const usePostsStore = create(set => ({


	// get all by group_id
	getPostsByGroup: async (params,pageIndex) => {
		set({loadingGetGroupById: true})
		try {
			return await callService(apis.getPostsByGroup.uri + `?page_index=${pageIndex}&page_size=5&group_id=${params}` , "GET", {},true)
		} catch (e) {
			return null
		} finally {
			set({loadingGetGroupById: false})
		}
	},
	loadingGetGroupById: false,



}))
