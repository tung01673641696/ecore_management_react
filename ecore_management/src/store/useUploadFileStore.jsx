import create from 'zustand';
import {callService} from "../apis/baseRequest";
import apis from "../apis/definesApi";

export const useUploadFileStore = create(set => ({

	// upload single
	UploadSingle: async ()=>{
		set({loading:true})
		try {
			return await callService(apis.reload.uri,'POST', {},true)
		}catch (e) {
			return null
		}
	},
	loading: false,

	// upload mutiple
	UploadMutiple: async (bodyParameters) =>{
		set({loadingUpload: true})
		try{
			return await callService(apis.uploadArray.uri,"POST",bodyParameters,true,null,true)
		}catch (e) {
			return null
		}finally {
			set({loadingUpload: false})
		}
	},
	loadingUpload: false,



}))
