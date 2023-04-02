import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from '../styles/pages/_admin_login.module.scss'
import { useForm } from "react-hook-form";
import { useUserStore } from "../store/useUserStore";
import { message } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import path from "../contants/path";
import styleLogin from "../styles/pages/_login_admin.module.scss";
import { Button } from '../components';

const LoginAdmin = () => {

	const { control, handleSubmit } = useForm();

	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false)

	const { login, myUser } = useUserStore(state => ({
		login: state.login,
		myUser: state.myUser
	}))

	const onSubmit = async (data) => {
		if (!!data && !!data.user_name && !!data.password) {
			const isAuth = await login(data)
			if (isAuth) {
				navigate(path.HOME_PAGE, { replace: true })
				message.success("Đăng nhập thành công")
			} else {
				message.error("Đăng nhập thất bại")
			}
		}
	}
	if (myUser?.email !== undefined) return (<Navigate to={path.HOME_PAGE} />)

	if (isLoading) return <div>Loading...</div>

	return (
		<div className={`container align-items-center justify-content-center d-flex ${styles.main} ${styleLogin.margin}`}>
			<h1 className={styleLogin.title}>{'Đăng nhập'}</h1>
			<form className={styles.mainForm} onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					placeholder={'Nhập tên đăng nhập...'}
					label={'Tên đăng nhập'}
					control={control}
					name={'user_name'}
				/>
				<FormInput
					placeholder={'Nhập mật khẩu...'}
					label={'Mật khẩu'}
					control={control}
					name={'password'}
					type={'password'}
				/>
				<Button text={"Đăng Nhập"} bgColor="#007bff" color="#FFFFFF" borderRadius={"12px"} />
			</form>

		</div>
	);
};

export default LoginAdmin;
