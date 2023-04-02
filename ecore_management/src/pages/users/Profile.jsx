import React, {useRef} from "react";
import { Header } from "../../components";
import MainContainer from "../../components/layout/MainContainer";
import styleProfile from "../../styles/pages/_profile.module.scss";
import avatar from "../../data/avatar.jpg";
import constant from "../../contants/constant";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import {environmentConfig} from "../../apis";
import path from "../../contants/path";
import {useNavigate} from "react-router-dom";
import ModalCompo from "../../components/modal/ModalCompo";
import {useUserStore} from "../../store/useUserStore";
import Info from "../../components/user/Info";

const Profile = () => {
  const navigate = useNavigate()
  const {currentColor} = useStateContext();

  // const {myProfile} = useUserStore(state => ({
  //     myProfile: state.myProfile
  // }))
    const myProfile = JSON.parse(localStorage.getItem('user'))

  const detail = useRef()

  return (
    <MainContainer>
      <Header category="" title="Thông tin cá nhân" />
      <div className={styleProfile.box_profile}>
        <div className={styleProfile.info}>
          <Info myUser={myProfile}/>
          <div className={styleProfile.button}>
            <Button
                type={"button"}
                onClick={() => {
                  detail.current?.open()
                }}
                text={"Cập nhật"} bgColor={currentColor} borderRadius={"5px"} color={"#fff"} />
          </div>
        </div>
      </div>
      <ModalCompo ref={detail} userId={myProfile?.id}/>
    </MainContainer>
  );
};

export default Profile;

