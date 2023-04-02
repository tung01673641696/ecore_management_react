import React from 'react';
import {useController} from "react-hook-form";
import styles from "../styles/components/_form_input.module.scss"

const FormInput = props => {

	const {className,name,note,type, placeholder, label, rules, control, infoTxt, username, defaultValue, ...inputProps} = props

	const {field, fieldState} = useController({name, control, rules, defaultValue})

	const {error} = fieldState;

	return (
		<div style={{marginBottom:'10px'}} className={className}>
			<p className={styles.formLabel}>{label} <span style={{fontSize:'13px',color:'darkgray',fontWeight:'500'}}>{note}</span></p>
			{infoTxt&&(<p style={{margin: 0, fontSize: '11px', color: '#0984e3'}}>{infoTxt}</p>)}
			<input
				className={styles.formInput}
				name={name}
				onChange={field.onChange}
				onBlur={field.onBlur}
				placeholder={placeholder}
				value={field.value}
				type={type}
				{...inputProps}
			/>
			{error&&<p className={'error-message'} style={{color: 'red', fontSize: '12px', margin: '0'}}>
				{error.message}
			</p>
			}
		</div>
	);
};

export default FormInput;
