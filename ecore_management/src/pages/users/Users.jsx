import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import path from "../../contants/path";
import { Select, Table} from "antd";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider";
import {useUserStore} from "../../store/useUserStore";
import styleService from "../../styles/pages/_service.module.scss";
import constant from "../../contants/constant";
import Pagination from "../../components/Pagination";
import {message} from "antd";
import ButtonAction from "../../components/ButtonAction";
import {environmentConfig} from "../../apis";
import avatar from "../../assets/images/avatar/null.png";
import getImage from "../../utils/getImage";
import Loading from "../../components/loading/Loading";
import {useTranslation} from "react-i18next";

const Users = () => {
	const {t} = useTranslation()
	const {Column} = Table
	const [id,setId] = useState()

	const [currenPage, setCurrenPage] = useState(1)

	const {user, getUsers, deleteUser,updateRole,loadingGetUser} = useUserStore(state => ({
		getUsers: state.getUsers,
		user: state.user,
		deleteUser: state.deleteUser,
		updateRole: state.updateUser,
		loadingGetUser: state.loadingGetUser
	}))

	useEffect(() => {
		getUsers(currenPage)
	}, [currenPage])

	// delete
	const confirm = (id) => {
		deleteUser(id).then(res => {
			if (res?.status === 200) {
				message.success("Xóa user thành công")
				getUsers(currenPage)
			} else {
				message.error("Xóa user thất bại")
			}
		})
	}

	// update role
	const onchange = ({e,id}) => {
		const value = {role: e}
		updateRole(id, value).then(res =>{
			if(res?.status === 200){
				message.success("Cập nhật role thành công")
				getUsers(currenPage)
			}else{
				message.error("Cập nhật role thất bại")
			}
		})
	}

	// pagination
	const onPagination = async (data) => {
		setCurrenPage(data + 1)
		window.scrollTo({top: 0})
	}
	const data = user?.data
	return (
		<MainContainer>
			<Header category="Page" title="User"/>
			{!loadingGetUser ?
				<div>
					<Table dataSource={data} rowKey={data => data?.id} style={{textAlignLast: 'center'}} pagination={false}>
						<Column title={"ID"} dataIndex="id" key="id"/>
						<Column title={t('image')} render={(value)=>(
							<div style={{display:'flex',alignItems:'center',gap:'10px',marginLeft:'10px',justifyContent:'center'}}>
								{value?.avatar === null ?
									<img className={"rounded-full w-10 h-10"} src={avatar} alt="avatar"/>:
									<img className={"rounded-full w-10 h-10"} src={getImage(value?.avatar)} alt="avatar"/>
								}
							</div>
						)}/>
						<Column title={t('fullName')} dataIndex="full_name" key="full_name"/>
						<Column title={"Email"} dataIndex="email" key="email"/>
						<Column title={t('phone')} dataIndex="phone" key="phone"/>
						<Column className={styleService.status} title={t('gender')} render={(value) => (
							<span>{constant.gender[value?.gender]}</span>
						)}/>
						<Column className={styleService.status} title={t('role')} render={(value) => (
							<div className={"changeRole"}>
								<Select
									defaultValue={value?.role}
									options={[{value: 1, label: 'Administrator'}, {value: 0, label: "Khách hàng"}]}
									onChange={(e)=>{
										onchange({e,id: value.id})
									}}
								/>
							</div>
							// <span>{constant.role[value?.role]}</span>
						)}/>
						<Column title={"#"} render={(value) => (
							<ButtonAction
								edit={path.ACTION_USER + value.id}
								detail={path.USER_DETAIL + value.id}
								confirm={()=>confirm(value.id)}
							/>
						)}/>
					</Table>
					<Pagination total={user?.total_items} onClick={onPagination}/>
				</div>:
				<Loading/>
			}
		</MainContainer>
	);
};

export default Users;