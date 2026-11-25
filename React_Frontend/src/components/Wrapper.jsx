import React from 'react'
import { Link } from 'react-router-dom'

const Wrapper = ({ token, handleLogout, children }) => {

  const logout = () => {
    handleLogout()
  }

  return (
    <div className="app-shell">

      <div className="navbar">
        <h2 className="brand">BUS TRAVEL BOOKINGS</h2>

        {token ? (

          <button onClick={logout}>Logout</button>

        ) :
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
          </>
        }
      </div>
      <main className="main-content">{children}</main>
    </div>
  )
}

export default Wrapper
