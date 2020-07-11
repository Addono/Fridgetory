import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const spinnerIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export default () => <Spin indicator={spinnerIcon} />
