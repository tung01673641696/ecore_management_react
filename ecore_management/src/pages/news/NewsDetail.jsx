import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {useNavigate, useParams} from "react-router-dom";
import {useNewsStore} from "../../store/useNewsStore";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import path from "../../contants/path";
import {Skeleton} from "antd";

const NewsDetail = () => {
	const {news_id} = useParams()
	const navigate = useNavigate()
	const {currentColor} = useStateContext()

	const [news,setNews] = useState()

	const {getNewsById,loadingGetNewsById} = useNewsStore(state => ({
		getNewsById: state.getNewsById,
		loadingGetNewsById : state.loadingGetNewsById
	}))

	useEffect(()=>{
		getNewsById(news_id).then(res => {
			setNews(res.data)
		})
	},[news_id])

	return (
		<MainContainer>
			{!loadingGetNewsById ?
				<div>
					<p style={{fontSize:'25px',fontWeight:'600'}}>{news?.name}</p>
					<div dangerouslySetInnerHTML={{__html:news?.content}}/>
					<div style={{marginTop:'20px',display:'flex',justifyContent:'end'}}>
						<Button
							text={"Trở lại"}
							bgColor={currentColor}
							color={"#FFF"}
							borderRadius={"12px"}
							width={150}
							onClick={()=>navigate(path.NEWS)}
						/>
					</div>
				</div>:
				<Skeleton active paragraph={{
					rows: 10,
				}}/>
			}
		</MainContainer>
	);
};

export default NewsDetail;