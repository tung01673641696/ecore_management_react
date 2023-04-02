import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import styleCategory from "../../styles/pages/_category.module.scss";
import Button from "../../components/Button";
import path from "../../contants/path";
import {useStateContext} from "../../contexts/ContextProvider";
import {Table,message} from "antd";
import {useNavigate} from "react-router-dom";
import {useBoxStore} from "../../store/useBoxStore";
import Pagination from "../../components/Pagination";
import ButtonAction from "../../components/ButtonAction";
import {useTranslation} from "react-i18next";

const Box = () => {
	const {t} = useTranslation()
	const {currentColor} = useStateContext()
	const navigate = useNavigate()
	const {Column} = Table

	const [currentPage, setCurrentPage] = useState(1)

	const {getBox,listBox,deleteBox} = useBoxStore(state => ({
		getBox: state.getBox,
		listBox: state.listBox,
		deleteBox: state.deleteBox
	}))

	useEffect(()=>{
		getBox(currentPage)
	},[currentPage])

	const confirm = (id) => {
		deleteBox(id).then(res => {
			if(res.status === 200){
				message.success(t('delete_success'))
				getBox(currentPage)
			}else{
				message.error(t('delete_error'))
			}
		})
	}

	const onPagination = (data) => {
		setCurrentPage(data + 1)
		window.scrollTo({top: 0})
	}

	const data = listBox?.data
	return (
		<MainContainer>
			<Header category="" title="Tech box"/>
			<div className={styleCategory.button}>
				<Button
					onClick={() => navigate(path.ACTION_BOX)}
					text={t("add")}
					bgColor={currentColor}
					color={"#fff"}
					borderRadius={"15px"}/>
			</div>

			<Table dataSource={data} rowKey={data => data?.id} style={{textAlignLast: 'center'}} pagination={false}>
				<Column title={"ID"} dataIndex="id" key="id"/>
				<Column title={"Code"} dataIndex="code" key="code"/>
				<Column title={"Trạng thái"} render={(value)=>(
					value?.car !== null ? "Đã lắp" : "Chưa lắp"
				)}/>
				<Column title={"#"} render={(value) => (
					<ButtonAction
						edit={path.ACTION_BOX + value.id}
						detail={path.BOX_DETAIL + value.id}
						confirm={()=>confirm(value.id)}
					/>
				)}/>
			</Table>
			<Pagination total={listBox.total_items} onClick={onPagination}/>
		</MainContainer>
	);
};

export default Box;