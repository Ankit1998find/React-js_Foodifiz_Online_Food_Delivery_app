import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
    const menuItems = ['Upload Menu', 'Manage Menu', 'Current Order', 'Old Order', 'Customer Reviews'];
  return (
    <Link to="/associate">
    <div className="sidebar">
      <ul className="menu-list">
        {menuItems.map((menu, index) => (
          <li
            key={index}
            className={`menu-item ${activeMenu === index ? 'active' : ''}`}
            onClick={() => setActiveMenu(index)}
          >
            {menu}
          </li>
        ))}
      </ul>
    </div>
    </Link>
  )
}

export default Sidebar