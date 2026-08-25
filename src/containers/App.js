import React, {Component} from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import './app.css'


class App extends Component {
  constructor() {
    super()
    this.state = {
      people: [],
      searchfield: '',
    }
  }

  // Error boundary state
  state = {
    ...this.state,
    hasError: false,
    errorMessage: '',
  }

  componentDidCatch(error, info) {
    console.error('App caught error:', error, info)
    this.setState({ hasError: true, errorMessage: String(error) })
  }

  componentDidMount() {
    fetch('https://swapi.info/api/people')
      .then((response) => response.json())
      .then((data) => {
        console.log('API response:', data)
        this.setState({
          people: Array.isArray(data) ? data : [],
        })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ people: [] })
      })
  }
  onSearchChange = (evt) => {
    this.setState({ searchfield: evt.target.value })
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className='tc'>
          <h1>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorMessage}
          </pre>
        </div>
      )
    }
    console.log('App render - people count:', this.state.people.length)
    const filteredPeople = this.state.people.filter((people) => {
      return people.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase())
    })
    if (this.state.people.length === 0) {
      return <h1 className='tc'>Loading</h1>
    } else {
      return (
        <div className='app-root'>
          <header className='header'>
            <h1 className='f1'>Star Wars</h1>
            <div className='search-wrap'>
              <SearchBox value={this.state.searchfield} searchChange={this.onSearchChange} />
            </div>
          </header>

          <main>
            <Scroll>
              <CardList people={filteredPeople} />
            </Scroll>
          </main>
        </div>
      )
    }
  }
}

export default App
