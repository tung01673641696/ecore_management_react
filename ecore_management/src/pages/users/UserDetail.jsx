import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {Tabs} from "antd";
import {useParams} from "react-router-dom";
import {useUserStore} from "../../store/useUserStore";
import styleProfile from "../../styles/pages/_profile.module.scss";
import Info from "../../components/user/Info";
import Button from "../../components/Button";
import ListCar from "../../components/user/car/ListCar";

const tab=[
	{key: 1 , tab:'Thông tin cá nhân'},
	{key: 2 , tab:'Danh sách xe'},
]
const UserDetail = () => {
	const {user_id} = useParams()
	const [actTabs,setActTabs] = useState(1)
	const [user,setUser] = useState()

	const {getUserById} = useUserStore(state => ({
		getUserById: state.getUserById
	}))

	const onChange = (key) => {
		setActTabs(key)
	};

	useEffect(()=>{
		if(actTabs === 1){
			getUserById(user_id).then(res => {
				if(res.status === 200){
					setUser(res.data)
				}
			})
		}
	},[actTabs,user_id])
	return (
		<MainContainer>
			<Header category="Page" title="Thông tin chi tiết"/>
			<Tabs defaultActiveKey={1} onChange={onChange}>
				<Tabs.TabPane tab={"Thông tin cá nhân"} key={1}>
					<div className={styleProfile.box_profile}>
						<div className={styleProfile.info}>
							<Info myUser={user}/>
						</div>
					</div>
				</Tabs.TabPane>
				<Tabs.TabPane tab={"Danh sách xe"} key={2}>
					<ListCar user_id={user_id}/>
				</Tabs.TabPane>
			</Tabs>
		</MainContainer>
	);
};

export default UserDetail;