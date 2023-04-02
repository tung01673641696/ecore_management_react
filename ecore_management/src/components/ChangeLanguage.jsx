import React from "react";
import {MdOutlineCancel} from "react-icons/md";
import {Button} from ".";
import {useStateContext} from "../contexts/ContextProvider";
import { US,VN } from 'country-flag-icons/react/3x2'
import {useTranslation} from "react-i18next";
const ChangeLanguage = ({onChoose}) => {
	const {t,i18n} = useTranslation();
	const {setIsClicked, initialState} = useStateContext();

	const country = [
		{id: "vi", Name: "Việt Nam" , render:(<VN style={{width:"30px"}} title="Việt Nam" className="..."/>)},
		{id: "us", Name: "United States" , render:(<US style={{width:"30px"}} title="United States" className="..."/>)}
	]

	const choose = (id) =>{
		onChoose(id)
	}
	return (
		<div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
			<div className="flex justify-between items-center">
				<div className="flex gap-3">
					<p className="font-semibold text-lg dark:text-gray-200">
						{t('country')}
					</p>
				</div>
				<Button
					onClick={() => setIsClicked(initialState)}
					icon={<MdOutlineCancel/>}
					color="rgb(153, 171, 180)"
					bgHoverColor="light-gray"
					size="2xl"
					borderRadius="50%"
				/>
			</div>
			<div className="mt-5 ">
				{country?.map(({id,Name,render,language})=>(
					<div
						key={id}
						onClick={()=>{
							choose(id)
							i18n.changeLanguage(id)
						}}
						className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
					>
						{render}
						<span className={"dark:text-gray-200"}>{Name}</span>
					</div>
				))}
			</div>
		</div>
	);
};


export default ChangeLanguage;
