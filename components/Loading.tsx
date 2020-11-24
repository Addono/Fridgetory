import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const spinnerIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Loading = ({
  center = false,
  marginTop = false,
  extra,
}: {
  center?: boolean
  marginTop?: boolean
  extra?: JSX.Element
}) => {
  const style = {
    ...(center && { display: 'grid', placeItems: 'center', width: '100%' }),
    ...(marginTop && { marginTop: '3em' }),
  }

  return (
    <>
      <div style={style}>
        <Spin indicator={spinnerIcon} />
        {extra}
      </div>
    </>
  )
}

export default Loading
