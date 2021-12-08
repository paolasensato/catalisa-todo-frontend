import {
    Layout, Row, Col, Card, Typography, Form, Button, Modal
} from 'antd';
import { useCallback, useState } from 'react';
import axios from 'axios';

import InputText from '../components/InputText';
import { validateCategoria } from '../helpers/validation-helper';

const { Content } = Layout;
const { Title } = Typography;

const CategoryCreatePage = () => {
    const [formValues, setFormValues] = useState('')
    const [loading, setLoading] = useState(false);

    const handleRegistration = useCallback(async () => {
        try {
            setLoading(true);

            const { nome } = formValues;

            if (!nome) return;

            const body = {
                nome: nome,
            }
            await axios.post('/tarefas/categorias', body);
            Modal.success({
                title: 'Categoria cadastrada com sucesso.'
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
    }, [formValues])

    const handleInputChange = useCallback((event) => {
        const { value } = event.target;

        setFormValues({
            ...formValues,
            nome: value,
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
                            Cadastrar Categoria
                        </Title>
                        <Form layout="vertical">
                            <InputText
                                name="nome"
                                label="Nome"
                                size="large"
                                onChange={handleInputChange}
                                validate={validateCategoria}
                                disabled={loading}
                                required
                            />
                            <Button
                                block
                                type="primary"
                                size="large"
                                onClick={handleRegistration}
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

export default CategoryCreatePage;