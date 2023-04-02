import React, {useEffect, useState} from 'react';
import {Table} from "antd";
import ButtonAction from "../ButtonAction";
import path from "../../contants/path";
import Pagination from "../Pagination";
import {usePostsStore} from "../../store/usePostsStore";

const ListPosts = ({group_id}) => {
	const {Column} = Table
	const [posts,setPosts] = useState()
	const [currenPage, setCurrenPage] = useState(1)
	const {getPostByGroup} = usePostsStore(state => ({
		getPostByGroup: state.getPostsByGroup
	}))

	useEffect(()=>{
		getPostByGroup(group_id, currenPage).then(res => {
			if(res.status === 200){
				setPosts(res.data)
			}
		})
	},[group_id])
	const confirm = () =>{

	}
	const onPagination = async (data) => {
		setCurrenPage(data + 1)
		window.scrollTo({top: 0})
	}
	const data = posts?.data
	return (
		<div>
			<Table dataSource={data} rowKey={data => data?.id} style={{textAlignLast: 'center'}} pagination={false}>
				<Column title={"ID"} dataIndex="id" key="id"/>
				<Column title={"Tên group"} dataIndex="name" key="name"/>
				<Column title={"Mô tả"} dataIndex="description" key="description"/>
				<Column title={"Người đăng"} dataIndex="" key=""/>
				<Column title={"Lượt thích"} dataIndex="total_like" key="total_like"/>
				<Column title={"#"} render={(value) => (
					<ButtonAction
						edit={path.ACTION_GROUP + value.id}
						detail={path.GROUP_DETAIL + value.id}
						confirm={()=> confirm(value.id)}
					/>
				)}/>
			</Table>
			<Pagination total={posts?.total_items} onClick={onPagination}/>
		</div>
	);
};

export default ListPosts;