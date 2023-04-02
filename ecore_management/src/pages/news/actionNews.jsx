import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import ReactQuill from "react-quill";
import FormInput from "../../components/FormInput";
import {useForm} from "react-hook-form";
import {message} from "antd";
import {useUploadFileStore} from "../../store/useUploadFileStore";
import imageUpload from "../../assets/images/upload/uploadImage.jpg";
import {environmentConfig} from "../../apis";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import {useNewsStore} from "../../store/useNewsStore";
import path from "../../contants/path";
import style from "../../styles/pages/_action_news.module.scss"


const modules = {
	toolbar: [[{'header': '1'}, {'header': '2'}, {'font': []}], [{size: []}], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], ['link', 'image', 'video'], ['clean']],
}
const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']

const ActionNews = () => {
	const {news_id} = useParams()
	const {control,reset,handleSubmit} = useForm()
	const navigate = useNavigate()
	const {currentColor} = useStateContext()
	const [content, setContent] = useState()
	const [value, setValue] = useState()
	const [news, setNews] = useState()

	const {uploadArray} = useUploadFileStore(state => ({
		uploadArray: state.UploadMutiple
	}))
	const {getNewsById,addNews,updateNews} = useNewsStore(state => ({
		getNewsById: state.getNewsById,
		addNews: state.addNews,
		updateNews: state.updateNews
	}))

	useEffect(()=>{
		if(news_id){
			getNewsById(news_id).then(res => {
				setNews(res?.data)
				setContent(res?.data?.content)
				setValue(res?.data?.image_url)
				const {data} = res
				reset({
					name: data?.name,
					description: data?.description,
				})
			})
		}else{

		}
	},[news_id])
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
		data.content = content
		data.image_url = value?.image_url?.join(";")
		if (news_id) {
			updateNews(news_id, data).then(res => {
				if(res.status === 200){
					navigate(path.NEWS)
					reset()
					setValue()
					message.success("Cập nhật tin tức thành công")
				}else{
					message.error("Cập nhật tin tức thất bại")
				}
			})
		} else {
			addNews(data).then(res => {
				if(res.status === 200){
					navigate(path.NEWS)
					reset()
					setValue()
					message.success("Thêm tin tức thành công")
				}else{
					message.error("Thêm tin tức thất bại")
				}
			})
		}
	}

	return (<MainContainer>
			<Header title={!news_id ? "Thêm tin tức" : "Cập nhật tin tức"}/>
			<div className={style.main}>
				<form onSubmit={handleSubmit(onsubmit)}>
					<div className={style.body}>
						<div className={style.box}>
							<FormInput
								label={"Tiêu đề tin tức"}
								control={control}
								name={"name"}
								rules={{required: "Tiêu đề không được để trống"}}
								placeholder={"Nhập tiêu đề..."}
							/>
							<FormInput
								label={"Mô tả"}
								control={control}
								name={"description"}
								ruless={{required: "Mô tả không được để trống"}}
								placeholder={"Nhập mô tả..."}
							/>
							<div className={style.form}>
								<span className={style.label}>Nội dung</span>
								<ReactQuill formats={formats} modules={modules} theme="snow" value={content}
											onChange={setContent}/>
							</div>
							<div className={style.form}>
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
						</div>
						<div>
							<Button
								onClick={handleSubmit(onsubmit)}
								text={"Xác nhận"}
								bgColor={currentColor}
								color={"#fff"}
								borderRadius={"12px"}
							/>
						</div>
					</div>
				</form>
			</div>
		</MainContainer>);
};

export default ActionNews;