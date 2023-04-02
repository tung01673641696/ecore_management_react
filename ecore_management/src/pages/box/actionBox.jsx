import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import FormInput from "../../components/FormInput";
import {useForm} from "react-hook-form";
import style from "../../styles/pages/_action_box.module.scss"
import imageUpload from "../../assets/images/upload/uploadImage.jpg";
import {environmentConfig} from "../../apis";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import {message} from "antd";
import {useUploadFileStore} from "../../store/useUploadFileStore";
import {useBoxStore} from "../../store/useBoxStore";
import path from "../../contants/path";
import {useTranslation} from "react-i18next";

const ActionBox = () => {
	const {t} = useTranslation()
	const {box_id} = useParams()
	const navigate = useNavigate()
	const {control,handleSubmit,reset} = useForm()
	const {currentColor} = useStateContext()

	const [value,setValue] = useState()
	const [box,setBox] = useState()

	const {uploadArray} = useUploadFileStore(state => ({
		uploadArray: state.UploadMutiple
	}))

	const {addBox,getBoxById} = useBoxStore(state => ({
		addBox: state.addBox,
		getBoxById: state.getBoxById
	}))

	useEffect(()=>{
		if(box_id){
			getBoxById(box_id).then(res => {
				setBox(res?.data)
				setValue(res?.data?.image_url)
				const {data} = res
				reset({
					code: data?.code,
					infor: data?.infor
				})
			})
		}
	},[box_id])

	const onsubmit = (data) => {
		data.image_url = value?.image_url?.join(";")
		if(box_id){

		}else{
			addBox(data).then(res => {
				if(res.status === 200){
					message.success(t("add_success"))
					reset()
					setValue()
					navigate(path.BOX)
				}else {
					message.error("add_error")
				}
			})
		}
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
					if ((res.status === 200 )) {
						message.success("Upload ảnh thành thành công");
					}
				})

		} catch (error) {
			message.error("Upload ảnh không thành công");
		}
	};
	return (
		<MainContainer>
			<Header title={!box_id ? t("add_box") : t("update_box")}/>
			<form>
				<div className={style.box}>
					<FormInput
						className={style.input}
						label={"Mã box"}
						control={control}
						name={"code"}
						placeholder={"Nhập mã box..."}
						rules={{required: "Vui lòng nhập mã box"}}
					/>
					<FormInput
						className={style.input}
						label={"Thông tin"}
						control={control}
						name={"infor"}
						placeholder={"Nhập thông tin box..."}
						rules={{required: "Vui lòng nhập thông tin box"}}
					/>
					<div style={{
						marginTop: '10px',
						display: 'flex',
						flexDirection: 'column',
						textAlign: 'left',
						marginRight: '260px'
					}}>
						<span style={{
							textAlign: "left",
							fontFamily: "Montserrat, sans-serif",
							fontWeight: '600'
						}}>Ảnh</span>
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
						{value?.image_url ? (
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
											src={`${environmentConfig.BASE_URI}/${image?.url}`}
											alt="error"
											key={index}
											width="50px"
											height="50px"
										/>
									))}
								</div>
							)

						}
					</div>
					<div>
						<Button
							onClick={handleSubmit(onsubmit)}
							text={t("confirm")}
							bgColor={currentColor}
							color={"#fff"}
							borderRadius={"5px"}/>
					</div>
				</div>
			</form>
		</MainContainer>
	);
};

export default ActionBox;