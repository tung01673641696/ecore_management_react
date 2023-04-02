import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useProductStore = create(set => ({

	// get list category
	getProduct: async () => {
		set({loadingGetProduct: true})
		try {
			await callService(apis.getProduct.uri, 'GET')
				.then(response => {
					// console.log(response)
					set({product: response.data,loadingGetProduct: false});
				})
				.catch(error=>{
					set({loadingGetProduct: false})
				})
		}catch (e) {
			console.log(e)
		}finally {
			set({loadingGetProduct: false})
		}

	},
	product: [],
	loadingGetProduct:false,



}))
