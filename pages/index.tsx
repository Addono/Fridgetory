import Head from 'next/head'
import {Col, Divider, Row} from "antd";
import Places from "../components/Places";

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
                        <Places />
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
