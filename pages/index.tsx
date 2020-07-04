import { Col, Divider, PageHeader, Row, Layout } from 'antd'
import Places from '../components/Places'

const Home = () => (
  <Row>
    <Col xs={1} sm={3} md={6} />
    <Col xs={22} sm={18} md={12}>
      <Places />
    </Col>
  </Row>
)

export default Home
