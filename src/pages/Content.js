import React from 'react'

import FoodForm from './SubmitMenu';

import ManageMenu from './ManageMenu';

import CurrentOrder from './CurrentOrder';

const Content = ({ activeMenu }) => {

  const content = [
    <FoodForm />,
    <ManageMenu />,
    <CurrentOrder />,
    'Content for Menu 4',
    'Content for Menu 5',
  ];
      return <div className="content">{content[activeMenu]}</div>;
}

export default Content