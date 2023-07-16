import './common/styles/_base.css'
import { HomePage } from '@pages/HomePage/HomePage'
import { UserProfilePage } from '@pages/UserProfilePage/UserProfilePage'
import { UsersSearchPage } from '@pages/UsersSearchPage/UsersSearchPage'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './blocks/layouts/Header/Header'
import { Dispatch } from './data/store/app.store'
import { fetchUsers } from './data/store/users.actions'

export const App: FC = () => {
  const dispatch = useDispatch<Dispatch>()
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    dispatch(fetchUsers()).then(() => setIsLoading(false))
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/users?" element={<HomePage isLoading={isLoading} />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/search" element={<UsersSearchPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}
