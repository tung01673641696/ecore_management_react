import React, {useEffect} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useParams} from "react-router-dom";
import FormInput from "../../components/FormInput";
import {useForm} from "react-hook-form";
import style from "../../styles/pages/_action_product.module.scss"
import {Col, Row, Select} from "antd";
import {useCategoryStore} from "../../store/useCategoryStore";

const ActionProduct = () => {
	const {product_id} = useParams()
	const {Option} = Select
	const {control, handleSubmit, reset, setValue} = useForm();

	const {getCate,listCate} = useCategoryStore(state => ({
		listCate: state.cate,
		getCate: state.getCategory
	}))

	useEffect(()=>{
		async function fetchData(){
			await getCate()
		}
		fetchData()
	},[])
	return (
		<MainContainer>
			<Header category="Page" title={!product_id ? "Thêm sản phẩm":"Sửa sản phẩm" }/>
			<div className={style.box_form}>
				<form>
					<div className={style.d_flex}>
						<div className={style.calc}>
							<span className={style.label}>Danh mục</span>
							<Select
								// defaultValue={dataRS?.address.city.id}
								// value={cityAddress}
								bordered={false}
								name="category"
								className={style.box_select}
								// onChange={(e)=>handleChange(e)}
								placeholder={'Chọn danh mục'}
							>
								{listCate?.data?.map((it,index)=>(
									<Option value={it.id} key={index}>{it?.name}</Option>
								))}
							</Select>
						</div>
						<FormInput
							className={style.calc}
							rules={{required: "Tên sản phẩm không để trống"}}
							// style={"calc"}
							name={"name"}
							// defaultValue={id? dataRS.name : ''}
							control={control}
							placeholder={"Nhập tên sản phẩm... "}
							label={"Tên sản phẩm"}/>
					</div>
					<div className={style.d_flex}>
						<FormInput
							className={style.calc}
							rules={{required: "Tên sản phẩm không để trống"}}
							// style={"calc"}
							name={"name"}
							// defaultValue={id? dataRS.name : ''}
							control={control}
							placeholder={"Nhập tên sản phẩm... "}
							label={"Số lượng"}/>
						<FormInput
							rules={{required: "Tên sản phẩm không để trống"}}
							className={style.calc}
							name={"quantity"}
							// defaultValue={id? dataRS.name : ''}
							control={control}
							placeholder={"Nhập số lượng... "}
							label={"Số lượng"}/>
					</div>
					<div className={style.d_flex}>
						<FormInput
							className={style.calc}
							rules={{required: "Giá tiền không được để trống"}}
							name={"name"}
							// defaultValue={id? dataRS.name : ''}
							control={control}
							placeholder={"Nhập giá gốc sản phẩm... "}
							label={"Giá gốc"}/>
						<FormInput
							rules={{required: "Giá tiền không được để trống"}}
							className={style.calc}
							name={"quantity"}
							// defaultValue={id? dataRS.name : ''}
							control={control}
							placeholder={"Nhập giá bán sản phẩm... "}
							label={"Giá bán"}/>
					</div>
				</form>
			</div>
		</MainContainer>
	);
};

export default ActionProduct;