import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import styleCategory from "../../styles/pages/_category.module.scss";
import path from "../../contants/path";
import {FaEdit, FaRegEye} from "react-icons/fa";
import {Popconfirm, Table} from "antd";
import {BsTrash} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import Pagination from "../../components/Pagination";
import {useGroupStore} from "../../store/useGroupStore";
import ButtonAction from "../../components/ButtonAction";

const Groups = () => {
	const {Column} = Table

	const [currenPage, setCurrenPage] = useState(1)

	const {getGroup,listGroup} = useGroupStore(state => ({
		getGroup: state.getGroup,
		listGroup: state.listGroup
	}))

	useEffect(()=>{
		getGroup(currenPage)
	},[currenPage])

	const confirm = (id) => {

	}
	const onPagination = (data) => {
		setCurrenPage(data + 1)
		window.scrollTo({top: 0})
	}

	const data = listGroup?.data
	return (
		<MainContainer>
			<Header title={"Group"}/>

			<Table dataSource={data} rowKey={data => data?.id} style={{textAlignLast: 'center'}} pagination={false}>
				<Column title={"ID"} dataIndex="id" key="id"/>
				<Column title={"Tên group"} dataIndex="name" key="name"/>
				<Column title={"Mô tả"} dataIndex="description" key="description"/>
				<Column title={"Thành viên"} dataIndex="number_people" key="number_people"/>
				<Column title={"#"} render={(value) => (
					<ButtonAction
						edit={path.ACTION_GROUP + value.id}
						detail={path.GROUP_DETAIL + value.id}
						confirm={()=> confirm(value.id)}
					/>
				)}/>
			</Table>
			<Pagination total={listGroup.total_items} onClick={onPagination}/>
		</MainContainer>
	);
};

export default Groups;