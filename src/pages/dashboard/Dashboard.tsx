import React from 'react'
import NavbarDesktop from '../../components/layout/NavbarDesktop'
import NavbarMobile from '../../components/layout/NavbarMobile'

const classes = {
    dashboard: 'flex flex-col',
}

const Dashboard = () => {
  return (
    <div className={classes.dashboard}>
        <div className='block lg:hidden'>
            <NavbarMobile />
        </div>
        <div className='hidden lg:block'>
            <NavbarDesktop />
        </div>

    </div>
  )
}

export default Dashboard