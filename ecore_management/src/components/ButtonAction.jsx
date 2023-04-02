import React from 'react';
import styleCategory from "../styles/pages/_category.module.scss";
import path from "../contants/path";
import {FaEdit, FaRegEye} from "react-icons/fa";
import {Popconfirm} from "antd";
import {BsTrash} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

const ButtonAction = ({edit,detail,confirm}) => {
	const navigate = useNavigate()
	return (
		<div className={styleCategory.boxButton}>
			<span className={styleCategory.edit}
				  onClick={()=> navigate(edit)}><FaEdit/>
			</span>
			<Popconfirm
				okType={"default"}
				title="Bạn có muốn xóa không?"
				okText={"xóa"}
				cancelText={"hủy"}
				onConfirm={confirm}
			>
				<span className={styleCategory.delete}><BsTrash/></span>
			</Popconfirm>
			<span
				className={styleCategory.detail}
				onClick={() => navigate(detail)}
			>
				<FaRegEye/>
			</span>
		</div>
	);
};

export default ButtonAction;