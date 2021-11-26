import { useEffect, useState } from "react";
import { Layout, Row, Col, Table, Modal } from "antd";
import axios from "axios";
const { Content } = Layout;

const { Column } = Table;

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const requestTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/tarefas')
            setTasks(response.data);
        } catch (error) {
            console.warn(error);
            Modal.error({
                title: "Não foi possível carregar suas tarefas, tente novamente mais tarde."
            })

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        requestTasks();
    }, []);
    return (
        <Content>
            <Row gutter={[24, 24]} justify="center">
                <Col span={23}>
                    <Table
                        dataSource={tasks}
                        pagination={false}
                        loading={loading}
                        bordered>
                        <Column
                            title="ID"
                            dataIndex="id"
                            key="id"
                        />
                        <Column
                            title="Titulo"
                            dataIndex="titulo"
                            key="titulo"
                        />
                        <Column
                            title="Criada em"
                            dataIndex="data_criacao"
                            key="data_criacao"
                            render={dataCriacao => {
                                return new Date(dataCriacao).toLocaleString();
                            }}
                        />
                        <Column
                            title="Concluída"
                            dataIndex="concluida"
                            key="concluida"
                            render={concluida => {
                                return concluida ? '✅' : '❌';
                            }}
                        />


                    </Table>
                </Col>

            </Row>
        </Content>
    );
}

export default TaskListPage;
