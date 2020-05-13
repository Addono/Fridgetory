import Head from 'next/head'
import Drawer from "../components/drawer";
import {Col, Divider, Row, Space} from "antd";

const Home = () => {
    return (
        <div className="container">
            <Head>
                <title>Fridgetory</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <Row>
                    <Col xs={1} sm={3} md={6}/>
                    <Col xs={22} sm={18} md={12}>
                        <Space direction="vertical" style={{width: "100%"}}>
                            {[1, 2, 3, 4, 5, 6, 7].map(drawerNumber => (
                                <Drawer key={drawerNumber} title={`Drawer ${drawerNumber}`}/>
                            ))}
                        </Space>
                    </Col>
                </Row>
            </main>

            <footer>
                <Divider>
                    <a
                        href={"https://aknapen.nl"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{color: "grey"}}
                    >
                        2020&nbsp;©&nbsp;Adriaan Knapen
                    </a>
                </Divider>
            </footer>
        </div>
    )
}

export default Home
