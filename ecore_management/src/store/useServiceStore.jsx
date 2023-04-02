import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useServiceStore = create(set => ({
	getAll: async ()=>{
		set({loadingService:true})
		try {
			await callService(apis.getService.uri, 'GET')
				.then(response => {
					// console.log("service response",response)
					set({services: response.data,loadingGetService: false});
				})
				.catch(error=>{
					set({loadingGetCate: false})
				})
		}catch (e) {
			console.log(e)
		}finally {
			set({loadingGetService: false})
		}
	},
	services:[],
	loadingService:false

}))

