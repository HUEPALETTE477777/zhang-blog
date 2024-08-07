import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AdminTabs from './adminTabs'
import { useSelector } from 'react-redux'

const adminLayout = () => {
    const {user} = useSelector((state) => state.auth)
    if (user?.role !== 'admin' || !user) {
        return <Navigate to="/login" />
    }
  return (
    <div className="flex flex-col mx-auto container md:flex-row gap-4 items-start justify-start mt-5">
        <div className="lg:w-1/5 sm:2/5 w-full">
            <AdminTabs />
        </div>
        <div className="w-full bg-white p-8">
            <Outlet />
        </div>
    </div>
  )
}

export default adminLayout