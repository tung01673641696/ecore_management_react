import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {message, Popconfirm, Table} from "antd";
import styleCategory from "../../styles/pages/_category.module.scss";
import path from "../../contants/path";
import {FaEdit, FaRegEye} from "react-icons/fa";
import {BsTrash} from "react-icons/bs";
import Pagination from "../../components/Pagination";
import {useNavigate} from "react-router-dom";
import {useNewsStore} from "../../store/useNewsStore";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import ButtonAction from "../../components/ButtonAction";

const News = () => {
	const navigate = useNavigate()
	const {currentColor} = useStateContext()
	const {Column} = Table

	const [currenPage, setCurrenPage] = useState(1)

	const {getNews,listNews,deleteNews} = useNewsStore(state => ({
		getNews: state.getNews,
		listNews: state.listNews,
		deleteNews: state.deleteNews
	}))

	useEffect(()=>{
		getNews(currenPage)
	},[currenPage])
	// pagination
	const onPagination = async (data) => {
		setCurrenPage(data + 1)
		window.scrollTo({top: 0})
	}

	const confirm = (news_id) => {
		deleteNews(news_id).then(res => {
			if(res.status === 200){
				message.success("Xóa tin tức thành công")
				getNews(currenPage)
			}else{
				message.error("Xóa tin tức thất bại")
			}
		})
	}

	const data = listNews?.data
	return (
		<MainContainer>
			<Header category="" title="Tin tức" />
			<div style={{display:'flex',justifyContent:'end'}}>
				<Button
					onClick={() => navigate(path.ACTION_NEWS)}
					text={"Thêm mới"}
					bgColor={currentColor}
					color={"#fff"}
					borderRadius={"15px"}/>
			</div>
			<Table dataSource={data} rowKey={data => data?.id} style={{textAlignLast: 'center'}} pagination={false}>
				<Column title={"ID"} dataIndex="id" key="id"/>
				<Column title={"Tiêu đề"} dataIndex="name" key="name"/>
				<Column title={"Mô tả"} dataIndex="description" key="description"/>
				{/*<Column title={"Lượt thích"} dataIndex="total_like" key="total_like"/>*/}
				<Column title={"#"} render={(value) => (
					<ButtonAction
						detail={path.NEWS_DETAIL + value.id}
						edit={path.ACTION_NEWS + value.id}
						confirm={()=>confirm(value.id)}
					/>
				)}/>
			</Table>
			<Pagination total={listNews?.total_items} onClick={onPagination}/>
		</MainContainer>
	);
};

export default News;