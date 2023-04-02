import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import MainContainer from "../../components/layout/MainContainer";
import { Col, Row, Switch, Table } from "antd";
import { useProductStore } from "../../store/useProductStore";
import styleService from "../../styles/pages/_service.module.scss";
import { FaEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import CardForm from "../../components/CardForm";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { useForm } from "react-hook-form";
import path from "../../contants/path";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const { Column } = Table
    const navigate = useNavigate()
    const { getProduct, product } = useProductStore(state => ({
        getProduct: state.getProduct,
        product: state.product.data
    }))

    const { control, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            await getProduct()
        }
        fetchData()
    }, [])


    const onDelete = (id) => {
    }
    return (
        <MainContainer>
            <Header category="Page" title="Sản phẩm" />
            <Button bgColor={"#0d6efd"} margin={"20px 0"} color={"#FFFFFF"} borderRadius={"12px"} text={"Thêm mới"} onClick={() => navigate(path.ACTION_PRODUCT)} />
            <Table className={styleService.table} dataSource={product} rowKey={product => product?.id} style={{ textAlignLast: 'center' }}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30']
                }}
            >
                <Column title={"ID"} dataIndex="id" key="id" />
                <Column title={"Name"} dataIndex="name" key="name" />
                <Column title={"Description"} dataIndex="des" key="des" />
                <Column className={styleService.status} title={"status"} render={(value) => (
                    // <span>{constant.status[value?.status]}</span>
                    <Switch className={styleService.switch} size="small" defaultChecked />
                )} />
                <Column className={styleService.action} title={"#"} render={(value) => (
                    <div className={styleService.boxButton}>
                        <span className={styleService.edit} onClick={() => navigate(path.ACTION_PRODUCT + value.id)}><FaEdit /></span>
                        <span className={styleService.delete} onClick={() => onDelete(value.id)}><BsTrash /></span>
                    </div>
                )} />
            </Table>
        </MainContainer>
    );
};
export default Products;
