import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../containers/app.css'

const fetchResource = async (url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data.name || data.title || url
  } catch (err) {
    return url
  }
}

const PersonPage = () => {
  const { id } = useParams()
  const [person, setPerson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`https://swapi.info/api/people/${id}`)
      .then((res) => res.json())
      .then(async (data) => {
        try {
          // For any string URL or array of URLs, fetch the resource name/title
          const processed = { ...data }
          const entries = Object.entries(data)
          for (const [key, value] of entries) {
            if (typeof value === 'string' && value.startsWith('http')) {
              processed[key] = await fetchResource(value)
            } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string' && value[0].startsWith('http')) {
              processed[key] = await Promise.all(value.map(fetchResource))
            }
          }
          setPerson(processed)
        } catch (e) {
          // fallback to raw data on any processing error
          setPerson(data)
        }
        setLoading(false)
      })
      .catch((err) => {
        setError(String(err))
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className='tc'><h2>Loading person...</h2></div>
  if (error) return <div className='tc'><h2>Error</h2><pre>{error}</pre></div>
  if (!person) return <div className='tc'><h2>No data</h2></div>

  const entries = Object.entries(person)

  const prettyKey = (k) => k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <div className='pa4'>
      <div className='tc header'>
        <h1 className='f2'>{person.name}</h1>
        <p><Link to='/' className='back'>← Back</Link></p>
      </div>

      <div className='person-detail'>
        <div className='grid-two'>
          <div>
            <h3>Overview</h3>
            <p><strong>Height:</strong> {person.height} cm</p>
            <p><strong>Mass:</strong> {person.mass} kg</p>
            <p><strong>Gender:</strong> {person.gender}</p>
            <p><strong>Birth Year:</strong> {person.birth_year}</p>
            <p><strong>Homeworld:</strong> {person.homeworld}</p>
          </div>

          <div>
            <h3>Attributes</h3>
            <p><strong>Hair:</strong> {person.hair_color}</p>
            <p><strong>Skin:</strong> {person.skin_color}</p>
            <p><strong>Eyes:</strong> {person.eye_color}</p>

          </div>
        </div>

        <div style={{marginTop: '1rem'}}>
          {entries.map(([key, value]) => {
            if (['name','height','mass','gender','birth_year','hair_color','skin_color','eye_color','homeworld','created','edited','url'].includes(key)) return null
            return (
              <div key={key} className='mb2'>
                <strong>{prettyKey(key)}:</strong>
                {Array.isArray(value) ? (
                  <ul>
                    {value.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                ) : (
                  <span> {String(value)}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PersonPage
