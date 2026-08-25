import React from 'react'
import Card from './Card';


const CardList = ({people}) => {
    const cardComponent = people.map((user, idx) => {
      console.log(user, idx)
      return <Card key={idx} {...user} />
    })
    return <div className='card-list'>{cardComponent}</div>
}

export default CardList
