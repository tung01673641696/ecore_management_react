import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import style from "../../styles/pages/_action_box.module.scss";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import {useForm} from "react-hook-form";
import locale from 'antd/locale/vi_VN';
import {ConfigProvider, DatePicker, Select} from "antd";
import {useTireStore} from "../../store/useTireStore";
import {message} from "antd";
import path from "../../contants/path";

const rubber = [
	{id:1,name:"Cao su tự nhiên"},
	{id:2,name:"Cao su tổng hợp"},
]
const ActionTire = () => {
	const navigate = useNavigate()
	const {tire_id} = useParams()
	const {currentColor} = useStateContext()
	const {control,handleSubmit,reset,register} = useForm()
	const [date,setDate] = useState()
	const [dataRubber,setDataRubber] = useState()
	const [tire,setTire] = useState()

	const {addTire,getTireById,updateTire} = useTireStore(state => ({
		addTire: state.addTire,
		getTireById: state.getTireById,
		updateTire: state.updateTire
	}))

	useEffect(()=>{
		if(tire_id){
			getTireById(tire_id).then(res =>{
				if(res?.status === 200){
					setTire(res?.data)
					const {data} = res
					setDate(data?.warranty_time)
					setDataRubber(data?.rubber_type)
					reset({
						imei: data?.imei,
						size: data?.size,
					})
				}
			})
		}
	},[tire_id])

	const onChange = (date, dateString) => {
		setDate(dateString)
	};

	const onsubmit = (data) =>{
		data.warranty_time = date
		data.rubber_type = dataRubber
		data.imei = parseInt(data.imei)
		data.size = parseInt(data.size)
		if(tire_id){
			updateTire(tire_id,data).then(res => {
				if(res.status === 200){
					navigate(path.TIRE)
					message.success("Cập nhật lốp xe thành công")
				}else{
					message.error("Cập nhật lốp thất bại")
				}
			})
		}else {
			addTire(data).then(res => {
				if(res.status === 200){
					navigate(path.TIRE)
					message.success("Thêm lốp xe thành công")
				}else {
					message.error("Thêm lốp xe thất bại")
				}
			})
		}
	}
	return (
		<MainContainer>
			<Header title={tire_id ? "Cập nhật lốp xe" : "Thêm lốp xe"}/>
			<form>
				<div className={style.box}>
					<FormInput
						className={style.input}
						label={"IMEI"}
						control={control}
						name={"imei"}
						placeholder={"Nhập IMEI..."}
						rules={{required: "Vui lòng nhập IMEI"}}
					/>
					<FormInput
						className={style.input}
						label={"Thông số lốp"}
						control={control}
						name={"size"}
						placeholder={"Nhập thông số lốp..."}
						rules={{required: "Vui lòng nhập thông số lốp"}}
					/>
					<div className={style.date_pick}>
						<span className={style.label}>Loại cao su</span>
						<Select onChange={(e)=>setDataRubber(e)} placeholder={"Chọn loại cao su"}
								defaultValue={dataRubber}>
							{rubber.map(({id,name})=>(
								<Select.Option key={id} value={id}>{name}</Select.Option>
							))}
						</Select>
					</div>
					<div className={style.date_pick}>
						<span className={style.label}>Thời gian bảo hành</span>
						<ConfigProvider locale={locale} >
							<DatePicker onChange={onChange} placeholder={"Nhập thời gian bảo hành..."} style={{height:"42px",border:"1px solid #cdcdcd"}}/>
						</ConfigProvider>
					</div>
					<div>
						<Button
							onClick={handleSubmit(onsubmit)}
							text={"Xác nhận"}
							bgColor={currentColor}
							color={"#fff"}
							borderRadius={"5px"}
							margin={"20px 0"}
						/>
					</div>
				</div>
			</form>
		</MainContainer>
	);
};

export default ActionTire;