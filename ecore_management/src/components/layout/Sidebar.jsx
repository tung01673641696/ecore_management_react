import React from "react";
import {Link, NavLink} from "react-router-dom";
import {SiShopware} from "react-icons/si";
import {MdOutlineCancel} from "react-icons/md";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";
import {useStateContext} from "../../contexts/ContextProvider";
import {FiBox, FiShoppingBag} from "react-icons/fi";
import {AiOutlineGift, AiOutlineUser} from "react-icons/ai";
import {BiCategory, BiNews} from "react-icons/bi";
import {GiFlatTire, GiHomeGarage, GiTireIron} from "react-icons/gi";
import {GrServices} from "react-icons/gr";
import {FaFileContract} from "react-icons/fa";
import {BsFileEarmarkPost} from "react-icons/bs";
import {HiOutlineUserGroup} from "react-icons/hi";
import {useTranslation} from "react-i18next";



const Sidebar = () => {
	const {t} = useTranslation()
	const links = [
		{
			title: 'Dashboard',
			links: [
				{
					name: 'ecommerce',
					path: '',
					icon: <FiShoppingBag/>,
					role: 0 || 1
				},
			],
		},

		{
			title: 'Pages',
			links: [
				{
					name: 'users',
					path: 'users',
					icon: <AiOutlineUser/>,
					role: 1
				},
				{
					name: `${t("category")}`,
					path: 'categories',
					icon: <BiCategory/>,
					role: 0 || 1
				},
				{
					name: `${t("product")}`,
					path: 'products',
					icon: <GiFlatTire/>,
					role: 1
				},
				{
					name: `${t("contract")}`,
					path: 'contract',
					icon: <FaFileContract/>,
					role: 1
				},
				{
					name: 'Ưu đãi',
					path: 'endow',
					icon: <AiOutlineGift/>,
				},
				{
					name: `${t("service")}`,
					path: 'service',
					icon: <GiTireIron/>,
					role: 1
				},
				{
					name: 'Garage',
					path: 'garage',
					icon: <GiHomeGarage/>,
					role: 1
				},
				{
					name: 'Box',
					path: 'box',
					icon: <FiBox/>,
					role: 1
				},
				{
					name:`${t("tire")}`,
					path: 'tire',
					icon: <GiFlatTire/>,
					role: 1
				},
				{
					name: `${t("news")}`,
					path: 'news',
					icon: <BiNews/>,
					role: 1
				},
				{
					name: `${t("status_service")}`,
					path: 'status-service',
					icon: <GrServices/>,
					role: 1
				},
				// {
				//   name: 'customers',
				//   icon: <RiContactsLine />,
				// },
			],
		},
		{
			title: 'Mạng xã hội',
			links: [
				{
					name: `${t("group")}`,
					path: 'groups',
					icon: <HiOutlineUserGroup/>,
					role: 1
				},
				{
					name: 'Quản lý bài viết',
					path: 'post',
					icon: <BsFileEarmarkPost/>,
					role: 1
				},
			],
		}
	]
	const {currentColor, activeMenu, setActiveMenu, screenSize} =
		useStateContext();

	const handleCloseSideBar = () => {
		if (activeMenu !== undefined && screenSize <= 900) {
			setActiveMenu(false);
		}
	};

	const activeLink =
		"flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
	const normalLink =
		"flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

	const user = JSON.parse(localStorage.getItem('user'))
	return (
		<div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
			{activeMenu && (
				<>
					<div className="flex justify-between items-center">
						<Link
							to="/"
							onClick={handleCloseSideBar}
							className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
						>
							<SiShopware/> <span>E-Core</span>
							{/*<img src="./logo.png" alt={"logo"}/>*/}
						</Link>
						<TooltipComponent content="Menu" position="BottomCenter">
							<button
								type="button"
								onClick={() => setActiveMenu(!activeMenu)}
								style={{color: currentColor}}
								className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
							>
								<MdOutlineCancel/>
							</button>
						</TooltipComponent>
					</div>
					<div className="mt-10 ">
						{links.map((item, index) => (
							<div key={index}>
								<p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
									{item.title}
								</p>
								{item.links.map((link, index) => (
									link.role === user?.role ?
										<NavLink
											to={`/${link.path}`}
											key={index}
											onClick={handleCloseSideBar}
											style={({isActive}) => ({
												backgroundColor: isActive ? currentColor : "",
											})}
											className={({isActive}) =>
												isActive ? activeLink : normalLink
											}

										>
											{link.icon}
											<span className="capitalize ">{link.name}</span>
										</NavLink> : ''
								))}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Sidebar;
