import React, {useEffect, useState} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import {BsChatLeft} from "react-icons/bs";
import {RiNotification3Line} from "react-icons/ri";
import {MdKeyboardArrowDown} from "react-icons/md";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";

import avatar from "../../data/avatar.jpg";
import {Chat, Notification, UserProfile} from "../index";
import {useStateContext} from "../../contexts/ContextProvider";
import {environmentConfig} from "../../apis";
import ChangeLanguage from "../ChangeLanguage";
import {US, VN} from "country-flag-icons/react/3x2";
import {useTranslation} from "react-i18next";

const NavButton = ({title, customFunc, icon, color, dotColor}) => (
	<TooltipComponent content={title} position="BottomCenter">
		<button
			type="button"
			onClick={() => customFunc()}
			style={{color}}
			className="relative text-xl rounded-full p-3 hover:bg-light-gray"
		>
      <span
		  style={{background: dotColor}}
		  className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
	  />
			{icon}
		</button>
	</TooltipComponent>
);

const Navbar = () => {
	const {t,i18n} = useTranslation()
	// const name = myUser?.full_name?.split(' ')
	const {
		currentColor,
		activeMenu,
		setActiveMenu,
		handleClick,
		isClicked,
		setScreenSize,
		screenSize,
	} = useStateContext();

	const [language,setLanguage] = useState(i18n.language)
	const [icon,setIcon] = useState()

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	useEffect(() => {
		if (screenSize <= 900) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	const handleActiveMenu = () => setActiveMenu(!activeMenu);
	// const {myProfile} = useUserStore(state => ({
	// 	myProfile: state.myProfile
	// }))
	const onChooseCountry = (data) => {
		setLanguage(data)
	}

	useEffect(()=>{
		console.log(language)
		switch (language) {
			case "vi":
				setIcon(<VN style={{width:"25px"}}/>)
				break
			case "us":
				setIcon(<US style={{width:"25px"}}/>)
				break
			default :
				setIcon(<VN style={{width:"25px"}}/>)
		}
	},[language])

	const myProfile = JSON.parse(localStorage.getItem('user'))

	return (
		<div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
			<NavButton
				title="Menu"
				customFunc={handleActiveMenu}
				color={currentColor}
				icon={<AiOutlineMenu/>}
			/>
			<div className="flex">
				<NavButton
				  title="Ngôn ngữ"
				  customFunc={() => handleClick("changeLanguage")}
				  color={currentColor}
				  icon={icon}
				/>
				<NavButton
					title={t("chat")}
					dotColor="#03C9D7"
					customFunc={() => handleClick("chat")}
					color={currentColor}
					icon={<BsChatLeft/>}
				/>
				<NavButton
					title={t("notification")}
					dotColor="rgb(254, 201, 15)"
					customFunc={() => handleClick("notification")}
					color={currentColor}
					icon={<RiNotification3Line/>}
				/>
				<TooltipComponent content="Profile" position="BottomCenter">
					<div
						className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
						onClick={() => handleClick("userProfile")}
					>

						{myProfile?.avatar === null ?
							<img className="rounded-full w-8 h-8" src={avatar} alt="avatar"/> :
							myProfile?.avatar?.[0].url !== undefined ?
								<img className="rounded-full w-8 h-8" src={`${environmentConfig.BASE_URI}/${myProfile?.avatar?.[0]?.url}`} alt="avatar"/>:
								<img className="rounded-full w-8 h-8" src={`${environmentConfig.BASE_URI}/${myProfile?.avatar}`} alt="avatar"/>
						}

						<p>
							<span className="text-gray-400 text-14">Hi,</span>{" "}
							<span className="text-gray-400 font-bold ml-1 text-14">
                {myProfile?.full_name}
              </span>
						</p>
						<MdKeyboardArrowDown className="text-gray-400 text-14"/>
					</div>
				</TooltipComponent>

				{isClicked.changeLanguage && <ChangeLanguage onChoose={onChooseCountry}/>}
				{isClicked.chat && <Chat/>}
				{isClicked.notification && <Notification/>}
				{isClicked.userProfile && <UserProfile user={myProfile}/>}
			</div>
		</div>
	);
};

export default Navbar;
