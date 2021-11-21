import { Col, Form, Layout, Row } from 'antd';

import InputText from '../components/InputText';

const { Content } = Layout;

const SubscriptionPage = () => {
    return (
        <Content>
            <Row justify="center">
                <Col >
                    <Form>
                        <InputText label="Nome" />
                        <InputText label="E-mail" />
                        <InputText label="Senha" type="password" />
                    </Form>
                </Col>
            </Row>
        </Content>
    );
}

export default SubscriptionPage;
