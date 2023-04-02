import React, {useState} from "react";
import {MdOutlineCancel} from "react-icons/md";
import {Button} from ".";
import {userProfileData} from "../data/dummy";
import {useStateContext} from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import {useNavigate} from "react-router-dom";
import path from "../contants/path";
import constant from "../contants/constant";
import ModalComponent from "./modal/ModalComponent";
import {environmentConfig} from "../apis";
import styleProfile from "../styles/pages/_profile.module.scss";

const UserProfile = ({user}) => {
	const {currentColor, setIsClicked, initialState} = useStateContext();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	return (
		<>
            {!isModalOpen ?
                <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg dark:text-gray-200"></p>
                        <Button
                            icon={<MdOutlineCancel/>}
                            color="rgb(153, 171, 180)"
                            bgHoverColor="light-gray"
                            size="2xl"
                            borderRadius="50%"
                            onClick={() => setIsClicked(initialState)}
                        />
                    </div>
                    <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
						{user?.avatar === null ?
							<img className="rounded-full h-24 w-24" src={avatar} alt="avatar"/> :
							user?.avatar?.[0].url !== undefined ?
								<img className="rounded-full h-24 w-24" src={`${environmentConfig.BASE_URI}/${user?.avatar?.[0]?.url}`} alt="avatar"/>:
								<img className="rounded-full h-24 w-24" src={`${environmentConfig.BASE_URI}/${user?.avatar}`} alt="avatar"/>
						}
                        <div>
                            <p className="font-semibold text-xl dark:text-gray-200">
                                {user?.full_name}
                            </p>
                            <p className="text-gray-500 text-sm dark:text-gray-400">
                                {constant.role[user?.role]}
                            </p>
                            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <div>
                        {userProfileData.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
                                onClick={() => {
                                    index === 0 ? navigate(path.PROFILE) : setIsModalOpen(true)
                                }}
                            >
                                <button
                                    type="button"
                                    style={{color: item.iconColor, backgroundColor: item.iconBg}}
                                    className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                                >
                                    {item.icon}
                                </button>

                                <div>
                                    <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
                                    <p className="text-gray-500 text-sm dark:text-gray-400">
                                        {" "}
                                        {item.desc}{" "}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 f-r" >
                        <Button
                            color="white"
                            bgColor={currentColor}
                            text="Đăng xuất"
                            borderRadius="10px"
                            width="full"
                            onClick={() => {
                                localStorage.removeItem("user");
                                window.location.reload();
                            }}
                        />
                    </div>
                </div>:
                <ModalComponent isModalOpen={isModalOpen} handleCancel={()=>setIsModalOpen(false)}/>
            }
		</>
	);
};

export default UserProfile;
