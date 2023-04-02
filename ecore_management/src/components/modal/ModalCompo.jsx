import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {message, Modal, Radio} from "antd";
import {useUserStore} from "../../store/useUserStore";
import FormInput from "../FormInput";
import style from "../../styles/pages/_action_user.module.scss";
import {useForm} from "react-hook-form";
import imageUpload from "../../assets/images/upload/uploadImage.jpg";
import {environmentConfig} from "../../apis";
import {useUploadFileStore} from "../../store/useUploadFileStore";
import Button from "../Button";
import {useStateContext} from "../../contexts/ContextProvider";
import path from "../../contants/path";

const listGender = [
	{value: 1, label: "Nam"},
	{value: 0, label: "Nữ"},
	{value: 2, label: "Khác"},
]

const ModalCompo = forwardRef((props, ref)=> {
	const [show, setShow] = useState(false);
	const [value, setValue] = useState()
	const {control,reset,handleSubmit} = useForm()
	const {currentColor} = useStateContext()
	const [gender,setGender] = useState()

	const cancel = () => {
		setShow(false)
		reset()
	}
	useImperativeHandle(ref, () => ({
		open: ()=> setShow(true),
		close: ()=> setShow(false)
	}));


	const {updateUser,getMyProfile} = useUserStore(state => ({
		updateUser: state.updateUser,
		getMyProfile: state.getMyProfile
	}))

	const {uploadArray} = useUploadFileStore(state => ({
		uploadArray: state.UploadMutiple
	}))

	const myProfile = JSON.parse(localStorage.getItem('user'))

	useEffect(()=>{
		setValue(myProfile?.avatar?.[0]?.url)
		setGender(myProfile?.gender)
		reset({
			full_name: myProfile?.full_name,
			email: myProfile?.email,
			phone: myProfile?.phone,
		})
	},[show])

	const onchange = (e) => {
		setGender(e?.target?.value)
	}

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
		updateUser(myProfile?.id, data).then(res => {
			if (res?.status === 200) {
				message.success("Cập nhật thông tin thành công")
				getMyProfile().then(res => {
					localStorage.setItem('user', JSON.stringify(res.data))
				})
				reset()
				cancel()
			} else {
				message.error("Cập nhật thông tin thất bại")
			}
		})
		console.log(data)
	}

	return (
		<Modal
			footer={null}
			className={"detail"}
			title={"Cập nhật thông tin"}
			visible={show}
			width={700}
			onCancel={()=>cancel()}

		>
			<div>
				<form onSubmit={handleSubmit(onsubmit)}>
					<div className={style.main}>
						<div className={style.box}>
							<FormInput
								className={style.form}
								label={"Họ và tên"}
								control={control}
								name={"full_name"}
								defaultValue={myProfile?.full_name}
								rules={{required: "Họ tên không được để trống"}}
							/>
							<FormInput
								className={style.form}
								label={"Email"}
								control={control}
								name={"email"}
								defaultValue={myProfile?.email}
								rules={{required: "Email không được để trống"}}
							/>
						</div>
						<div className={style.box}>
							<FormInput
								className={style.form}
								label={"Số điện thoại"}
								control={control}
								name={"phone"}
								defaultValue={myProfile?.phone}
								rules={{required: "Số điện thoại không được để trống"}}

							/>
							<FormInput
								className={style.form}
								label={"Ngày sinh"}
								note={"(YYYY-MM-DD)"}
								control={control}
								name={"dob"}
								defaultValue={myProfile?.dob}
								rules={{required: "Ngày sinh không được để trống"}}
							/>
						</div>
						<div className={style.box}>
							<div className={style.gender}>
								<span className={style.label}>Giới tính</span>
								<Radio.Group name="gender" defaultValue={myProfile?.gender} onChange={onchange}>
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
			</div>

		</Modal>
	);
});

export default ModalCompo;
