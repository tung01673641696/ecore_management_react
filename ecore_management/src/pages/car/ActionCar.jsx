import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import style from "../../styles/pages/_action_car.module.scss";
import FormInput from "../../components/FormInput";
import imageUpload from "../../assets/images/upload/uploadImage.jpg";
import {environmentConfig} from "../../apis";
import Button from "../../components/Button";
import {useForm} from "react-hook-form";
import {useStateContext} from "../../contexts/ContextProvider";
import {modules,formats} from "../../data/dummy"
import ReactQuill from "react-quill";
import {useCarStore} from "../../store/useCarStore";
import {message} from "antd";
import {useUploadFileStore} from "../../store/useUploadFileStore";
import path from "../../contants/path";




const ActionCar = () => {
	const navigate = useNavigate()
	const {user_id,car_id} = useParams()
	const {control,handleSubmit,reset} = useForm()
	const {currentColor} = useStateContext()
	const [value,setValue] = useState()
	const [content,setContent] = useState()
	const [car,setCar] = useState({})

	const {getCarById,updateCar,addCar} = useCarStore(state => ({
		getCarById: state.getCarById,
		updateCar: state.updateCar,
		addCar: state.addCar
	}))
	const {uploadArray} = useUploadFileStore(state => ({
		uploadArray: state.UploadMutiple
	}))

	useEffect(()=>{
		if(car_id){
			getCarById(car_id).then(res => {
				if(res.status === 200) {
					setCar(res.data)
					setValue(res.data.image_url)
					setContent(res.data.content)
					const {data} = res
					reset({
						name: data?.name,
						des: data?.des,
						license_plates: data?.license_plates,
						VIN: data?.VIN,
						wheel_number: data?.wheel_number
					})
				}
			})
		}
	},[car_id])

	const useUpload = async (e) => {
		const formData = new FormData();
		for (const key of Object.keys(e.target.files)) {
			formData.append("files", e.target.files[key]);
		}
		try {
			uploadArray(formData)
				.then((res) => {
					setValue({...value, [e.target.name]: res.data.url});
					if ((res.status === 200 )) {
						message.success("Upload ảnh thành thành công");
					}
				})

		} catch (error) {
			message.error("Upload ảnh không thành công");
		}
	};

	const onsubmit = (data) => {
		data.image_url = value?.image_url?.join(";")
		data.user_id = parseInt(user_id)
		if(car_id){
			updateCar(car_id, data).then(res => {
				if(res.status === 200){
					navigate(path.USER_DETAIL + user_id)
					message.success("Cập nhật xe thành công")
				}else {
					message.error("Cập nhật xe thất bại")
				}
			})
		}else{
			addCar(data).then(res =>{
				if(res.status === 200){
					navigate(path.USER_DETAIL + user_id)
					message.success("Thêm xe thành công")
				}else{
					message.error("Thêm xe thất bại")
				}
			})
		}
	}
	return (
		<MainContainer>
			<Header title={car_id ? "Cập nhật thông tin xe":"Thêm xe mới"}/>
			<form onSubmit={handleSubmit(onsubmit)}>
				<div className={style.main}>
					<div className={style.box}>
						<FormInput
							className={style.form}
							label={"Danh mục"}
							control={control}
							name={"category"}
							placeholder={"Chọn danh mục"}
						/>
						<FormInput
							className={style.form}
							label={"Tên xe"}
							control={control}
							name={"name"}
							placeholder={"Nhập tên xe..."}
							rules={{required: "Tên xe không được để trống"}}
						/>
					</div>
					<div className={style.box}>
						<FormInput
							className={style.form}
							label={"Biển số xe"}
							control={control}
							name={"license_plates"}
							placeholder={"Nhập biển số xe..."}
							rules={{required: "Biển số xe không được để trống"}}

						/>
						<FormInput
							className={style.form}
							label={"Số khung"}
							note={"(VIN)"}
							control={control}
							name={"VIN"}
							placeholder={"Nhập số khung (VIN)..."}
							rules={{required: "Số khung không được để trống"}}
						/>
					</div>
					<div className={style.box}>
						<FormInput
							className={style.form}
							label={"Số bánh xe"}
							control={control}
							name={"wheel_number"}
							placeholder={"Nhập số bánh xe..."}
							rules={{required: "Số bánh xe không được để trống"}}

						/>
						<FormInput
							className={style.form}
							label={"Mô tả"}
							control={control}
							name={"des"}
							placeholder={"Nhập mô tả..."}
							rules={{required: "mô tả không được để trống"}}
						/>
					</div>
					<div className={style.box}>
						<div style={{width:'100%',marginBottom:'10px'}}>
							<span className={style.label}>Nội dung</span>
							<ReactQuill formats={formats} modules={modules} theme="snow" value={content}
										onChange={setContent}/>
						</div>
					</div>
					<div className={style.box}>
						<div className={style.gender}>
							<span className={style.label}>Ảnh</span>
							<div style={{display: 'flex', gap: '20px'}}>
								<label htmlFor="idUpload">
									<img
										alt="Upload"
										src={imageUpload}
										width="50px"
										height="50px"
									/>
									<input
										onChange={useUpload}
										type="file"
										multiple
										name="image_url"
										accept="image/*"
										id="idUpload"
										style={{display: "none"}}
										layout="fill"
									/>
								</label>
							</div>
							{value ?
								value?.image_url ? (
										<div>
											{value?.image_url.map((image, index) => (
												<img
													src={`${environmentConfig.BASE_URI}/${image}`}
													alt="error"
													key={index}
													width="50px"
													height="50px"
												/>
											))}
										</div>
									)
									:
									(
										<div>
											{value?.map((image, index) => (
												<img
													src={`${environmentConfig.BASE_URI}/${image.url}`}
													alt="error"
													key={index}
													width="50px"
													height="50px"
												/>
											))}
										</div>
									) : ''
							}
						</div>
					</div>
					<div style={{width: '100%', justifyContent: "end", display: 'flex'}}>
						<Button
							onClick={handleSubmit(onsubmit)}
							bgColor={currentColor}
							text={"Cập nhật"}
							color={"#fff"}
							borderRadius={"12px"}
						/>
					</div>
				</div>
			</form>
		</MainContainer>
	);
};

export default ActionCar;