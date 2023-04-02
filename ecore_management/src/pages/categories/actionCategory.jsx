import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import style from "../../styles/pages/_action_category.module.scss"
import FormInput from "../../components/FormInput";
import {useForm} from "react-hook-form";
import {message} from "antd";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import {useCategoryStore} from "../../store/useCategoryStore";
import imageUpload from "../../assets/images/upload/uploadImage.jpg"
import {environmentConfig} from "../../apis";
import path from "../../contants/path";
import {useUploadFileStore} from "../../store/useUploadFileStore";

const ActionCategory = () => {
	const {category_id} = useParams()
	const {currentColor} = useStateContext();
	const {control, handleSubmit, reset} = useForm()
	const navigate = useNavigate()

	const [cateDetail, setCateDetail] = useState()
	const [value, setValue] = useState()


	const {getCateById, updateCate,addCategory} = useCategoryStore(state => ({
		getCateById: state.getCategoryById,
		addCategory: state.addCategory,
		updateCate: state.updateCategory
	}))

	const {uploadArray} = useUploadFileStore(state => ({
		uploadArray: state.UploadMutiple
	}))

	useEffect(() => {
		if (category_id) {
			getCateById(category_id).then(r => {
				setCateDetail(r.data)
				setValue(r.data.image_url)
				const {data} = r
				reset({
					name: data?.name,
					des: data?.des,
				})
			})
		}
	}, [category_id])

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
		if (category_id) {
			data.image_url = value?.image_url?.join(";")
			updateCate(category_id, data).then(res => {
				if(res.status === 200){
					navigate(path.CATEGORIES)
					message.success("Sửa danh mục thành công")
				}else{
					message.error("Sửa danh mục thất bại")
				}
			})
		} else {
			data.image_url = value?.image_url?.join(";")
			addCategory(data).then(res => {
				if(res.status === 200){
					navigate(path.CATEGORIES)
					reset()
					setValue()
					message.success("Thêm danh mục thành công")
				}else{
					message.error("Thêm danh mục thất bại")
				}
			})
		}
	}

	return (
		<MainContainer>
			<Header title={!category_id ? "Thêm danh mục" : "Sửa danh mục"}/>
			<form onSubmit={handleSubmit(onsubmit)}>
				<div className={style.box}>
					<FormInput
						defaultValue={category_id ? cateDetail?.name : ''}
						className={style.input}
						label={"Tên danh mục"}
						control={control}
						name={"name"}
						placeholder={"Nhập tên danh mục..."}
						rules={{required: "Vui lòng nhập tên danh mục"}}
					/>
					<FormInput
						defaultValue={category_id ? cateDetail?.des : ''}
						className={style.input}
						label={"Mô tả"}
						control={control}
						name={"des"}
						placeholder={"Nhập mô tả..."}
						rules={{required: "Vui lòng nhập mô tả"}}
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

export default React.memo(ActionCategory);