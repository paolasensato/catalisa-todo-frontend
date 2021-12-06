import {
    Button, Card,
    Col, Form, Layout, Row,
    Typography, Modal
} from 'antd';
import { useCallback, useState } from 'react';
import axios from 'axios';

import InputText from '../components/InputText';
import { validateTitulo } from '../helpers/validation-helper';


const { Content } = Layout;
const { Title } = Typography;


const TaskCreatePage = () => {
    const [formValues, setFormValues] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSubscription = useCallback(async () => {
        try {
            setLoading(true);

            const { titulo, concluida } = formValues;

            if (!titulo || !concluida) return;

            const body = {
                titulo: titulo,
            }
            await axios.post('/tarefas', body);
            Modal.success({
                title: 'Tarefa cadastrada.',
            })
        } catch (error) {
            console.warn(error);
            const { response } = error;
            if (response?.status === 400) {
                Modal.error({
                    title: response.data.mensagem
                });
            } else {
                Modal.error({
                    title: 'Não foi possível cadastrar, tente novamente mais tarde.'
                })
            }
        } finally {
            setLoading(false);
        }
    }, [formValues]);

    const handleInputChange = useCallback((event) => {
        const { titulo, value } = event.target;

        setFormValues({
            ...formValues,
            [titulo]: value,
        })
    }, [formValues]);

    return (
        <Content>
            <Row
                justify="center"
            >
                <Col xs={24} sl={14} md={12} lg={10} xl={8}>
                    <Card style={{ margin: 24 }}>
                        <Title
                            level={3}
                            type="primary"
                            style={{ textAlign: 'center', marginTop: 8 }}
                        >
                            Cadastrar tarefa
                        </Title>
                        <Form layout="vertical">
                            <InputText
                                name="titulo"
                                label="Titulo"
                                size="large"
                                onChange={handleInputChange}
                                validate={validateTitulo}
                                disabled={loading}
                                required
                            />
                            <Button
                                block
                                type="primary"
                                size="large"
                                onClick={handleSubscription}
                                loading={loading}
                            >
                                Cadastrar
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
}

export default TaskCreatePage;