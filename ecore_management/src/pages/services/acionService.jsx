import React from 'react';
import MainContainer from "../../components/layout/MainContainer";
import {Header} from "../../components";
import {useParams} from "react-router-dom";
import FormInput from "../../components/FormInput";
import {useForm} from "react-hook-form";

const AcionService = () => {
	const {service_id} = useParams()
	const {control, handleSubmit, reset, setValue} = useForm();
	return (
		<MainContainer>
			<Header category="Page" title={!service_id ? "Add new service":"Edit service" }/>
			<div>
				<form>
					<FormInput
						name={'name'}
						control={control}
						label={'Tên dịch vụ'}
						placeholder={'Nhập tên dịch vụ...'}/>
				</form>
			</div>
		</MainContainer>
	);
};

export default AcionService;