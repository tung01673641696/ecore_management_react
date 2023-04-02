import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useCategoryStore = create(set => ({

	// get list category
	getCategory: async () => {
		set({loadingGetCate: true})
		try {
			await callService(apis.getCate.uri, 'GET')
				.then(response => {
					// console.log(response)
					set({cate: response.data,loadingGetCate: false});
				})
				.catch(error=>{
					set({loadingGetCate: false})
				})
		}catch (e) {
			console.log(e)
		}finally {
			set({loadingGetCate: false})
		}

	},
	cate: [],
	loadingGetCate:false,

	// get category by id
	
	loadingGetCateById:false,getCategoryById: async (params) => {
		set({loadingGetCate: true})
		try {
			return await callService(apis.categories.uri + params, 'GET')
		}catch (e) {
			return null
		}finally {
			set({loadingGetCateById: false})
		}

	},

	// add category
	addCategory: async (bodyParameters) => {
		set({loadingAddCate: true})
		try {
			return await callService(apis.categories.uri,'POST',bodyParameters,true)
		}catch (e) {
			return null
		}finally {
			set({loadingAddCate:false})
		}
	},
	loadingAddCate: false,

	// update category
	updateCategory: async (params,bodyParameters) => {
		set({loadingUpdateCate: true})
		try {
			return await callService(apis.categories.uri + params,'PUT',bodyParameters,true)
		}catch (e) {
			return null
		}finally {
			set({loadingAddCate: false})
		}
	},
	loadingUpdateCate: false,


	// delete Category
	deleteCategory: async (params) => {
		set({loadingDeleteCate: true})
		try {
			return await callService(apis.categories.uri + params,'DELETE',{},true)
		}catch (e) {
			console.log(e)
		}finally {
			set({loadingDeleteCate: false})
		}
	},
	loadingDeleteCate: false,
}))
