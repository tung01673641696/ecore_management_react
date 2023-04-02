import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useParams} from "react-router-dom";
import style from "../../styles/pages/_action_group.module.scss";
import FormInput from "../../components/FormInput";
import imageUpload from "../../assets/images/upload/uploadImage.jpg";
import {environmentConfig} from "../../apis";
import Button from "../../components/Button";
import {useForm} from "react-hook-form";
import {message} from "antd";
import {useUploadFileStore} from "../../store/useUploadFileStore";
import {useStateContext} from "../../contexts/ContextProvider";
import {useGroupStore} from "../../store/useGroupStore";

const ActionGroup = () => {
	const {group_id} = useParams()
	const {currentColor} = useStateContext()
	const {control,handleSubmit,reset} = useForm()
	const [value,setValue] = useState()
	const [data,setData] = useState()

	const {uploadArray} = useUploadFileStore(state => ({
		uploadArray: state.UploadMutiple
	}))

	const {getGroupById} = useGroupStore(state => ({
		getGroupById: state.getGroupById
	}))


	useEffect(()=>{
		if(group_id){
			getGroupById(group_id).then(res => {
				if(res.status === 200){
					setData(res.data)
					setValue(res.data.image_url)
					const {data} = res
					reset({
						name: data?.name,
						description: data?.description,
						phone: data?.phone,
						email: data?.email
					})
				}
			})
		}
	},[group_id])

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

	const onsubmit = () => {

	}
	return (
		<MainContainer>
			<Header category="" title={`${group_id ? "Cập nhật group" : "Thêm group"}`} />
			<form onSubmit={handleSubmit(onsubmit)}>
				<div className={style.box}>
					<FormInput
						defaultValue={group_id ? data?.name : ''}
						className={style.input}
						label={"Tên group"}
						control={control}
						name={"name"}
						placeholder={"Nhập tên group..."}
						rules={{required: "Vui lòng nhập tên group"}}
					/>
					<FormInput
						defaultValue={group_id ? data?.description : ''}
						className={style.input}
						label={"Mô tả"}
						control={control}
						name={"description"}
						placeholder={"Nhập mô tả..."}
						rules={{required: "Vui lòng nhập mô tả"}}
					/>
					<FormInput
						defaultValue={group_id ? data?.phone : ''}
						className={style.input}
						label={"Số điện thoại"}
						control={control}
						name={"phone"}
						placeholder={"Nhập số điện thoại..."}
						rules={{required: "Vui lòng nhập số điện thoại"}}
					/>
					<FormInput
						defaultValue={group_id ? data?.email : ''}
						className={style.input}
						label={"Email"}
						control={control}
						name={"email"}
						placeholder={"Nhập email..."}
						rules={{required: "Vui lòng nhập email"}}
					/>
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
											<img
												src={`${environmentConfig.BASE_URI}/${value}`}
												alt="error"
												width="50px"
												height="50px"
											/>
										</div>
									) : ''
							}
						</div>
					</div>
					<div style={{display:'flex',width:'100%',justifyContent:'end'}}>
						<Button
							onClick={handleSubmit(onsubmit)}
							text={"Xác nhận"}
							bgColor={currentColor}
							color={"#fff"}
							borderRadius={"5px"}/>
					</div>
				</div>
			</form>
		</MainContainer>
	);
};

export default ActionGroup;