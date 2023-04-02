import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import FormInput from "../../components/FormInput";
import {useForm} from "react-hook-form";
import style from "../../styles/pages/_action_user.module.scss"
import {message, DatePicker, ConfigProvider} from "antd";
import {Radio} from 'antd';
import imageUpload from "../../assets/images/upload/uploadImage.jpg";
import {environmentConfig} from "../../apis";
import {useUserStore} from "../../store/useUserStore";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import {useUploadFileStore} from "../../store/useUploadFileStore";
import path from "../../contants/path";

const listGender = [
	{value: 1, label: "Nam"},
	{value: 0, label: "Nữ"},
	{value: 2, label: "Khác"},
]
const role = [
	{value: 0, label: 'Khách hàng'},
	{value: 1, label: 'Administrator'},
]
const ActionUser = () => {
	const {user_id} = useParams()
	const navigate = useNavigate()
	const {control, reset, handleSubmit} = useForm()
	const {currentColor} = useStateContext();
	const [value, setValue] = useState()
	const [user, setUser] = useState()
	const [dob, setDob] = useState()
	const [gender, setGender] = useState()

	const {getUserById, updateUser} = useUserStore(state => ({
		getUserById: state.getUserById,
		updateUser: state.updateUser
	}))

	const {uploadArray} = useUploadFileStore(state => ({
		uploadArray: state.UploadMutiple
	}))
	useEffect(() => {
		getUserById(user_id).then(res => {
			setValue(res?.data?.avatar)
			setUser(res?.data)
			// setGender(res?.data?.gender)
			setDob(res?.data?.dob.split("-").reverse().join("-"))
			const {data} = res
			reset({
				full_name: data?.full_name,
				email: data?.email,
				phone: data?.phone,
				dob: data?.dob.split("-").reverse().join("-"),
				gender: data?.gender
			})
		})
	}, [user_id])


	const onchange = (e) => {
		setGender(e?.target?.value)
	}

	// const onchangeDate = (date,dateString) => {
	// 	setDob(dateString)
	// }

	const useUpload = async (e) => {
		const formData = new FormData();
		for (const key of Object.keys(e.target.files)) {
			formData.append("files", e.target.files[key]);
		}
		try {
			uploadArray(formData)
				.then((res) => {
					setValue({...value, [e.target.name]: res.data.url});
					if ((res.status === 200)) {
						message.success("Upload ảnh thành thành công");
					}
				})

		} catch (error) {
			message.error("Upload ảnh không thành công");
		}
	};
	const onsubmit = (data) => {
		data.avatar = value?.image_url?.join(";")
		data.gender = gender
		updateUser(user_id, data).then(res => {
			if (res?.status === 200) {
				message.success("Cập nhật thông tin thành công")
				navigate(path.USERS)
				reset()
			} else {
				message.error("Cập nhật thông tin thất bại")
			}
		})
	}
	return (
		<MainContainer>
			<Header category="Page" title={"Cập nhật user"}/>
			<form onSubmit={handleSubmit(onsubmit)}>
				<div className={style.main}>
					<div className={style.box}>
						<FormInput
							className={style.form}
							label={"Họ và tên"}
							control={control}
							name={"full_name"}
							defaultValue={user?.full_name}
							rules={{required: "Họ tên không được để trống"}}
						/>
						{/*<FormInput className={style.form} label={"Tên đăng nhập"} control={control} name={"user_name"}/>*/}
						<FormInput
							className={style.form}
							label={"Email"}
							control={control}
							name={"email"}
							defaultValue={user?.email}
							rules={{
								required: "Email không được để trống",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Email không đúng định dạng"
								}
							}}
						/>
					</div>
					<div className={style.box}>
						<FormInput
							className={style.form}
							label={"Số điện thoại"}
							control={control}
							name={"phone"}
							defaultValue={user?.phone}
							rules={{required: "Số điện thoại không được để trống"}}

						/>
						{/*<FormInput*/}
						{/*	className={style.form}*/}
						{/*	label={"Ngày sinh"}*/}
						{/*	control={control}*/}
						{/*	name={"dob"}*/}
						{/*	defaultValue={user?.dob}*/}
						{/*/>*/}
						<FormInput
							className={style.form}
							label={"Ngày sinh"}
							note={"(YYYY-MM-DD)"}
							control={control}
							name={"dob"}
							defaultValue={user?.dob}
							rules={{required: "Ngày sinh không được để trống"}}
						/>
					</div>
					<div className={style.box}>
						{/*<FormSelect options={role} label={"Quyền"}/>*/}
					</div>
					<div className={style.box}>
						<div className={style.gender}>
							<span className={style.label}>Giới tính</span>
							<Radio.Group name="gender" defaultValue={user?.gender} onChange={onchange}>
								{listGender?.map((gender) => (
									<Radio key={gender.value} value={gender.value}>{gender.label}</Radio>
								))}
							</Radio.Group>
						</div>
					</div>
					<div className={style.box}>
						<div className={style.gender}>
							<span className={style.label}>Ảnh đại diện</span>
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

export default ActionUser;