import React, {useState} from 'react';
import {Modal} from 'antd';
import FormInput from "../FormInput";
import {useForm} from "react-hook-form";
import Button from "../Button";
import {useStateContext} from "../../contexts/ContextProvider";
import {useUserStore} from "../../store/useUserStore";

const ModalComponent = ({isModalOpen, handleCancel}) => {
	const {currentColor} = useStateContext();
	const {control, handleSubmit,reset} = useForm();

	const {changePass} = useUserStore(state => ({
		changePass: state.changePassword
	}))

	const onsubmit = (data) =>{
		changePass(data)
		reset()
	}
	return (
		<Modal footer={null} open={isModalOpen} onCancel={handleCancel}>
			<div style={{fontSize: '20px', fontWeight: '600', display: 'flex', justifyContent: 'center'}}>
				<span>Đổi mật khẩu</span>
			</div>
			<form onSubmit={handleSubmit(onsubmit)}>
				<FormInput
					placeholder={'Nhập mật khẩu cũ...'}
					label={'Mật khẩu cũ'}
					control={control}
					name={'password'}
					type={"password"}
					rules={{required: "Vui lòng nhập mật khẩu cũ"}}
				/>
				<FormInput
					placeholder={'Nhập mật khẩu mới...'}
					label={'Mật khẩu mới'}
					control={control}
					name={'new_password'}
					type={"password"}
					rules={{required: "Vui lòng nhập mật khẩu mới"}}
				/>
				<div style={{display: 'flex', justifyContent: 'end'}}>
					<Button
						text={"Xác nhận"}
						bgColor={currentColor}
						borderRadius={"5px"}
						color={"#fff"}
						size={"100px"}
						onClick={handleSubmit(onsubmit)}
					/>
				</div>
			</form>
		</Modal>
	);
};

export default ModalComponent;