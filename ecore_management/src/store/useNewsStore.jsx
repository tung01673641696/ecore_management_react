import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";
import {message} from "antd";

export const useNewsStore = create(set => ({
	// get news
	getNews: async (pageIndex) => {
		set({loadingGetNew: true})
		try {
			const res = await callService(apis.getNews.uri + `?page_index=${pageIndex}&page_size=5`, "GET", {}, true)
			set({listNews: res.data, loadingGetNew: false})
		} catch (e) {
			set({loadingGetNew: false})
		}
	},
	listNews: [],
	loadingGetNew: false,

	// get news by id
	getNewsById: async (params) => {
		set({loadingGetNewsById: true})
		try{
			return await callService(apis.news.uri + params,"GET",{},true)
		}catch (e) {
			return null
		}finally {
			set({loadingGetNewsById: false})
		}
	},
	loadingGetNewsById: false,

	// add news
	addNews: async (bodyParameters) => {
		set({loadingAddNews: true})
		try{
			return await callService(apis.news.uri ,"POST",bodyParameters,true)
		}catch (e) {
			return null
		}finally {
			set({loadingAddNews: false})
		}
	},
	loadingAddNews: false,

	// update news
	updateNews: async (params,bodyParameters) => {
		set({loadingUpdateNews: true})
		try{
			return await callService(apis.news.uri + params,"PUT",bodyParameters,true)
		}catch (e) {
			return null
		}finally {
			set({loadingUpdateNews: false})
		}
	},
	loadingUpdateNews: false,

	// delete news
	deleteNews: async (params) => {
		set({loadingDeleteNews: true})
		try{
			return await callService(apis.news.uri + params,"DELETE",{},true)
		}catch (e) {
			return null
		}finally {
			set({loadingDeleteNews: false})
		}
	},
	loadingDeleteNews: false,
}))
