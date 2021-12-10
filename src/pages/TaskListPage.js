import { useCallback, useEffect, useState } from "react";
import { Layout, Row, Col, Table, Modal, Button} from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import axios from "axios";
const { Content} = Layout;

const { Column } = Table;

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const requestTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/tarefas')
            console.log(response.data)
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

    const completeTask = async (taskId) => {
        // console.log('clicou', taskId);
        try {
            setLoading(true);
            await axios.put('/tarefas/' + taskId + '/conclusao')
            await requestTasks();
        } catch (error) {
            console.warn(error);
            Modal.error({
                title: "Não foi possível concluir a tarefa, tente novamente mais tarde."
            })

        } finally {
            setLoading(false);
        }
    };
    const renderCompleteTask = (concluida, task) => {
        return (
            <Button
                onClick={() => {
                    completeTask(task.id);
                }}
            >
                {concluida ? '✅' : '❌'}
            </Button>
        );
    };

    const renderCategoria = useCallback(categoria => {
        return categoria?.nome
    }, [])

    const deleteTask = async (taskId) => {
        try {
            setLoading(true);
            await axios.delete('/tarefas/' + taskId)
            await requestTasks();
        } catch (error) {
            console.warn(error);
            Modal.error({
                title: "Não foi possível deletar a tarefa, tente novamente mais tarde."
            })
        } finally {
            setLoading(false);
        }
    };
    const renderDeleteTask = (deletar, task) => {
        return (
            <Button
                onClick={() => {
                    deleteTask(task.id);
                }}
            >
                <DeleteOutlined  />
            </Button>
        )
    }


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
                            title="Categoria"
                            dataIndex="categoria"
                            key="categoria"
                            render={renderCategoria}
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
                            render={renderCompleteTask}
                        />
                        <Column
                            title="Deletar"
                            dataIndex="deletar"
                            key="deletar"
                            render={renderDeleteTask}
                        />
                    </Table>
                </Col>

            </Row>
        </Content>
    );
}

export default TaskListPage;
