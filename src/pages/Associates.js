import React from 'react'

import  { useState } from 'react';

import Sidebar from './Sidebar';

import Content from './Content';

import './Associates.css';

const Associates = () => {

const [activeMenu, setActiveMenu] = useState(0);

  return (
    <>
    <section className='associate-section'>
    <div className="container-fluid side-container">
        <div className="row">
            <div className="col-md-4">
             <div className='menu-sidebar'>
             <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
             </div>
            </div>

            <div className='col-md-6'>
            <Content activeMenu={activeMenu} />
            </div>
        </div>
    </div>

    </section>
    </>
  )
}

export default Associates