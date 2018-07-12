import React from 'react'
import Card from './Card';


const CardList = ({people}) => {
    const cardComponent = people.map((user, idx) => {
      console.log(user, idx)
        return <Card key={idx} name={people[idx].name} height={people[idx].height} gender={people[idx].gender} mass={people[idx].mass}/>
    })
    return (
        <div>
        {cardComponent}
        </div>
    )
}

export default CardList
