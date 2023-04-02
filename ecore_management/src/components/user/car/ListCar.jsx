import React, {useEffect, useState} from 'react';
import {useStateContext} from "../../../contexts/ContextProvider";
import Button from "../../Button";
import {useCarStore} from "../../../store/useCarStore";
import {Table} from "antd";
import ButtonAction from "../../ButtonAction";
import path from "../../../contants/path";
import Pagination from "../../Pagination";
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import Loading from "../../loading/Loading";

const ListCar = ({user_id}) => {
	const navigate = useNavigate()
	const {Column} = Table
	const {currentColor} = useStateContext()
	const [currenPage, setCurrenPage] = useState(1)

	const {getCarByUserId, listCar,deleteCar,loadingGetCar} = useCarStore(state => ({
		getCarByUserId: state.getByUserId,
		listCar: state.listCar,
		deleteCar: state.deleteCar,
		loadingGetCar: state.loadingGetCar
	}))

	useEffect(() => {
		getCarByUserId(currenPage, user_id)
	}, [user_id])

	const confirm = (id) => {
		deleteCar(id).then(res => {
			if(res.status === 200){
				getCarByUserId(currenPage,user_id)
				message.success("Xóa xe thành công")
			}else {
				message.error("Xóa xe thất bại")
			}
		})
	}

	const onPagination = () => {

	}

	const data = listCar?.data
	return (
		<div>
			<Button
				bgColor={currentColor}
				text={"Thêm xe"}
				color={"#fff"}
				borderRadius={"12px"}
				onClick={()=>navigate(path.ACTION_CAR + user_id)}
			/>
			{!loadingGetCar ?
				<>
					<Table dataSource={data} rowKey={data => data?.id} style={{textAlignLast: 'center'}} pagination={false}>
						<Column title={"ID"} dataIndex="id" key="id"/>
						<Column title={"Tên xe"} dataIndex="name" key="name"/>
						<Column title={"Biển số xe"} dataIndex="license_plates" key="license_plates"/>
						<Column title={"Số bánh"} dataIndex="wheel_number" key="wheel_number"/>
						<Column title={"#"} render={(value) => (
							<ButtonAction
								edit={path.ACTION_CAR + user_id +'/'+ value.id}
								detail={path.CAR_DETAIL + value.id}
								confirm={() => confirm(value.id)}
							/>
						)}/>
					</Table>
					<Pagination total={listCar.total_items} onClick={onPagination}/>
				</>:
				<Loading/>
			}
		</div>
	);
};

export default ListCar;