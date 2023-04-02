import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import {useCarStore} from "../../store/useCarStore";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import style from "../../styles/pages/_car_detail.module.scss"
import getImage from "../../utils/getImage";

const CarDetail = () => {
	const navigate = useNavigate()
	const {currentColor} = useStateContext()
	const {car_id} = useParams()
	const [car,setCar] = useState()

	const {getCarById} = useCarStore(state => ({
		getCarById: state.getCarById
	}))

	useEffect(()=>{
		getCarById(car_id).then(res => {
			if(res.status === 200){
				setCar(res.data)
			}
		})
	},[car_id])
	return (
		<MainContainer>
			<Header title={"Thông tin chi tiết"}/>
			{car?.box === null ?
				<div>
					<Button bgColor={currentColor} text={"Gắn box"} color={"#fff"} borderRadius={"12px"} margin={"20px 0"}/>
				</div>:""
			}
			<div className={style.body}>
				<div>
					<span className={style.title}>Thông tin xe</span>
					<div className={style.car}>
						<div className={style.image}>
							<img src={getImage(car?.image_url?.[0]?.url)} alt=""/>
						</div>
						<div className={style.info_car}>
							<div className={style.form}>
								<span className={style.label}>Tên xe:</span>
								<span className={style.label}>Biển số xe:</span>
								<span className={style.label}>Số khung (VIN):</span>
								<span className={style.label}>Số bánh xe:</span>
								<span className={style.label}>Mô tả:</span>
							</div>
							<div className={style.form}>
								<span className={style.content}>{car?.name}</span>
								<span className={style.content}>{car?.license_plates}</span>
								<span className={style.content}>{car?.VIN}</span>
								<span className={style.content}>{car?.wheel_number}</span>
								<span className={style.content}>{car?.des}</span>
							</div>
						</div>
					</div>
				</div>
				{car?.box &&
					<div>
						<span className={style.title}>Thông tin box</span>
						<div className={style.car}>
							<div className={style.image}>
								<img src={getImage(car?.image_url?.[0]?.url)} alt=""/>
							</div>
							<div className={style.info_car}>
								<div className={style.form}>
									<span className={style.label}>code:</span>
									<span className={style.label}>thông tin:</span>
								</div>
								<div className={style.form}>
									<span className={style.content}>{car?.box?.code}</span>
									<span className={style.content}>{car?.box?.infor}</span>
								</div>
							</div>
						</div>
					</div>
				}

				<div className={style.button}>
					<Button
						bgColor={currentColor}
						text={"Trở lại"}
						color={"#fff"}
						borderRadius={"12px"}
						margin={"20px 0"}
						onClick={()=>navigate(-1)}
					/>
				</div>
			</div>
		</MainContainer>
	);
};

export default CarDetail;