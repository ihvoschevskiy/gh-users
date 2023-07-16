import './Loading.css'
import React, { FC } from 'react'
import DotLoader from 'react-spinners/DotLoader'

export const Loading: FC = () => {
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1000)
  }, [loading])

  return (
    <div className="container">
      <section className="loading">
        <DotLoader color="#ff5533" loading={loading} speedMultiplier={0.8} />
      </section>
    </div>
  )
}
