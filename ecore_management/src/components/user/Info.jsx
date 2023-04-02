import React from 'react';
import styleProfile from "../../styles/pages/_profile.module.scss";
import constant from "../../contants/constant";
import {environmentConfig} from "../../apis";
import avatar from "../../assets/images/avatar/null.png"
import getImage from "../../utils/getImage";

const Info = ({myUser}) => {
	return (
		<div>
			<div className={styleProfile.avatar}>
				{myUser?.avatar === null ?
					<img className={styleProfile.image} src={avatar} alt="avatar"/> :
				myUser?.avatar?.[0].url !== undefined ?
					// <img className={styleProfile.image} src={`${environmentConfig.BASE_URI}/${myUser?.avatar?.[0]?.url}`} alt="avatar"/>:
					// <img className={styleProfile.image} src={`${environmentConfig.BASE_URI}/${myUser?.avatar}`} alt="avatar"/>
					<img className={styleProfile.image} src={getImage(myUser?.avatar?.[0]?.url)} alt="avatar"/>:
					<img className={styleProfile.image} src={getImage(myUser?.avatar)} alt="avatar"/>
				}

			</div>
			<div>
				<div className={styleProfile.d_name}>
              <span>
                <p className={styleProfile.name}>
					{myUser?.full_name}
				</p>
                <span className={styleProfile.role}>{constant.role[myUser?.role]}</span>
              </span>
				</div>
				<div className={styleProfile.box_info}>
					<div className={styleProfile.left}>
						<div className={styleProfile.item}>
							<span className={styleProfile.label}>Email</span>
							<span className={styleProfile.content}>{myUser?.email}</span>
						</div>
						<div className={styleProfile.item}>
							<span className={styleProfile.label}>Giới tính</span>
							<span className={styleProfile.content}>{constant.gender[myUser?.gender]}</span>
						</div>
					</div>
					<div className={styleProfile.left}>
						<div className={styleProfile.item}>
							<span className={styleProfile.label}>Số điện thoại</span>
							<span className={styleProfile.content}>{myUser?.phone}</span>
						</div>
						<div className={styleProfile.item}>
							<span className={styleProfile.label}>Ngày sinh</span>
							<span
								className={styleProfile.content}>{myUser?.dob === "Invalid date" ? "Chưa cập nhật" : myUser?.dob}</span>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default Info;