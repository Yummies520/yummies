import React from 'react'

const HomePage = () => {

    const handleMenuPageRoute = (e) => {
        e.preventDefault();
        window.location.href = '/MenuListPage'
    }

    const handleAdminRoute = (e) => {
        e.preventDefault();
        window.location.href = '/AdminPage'
    }

    const handleRecordRoute = (e) => {
        e.preventDefault();
        window.location.href = '/Records'
    }


  return (
    <div className='HomePage'>
        <button onClick={handleMenuPageRoute}>Menu Page</button>
        <button onClick={handleAdminRoute}>Admin Pannel</button>
        <button onClick={handleRecordRoute}>Records</button>
    </div>
  )
}

export default HomePage