import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useCarStore = create(set => ({
	getByUserId: async (pageIndex, params) => {
		set({loadingGetCar: true})
		try {
			const res = await callService(apis.getCar.uri + `?page_index=${pageIndex}&page_size=5&user_id=${params}`, "GET", {}, true)
			set({listCar: res.data, loadingGetCar: false})
		} catch (e) {
			set({loadingGetCar: false})
		}
	},
	loadingGetCar: false,
	listCar: [],

	// get by id
	getCarById: async (params) => {
		set({loadingGetCarById: true})
		try {
			return await callService(apis.car.uri + params, "GET", {}, true)
		} catch (e) {
			return null
		} finally {
			set({loadingGetCarById: false})
		}
	},
	loadingGetCarById: false,

	// add car
	addCar: async (bodyParameters) => {
		set({loadingAddCar: true})
		try {
			return await callService(apis.car.uri,"POST",bodyParameters,true)
		} catch (e) {
			return null
		} finally {
			set({loadingAddCar:false})
		}
	},
	loadingAddCar: false,
	//update car
	updateCar: async (id, bodyParameters) => {
		set({loadingUpdateCar: true})
		try {
			return await callService(apis.car.uri + id, "PUT", bodyParameters, true)
		} catch (e) {
			return null
		} finally {
			set({loadingUpdateCar: false})
		}
	},
	loadingUpdateCar: false,

	//delete car
	deleteCar: async (id) => {
		set({loadingDeleteCar: true})
		try{
			return await callService(apis.car.uri + id, "DELETE",{},true)
		}catch (e) {
			return null
		}finally {
			set({loadingDeleteCar: false})
		}
	},
	loadingDeleteCar: false,
}))
