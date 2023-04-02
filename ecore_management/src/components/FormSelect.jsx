import React from 'react';
import {Select} from "antd";
import {useForm, Controller} from "react-hook-form";

const FormSelect = ({options,label}) => {
	const {control} = useForm()
	return (
		<Controller
			name="select"
			control={control}
			render={({field}) =>
				<div style={{width: '392px',display:'flex',flexDirection:'column'}}>
					<span style={{fontFamily:"Montserrat, sans-serif",fontWeight:'600',marginBottom:'7px'}}>{label}</span>
					<Select style={{height:'42px'}}
							{...field}
							options={options}
					/>
				</div>
			}
		/>
	);
};

export default FormSelect;