// @ts-ignore
import Lottie from 'react-lottie'
import animationData from '../../lotties/cat.json'

const ServerErrorAnimatedIcon = () => (
  <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: true,
      },
    }}
  />
)

export default ServerErrorAnimatedIcon
