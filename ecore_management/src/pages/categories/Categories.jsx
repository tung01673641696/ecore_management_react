import React, {useEffect} from 'react';
import {Header} from "../../components";
import MainContainer from "../../components/layout/MainContainer";
import {Popconfirm, Table, message} from "antd";
import {useCategoryStore} from "../../store/useCategoryStore";
import styleCategory from "../../styles/pages/_category.module.scss";
import path from "../../contants/path";
import {FaEdit} from "react-icons/fa";
import {BsTrash,BsFillPlusCircleFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import {useStateContext} from "../../contexts/ContextProvider";
import {useTranslation} from "react-i18next";

const data = [
	{id: 1, name: 'cate 1', des: 'cate 1 ', content: 'abc'},
	{id: 2, name: 'cate 2', des: 'cate 2 ', content: 'abcd'},
	{id: 3, name: 'cate 3', des: 'cate 3 ', content: 'abcde'},
	{id: 4, name: 'cate 4', des: 'cate 4 ', content: 'abcdef'},
]

const Categories = () => {
	const {t} = useTranslation()
	const {Column} = Table
	const navigate = useNavigate()
	const {currentColor} = useStateContext();
	const {getCategory, cate,deleteCate} = useCategoryStore(state => ({
		getCategory: state.getCategory,
		cate: state.cate,
		deleteCate: state.deleteCategory
	}))
	console.log("cate", cate)
;
	useEffect(() => {
		async function fetchData() {
			await getCategory()
		}
		fetchData()
	}, [])


	const confirm = (id) => {
		deleteCate(id).then(res => {
			if(res.status === 200){
				message.success("Xóa danh mục thành công")
				getCategory()
			}else{
				message.error("Xóa danh mục thất bại")
			}
		})
	};

	const data = cate?.data
	return (
    <MainContainer>
      <Header category="Page" title={t("category")} />
      <div className={styleCategory.button}>
        <Button
          onClick={() => navigate(path.ACTION_CATEGORY)}
          text={t("add")}
          bgColor={currentColor}
          color={"#fff"}
          borderRadius={"15px"}
        />
      </div>
      <Table
        dataSource={data}
        rowKey={(data) => data?.id}
        style={{ textAlignLast: "center" }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      >
        <Column title={"ID"} dataIndex="id" key="id" />
        {/* <Column title={"Ảnh"} render={(value)=>(
					<div style={{display:'flex',alignItems:'center',gap:'10px',marginLeft:'10px',justifyContent:'center'}}>
						<img className={"rounded-full w-10 h-10"} src={`${environmentConfig.BASE_URI}/${value?.image_url[0].url}`} alt=""/>
					</div>
				)}/> */}
        <Column title={t("cate_name")} dataIndex="name" key="name" />
        <Column title={t("des")} dataIndex="des" key="des" />
        <Column
          title={"#"}
          render={(value) => (
            <div className={styleCategory.boxButton}>
              <span
                className={styleCategory.edit}
                onClick={() => navigate(path.ACTION_CATEGORY + value.id)}
              >
                <FaEdit />
              </span>
              <Popconfirm
                okType={"default"}
                title="Bạn có muốn xóa không?"
                okText={"xóa"}
                cancelText={"hủy"}
                // description="Bạn có muốn xóa"
                onConfirm={() => confirm(value?.id)}
              >
                <span className={styleCategory.delete}>
                  <BsTrash />
                </span>
              </Popconfirm>
			  <span
                className={styleCategory.edit}
                onClick={() => navigate(path.ADD_CATE_CHILL + value.id)}
              >
                <BsFillPlusCircleFill />
              </span>
            </div>
          )}
        />
      </Table>
    </MainContainer>
  );
};

export default Categories;