import React from 'react'

const Menu = ({menu}) => {
  return (
    <div className='menu'>
        {
            menu.length > 0 ? menu.map(item => (
                <div key={item.id} className='menu-item'>
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <img src={item.img} alt={item.name} className='manu-img'/>
                </div>
            )) : <p>Loading menu...</p>
        }
    </div>
  )
}

export default Menu