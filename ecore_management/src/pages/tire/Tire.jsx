import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useTireStore} from "../../store/useTireStore";
import ButtonAction from "../../components/ButtonAction";
import path from "../../contants/path";
import {message, Table} from "antd";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import {useNavigate} from "react-router-dom";
import {formatDate, formatDateWithFormatStr} from "../../utils/formatDate";

const Tire = () => {
	const {Column} = Table
	const {currentColor} = useStateContext()
	const navigate = useNavigate()
	const [currentPage,setCurrentPage] = useState(1)

	const {getTire,listTire,deleteTire} = useTireStore(state => ({
		getTire: state.getTire,
		listTire: state.listTire,
		deleteTire: state.deleteTire
	}))
	useEffect(() =>{
		getTire(currentPage)
	},[])

	const confirm = (id) =>{
		deleteTire(id).then(res => {
			if(res.status === 200){
				getTire(currentPage)
				message.success("Xóa lốp xe thành công")
			}else {
				message.error("Xóa lốp xe thất bại")
			}
		})
	}

	const data = listTire?.data
	return (
		<MainContainer>
			<Header title={"Danh sách lốp xe"}/>
			<div>
				<Button
					text={"Thêm lốp xe"}
					bgColor={currentColor}
					color={"#fff"}
					borderRadius={"12px"}
					margin={"20px 0"}
					onClick={()=>navigate(path.ACTION_TIRE)}
				/>
			</div>
			<Table dataSource={data} rowKey={data => data?.id} style={{textAlignLast: 'center'}} pagination={false}>
				<Column title={"IMEI"} dataIndex="imei" key="imei"/>
				<Column title={"SIZE"} dataIndex="size" key="size"/>
				<Column title={"Thời gian bảo hành"} render={(value)=>(
					formatDate(value.warranty_time,"DD-MM-YYYY")
				)}/>
				<Column title={"Trạng thái"} render={(value)=>(
					value?.car !== null ? "Đã lắp" : "Chưa lắp"
				)}/>
				<Column title={"#"} render={(value) => (
					<ButtonAction
						edit={path.ACTION_TIRE + value.id}
						detail={path.BOX_DETAIL + value.id}
						confirm={()=>confirm(value.id)}
					/>
				)}/>
			</Table>
		</MainContainer>
	);
};

export default Tire;