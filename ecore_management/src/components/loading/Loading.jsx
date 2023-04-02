import React from 'react';
import { Spin } from 'antd';
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import "../../styles/pages/global.scss"
const Loading = () => {
	const antIcon = (
		<AiOutlineLoading3Quarters
			className={"icon_loading"}
		/>
	)
	return (
		<Spin style={{display:'flex',justifyContent:'center'}} indicator={antIcon} />
	);
};

export default Loading;