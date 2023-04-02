import React, {useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {Tabs} from "antd";
import ListPosts from "../../components/group/ListPosts";
import {useParams} from "react-router-dom";

const GroupDetail = () => {
	const {group_id} = useParams()
	const [tabIndex,setTabIndex] = useState(1)
	const onChange = (key) => {
		setTabIndex(key)
	}

	return (
		<MainContainer>
			<Header title={"Chi tiết group"}/>
			<Tabs defaultActiveKey={1} onChange={onChange}>
				<Tabs.TabPane tab={"Bài viết"} key={1}>
					<ListPosts group_id={group_id}/>
				</Tabs.TabPane>
				<Tabs.TabPane tab={"Thành viên"} key={2}>
					<p>2</p>
				</Tabs.TabPane>
			</Tabs>
		</MainContainer>
	);
};

export default GroupDetail;