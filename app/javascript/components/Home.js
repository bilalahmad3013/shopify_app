import React from 'react'
import Products from './Products';
import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import CustomCollection from './CustomCollection';
import AutomaticCollection from './AutomaticCollection';

export default function Home(props) {
  const { token, shop_origin } = props;

  const [selected, setSelected] = useState(0);
  
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [    
    {
      id: '1',
      component: <Products token={token} shop_origin={shop_origin}/>,
      content: 'Products'      
    },
    {
      id: '2',
      component: <CustomCollection />,   
      content: 'custom-collection'  
    },
    {
      id: '3',
      component: <AutomaticCollection />,  
      content:'automatic-collection'   
    },
  ];



  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>      
       {tabs[selected].component}      
    </Tabs>
  )
}


