import React, {useEffect, useState} from 'react';
import {Header} from "../../components";
import MainContainer from "../../components/layout/MainContainer";
import {Col, Row, Table} from "antd";
import constant from "../../contants/constant"
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import styleService from "../../styles/pages/_service.module.scss"
import {useNavigate} from "react-router-dom";
import path from "../../contants/path";
import {FaEdit} from "react-icons/fa";
import {BsCheck, BsTrash} from "react-icons/bs";
import { Switch, Space } from 'antd';
import {GrFormClose} from "react-icons/gr";
import CardForm from "../../components/CardForm";
import {useForm} from "react-hook-form";
import FormInput from "../../components/FormInput";
import { useServiceStore } from '../../store/useServiceStore';


const data = [
	{id:1,name:'service 1',des:'service 1 ',status:'0'},
	{id:2,name:'service 2',des:'service 2 ',status:'1'},
	{id:3,name:'service 3',des:'service 3 ',status:'1'},
	{id:4,name:'service 4',des:'service 4 ',status:'1'},
]

const Service = () => {
	const {Column} = Table
	const navigate = useNavigate()
	const [isEdit, setIsEdit] = useState(false)
	const {control, handleSubmit, reset, setValue} = useForm();
	const { currentColor } = useStateContext();
	const {services,getAll} = useServiceStore(state => ({
		getAll: state.getAll,
		services: state.services,
	
	}))
	useEffect(() => {
		async function fetchData() {
			await getAll()
		}
		fetchData()
	}, [])
	const data = services?.data

	const onSubmit = async (data) => {
		console.log('a')
	}

	const onEdit = (id) =>  {
		if(!isEdit) setIsEdit(true)
		const dataRS = data.find(x=>x.id === id)
		reset({name: dataRS.name, id: dataRS.id, des: dataRS.des})
	}
	const onDelete = (id) =>{
	}
	return (
		<MainContainer>
			<Header category="Page" title="Service" />
			{/*<div className={styleService.buttonAdd}>*/}
			{/*	<Button*/}
			{/*		text={"Add new"}*/}
			{/*		bgColor={'#1e9364'}*/}
			{/*		color={"#FFF"}*/}
			{/*		borderRadius={"12px"}*/}
			{/*		bgHoverColor={currentColor}*/}
			{/*		onClick={()=>navigate(path.ACTION_SERVICE)}*/}
			{/*	/>*/}
			{/*</div>*/}
			<Row style={{justifyContent:'space-between'}}>
				<Col span={16}>
					<Table className={styleService.table} dataSource={data} rowKey={customersData => customersData?.id} style={{textAlignLast: 'center'}}
						   pagination={{
							   defaultPageSize: 10,
							   showSizeChanger: true,
							   pageSizeOptions: ['10', '20', '30']
						   }}
					>
						<Column title={"ID"} dataIndex="id" key="id"/>
						<Column title={"Name"} dataIndex="name" key="name"/>
						<Column title={"Description"} dataIndex="des" key="des"/>
						<Column className={styleService.status} title={"status"} render={(value)=>(
							// <span>{constant.status[value?.status]}</span>
							<Switch className={styleService.switch} size="small" defaultChecked />
						)}/>
						<Column className={styleService.action} title={"#"} render={(value) => (
							<div className={styleService.boxButton}>
								<span className={styleService.edit} onClick={()=>onEdit(value.id)}><FaEdit/></span>
								<span className={styleService.delete} onClick={()=>onDelete(value.id)}><BsTrash/></span>
							</div>
						)}/>
					</Table>
				</Col>
				<Col span={7}>
					<CardForm title={isEdit? 'Chỉnh sửa': 'Thêm mới'}
							headerComponent={isEdit&&(<Button bgColor={"#1aab70"} color={"#fff"} text={'Đổi sang thêm mới'}
							onClick={()=>{
								  reset({name: '', des: ''})
								  setIsEdit(false)
							  }}/>)}
					>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormInput
								// onKeyUp={(e)=>setValue('code', toSlug(e.target.value))}
								name={'name'}
								control={control}
								label={'Tên dịch vụ'}
								placeholder={'Nhập tên dịch vụ...'}
								rules={{required: "Tên dịch vụ không được để trống"}}
							/>
							<FormInput
								name={'des'}
								control={control}
								label={"Mô tả"}
								placeholder={'Nhập mô tả dịch vụ'}
								rules={{required: "Mô tả không được để trống"}}
							/>
							<Button
								width={"100%"}
								borderRadius={"12px"}
								bgColor={'#1aab70'}
								color={'#fff'}
								text={isEdit? 'Chỉnh sửa': 'Thêm mới'}
								type={'submit'}/>
						</form>
					</CardForm>
				</Col>
			</Row>
		</MainContainer>
	);
};

export default Service;