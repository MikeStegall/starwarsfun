import React, {Component} from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import './app.css'


class App extends Component {
    constructor () {
        super()
        this.state = {
            people: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://swapi.co/api/people/')
        .then(response => response.json())
        .then(data=> this.setState({people: data.results}))

    }
    onSearchChange = (evt) => {
        this.setState ({searchfield: evt.target.value})

    }
    render() {
        const filteredPeople = this.state.people.filter(people =>{
            return people.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if(this.state.people.length === 0){
            return <h1 className='tc'>Loading</h1>
        }
        else {
            return (
                <div className='tc'>
                    <h1 className='f1'>Star Wars</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList people={filteredPeople}/>
                    </Scroll>
                </div>
            )
        }
    }

}

export default App
