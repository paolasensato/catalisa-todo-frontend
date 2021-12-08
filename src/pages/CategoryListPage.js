import { useEffect, useState } from "react";
import { Layout, Row, Col, Table, Modal } from "antd";
import axios from "axios";

const { Content } = Layout;

const { Column } = Table;

const CategoryListPage = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const requestCategory = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/tarefas/categorias')
            setCategory(response.data);

        } catch (error) {
            console.warn(error);
            Modal.error({
                title: "Não foi possível carregar suas categorias, tente novamente mais tarde."
            })
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        requestCategory();
    },[]);

    return (
        <Content>
            <Row gutter={[24, 24]} justify="center">
                <Col span={23}>
                    <Table
                        dataSource={category}
                        pagination={false}
                        loading={loading}
                        bordered
                    >
                        <Column
                            title="ID"
                            dataIndex="id"
                            key="id"
                        />
                        <Column
                            title="Nome"
                            dataIndex="nome"
                            key="nome"
                        />
                        <Column
                            title="Criada em"
                            dataIndex="data_criacao"
                            key="data_criacao"
                            render={dataCriacao => {
                                return new Date(dataCriacao).toLocaleString();
                            }}
                        />
                    </Table>
                </Col>
            </Row>
        </Content>
    )
}

export default CategoryListPage;