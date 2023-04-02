import React from 'react';
import {Button} from "../index";
import {MdOutlineCancel} from "react-icons/md";
import {useStateContext} from "../../contexts/ContextProvider";
import {useNavigate} from "react-router-dom";

const ChangePassword = () => {
	const {setIsClicked, initialState } = useStateContext();
	const navigate = useNavigate();
	return (
		<div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
			<div className="flex justify-between items-center">
				<p className="font-semibold text-lg dark:text-gray-200">Đổi mật khẩu</p>
				<Button
					icon={<MdOutlineCancel />}
					color="rgb(153, 171, 180)"
					bgHoverColor="light-gray"
					size="2xl"
					borderRadius="50%"
					onClick={() => setIsClicked(initialState)}
				/>
			</div>
		</div>
	);
};

export default ChangePassword;