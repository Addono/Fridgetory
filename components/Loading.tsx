import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const spinnerIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Loading = ({ center = false, marginTop = false }: { center?: boolean; marginTop?: boolean }) => {
  const style = {
    ...(center && { display: 'grid', placeItems: 'center', width: '100%' }),
    ...(marginTop && { marginTop: '3em' }),
  }

  return (
    <>
      <div style={style}>
        <Spin indicator={spinnerIcon} />
      </div>
    </>
  )
}

export default Loading
