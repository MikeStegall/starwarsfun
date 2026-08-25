import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const fetchResource = async (url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data.name || data.title || url
  } catch {
    return url
  }
}

const Card = (props) => {
  const {
    name,
    height,
    mass,
    gender,
    birth_year,
    hair_color,
    skin_color,
    eye_color,
    homeworld,
    films,
    species,
    vehicles,
    starships,
    created,
    edited,
    url,
  } = props

  const [homeworldName, setHomeworldName] = useState('')
  const [filmTitles, setFilmTitles] = useState([])
  const [speciesNames, setSpeciesNames] = useState([])
  const [vehicleNames, setVehicleNames] = useState([])
  const [starshipNames, setStarshipNames] = useState([])

  useEffect(() => {
    if (homeworld) {
      fetchResource(homeworld).then(setHomeworldName)
    }
    if (Array.isArray(films)) {
      Promise.all(films.map(fetchResource)).then(setFilmTitles)
    }
    if (Array.isArray(species)) {
      Promise.all(species.map(fetchResource)).then(setSpeciesNames)
    }
    if (Array.isArray(vehicles)) {
      Promise.all(vehicles.map(fetchResource)).then(setVehicleNames)
    }
    if (Array.isArray(starships)) {
      Promise.all(starships.map(fetchResource)).then(setStarshipNames)
    }
  }, [homeworld, films, species, vehicles, starships])

  const displayArray = (arr, label) =>
    Array.isArray(arr) && arr.length > 0 ? (
      <div>
        <strong>{label}:</strong>
        <ul>
          {arr.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    ) : null

  const id = url ? url.replace(/\/$/, '').split('/').pop() : null

  return (
    <Link
      to={id ? `/person/${id}` : '/'}
      style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='person-card'>
        <h2>{name}</h2>
        <p>
          <strong>Height:</strong> {height}cm
        </p>
        <p>
          <strong>Mass:</strong> {mass}kg
        </p>
        <p>
          <strong>Gender:</strong> {gender === 'n/a' ? 'droid' : gender}
        </p>
        <p>
          <strong>Birth Year:</strong> {birth_year}
        </p>
        <p>
          <strong>Hair Color:</strong>{' '}
          {hair_color === 'n/a' ? 'droid' : hair_color}
        </p>
        <p>
          <strong>Skin Color:</strong> {skin_color}
        </p>
        <p>
          <strong>Eye Color:</strong> {eye_color}
        </p>
        <p>
          <strong>Homeworld:</strong> {homeworldName || homeworld}
        </p>
        {displayArray(filmTitles, 'Films')}
        {displayArray(speciesNames, 'Species')}
        {displayArray(vehicleNames, 'Vehicles')}
        {displayArray(starshipNames, 'Starships')}
      </div>
    </Link>
  )
}

export default Card
