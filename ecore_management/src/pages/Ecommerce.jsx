import React, {useEffect, useState} from "react";
import {BsBoxSeam, BsCurrencyDollar} from "react-icons/bs";
import {Button} from "../components";
import {useStateContext} from "../contexts/ContextProvider";
import MainContainer from "../components/layout/MainContainer";
import {MdOutlineSupervisorAccount} from "react-icons/md";
import {FiBarChart} from "react-icons/fi";
import {HiOutlineRefresh} from "react-icons/hi";
import {useUserStore} from "../store/useUserStore";

const earningData = [
	{
		id: 1,
		icon: <MdOutlineSupervisorAccount/>,
		amount: '',
		percentage: '',
		title: 'User',
		iconColor: '#03C9D7',
		iconBg: '#E5FAFB',
		pcColor: 'red-600',
	},
	{
		id: 2,
		icon: <BsBoxSeam/>,
		amount: '4,396',
		percentage: '+23%',
		title: 'Products',
		iconColor: 'rgb(255, 244, 229)',
		iconBg: 'rgb(254, 201, 15)',
		pcColor: 'green-600',
	},
	{
		id: 3,
		icon: <FiBarChart/>,
		amount: '423,39',
		percentage: '+38%',
		title: 'Sales',
		iconColor: 'rgb(228, 106, 118)',
		iconBg: 'rgb(255, 244, 229)',

		pcColor: 'green-600',
	},
	{
		id: 4,
		icon: <HiOutlineRefresh/>,
		amount: '39,354',
		percentage: '-12%',
		title: 'Refunds',
		iconColor: 'rgb(0, 194, 146)',
		iconBg: 'rgb(235, 250, 242)',
		pcColor: 'red-600',
	},
];

const Ecommerce = () => {
	const [data, setData] = useState(earningData)
	const {currentColor} = useStateContext();

	const {getUsers,user} = useUserStore(state => ({
		getUsers: state.getUsers,
		user: state.user
	}))

	useEffect(()=>{
		async function fetchData(){
			await getUsers()
			await updateData()
		}
		fetchData()
	},[])

	const updateData = () => {
		setData(current => current.map(obj =>{
			if(obj.id === 1){
				return {...obj,amount:user?.total_items}
			}
			return obj;
		}))
	}
	return (
		<MainContainer>
			<div className="mt-24">
				<div className="flex flex-wrap lg:flex-nowrap justify-center ">
					<div
						className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center">
						<div className="flex justify-between items-center">
							<div>
								<p className="font-bold text-gray-400">Earnings</p>
								<p className="text-2xl">$63,448.78</p>
							</div>
							<button
								type="button"
								style={{backgroundColor: currentColor}}
								className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
							>
								<BsCurrencyDollar/>
							</button>
						</div>
						<div className="mt-6">
							<Button
								color="white"
								bgColor={currentColor}
								text="Download"
								borderRadius="10px"
							/>
						</div>
					</div>
					<div className="flex m-3 flex-wrap justify-center gap-1 items-center">
						{data.map((item) => (
							<div
								key={item.title}
								className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
							>
								<button
									type="button"
									style={{color: item.iconColor, backgroundColor: item.iconBg}}
									className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
								>
									{item.icon}
								</button>
								<p className="mt-3">
									<span className="text-lg font-semibold">{item.amount}</span>
									<span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
								</p>
								<p className="text-sm text-gray-400  mt-1">{item.title}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</MainContainer>
	);
};

export default Ecommerce;
