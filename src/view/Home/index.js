import React from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'

import { fetchWords } from '../../redux/action/words/list'
import { fetchSearch } from '../../redux/action/words/search'

class Home extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            word: '',
            wordArray: []
        }
    }

    componentWillMount = () => {
        this.props.fetchWords()
    }

    handleChangeWord = (e) => {
        const value = e.target.value
        let split = value.split(" ")
        let last = split[split.length - 1]

        this.setState({ word: value, wordArray: split })

        if(last !== " " && last.length > 0){
            this.props.fetchSearch(last)
        } else {
            this.props.fetchSearch('reset')
        }
    }

    render(){
        const { words, wordProgress, suggestions, exist, searchProgress } = this.props
        const { word, wordArray } = this.state

        // console.log(suggestions, exist)
        return(
            <div className="home">
                <div className="vh-center">
                    <Form>
                        <Form.Group controlId="word">
                            <Form.Label className="text-white">Search word here</Form.Label>
                            <Form.Control as="textarea" rows={5} placeholder="word" onChange={this.handleChangeWord} value={word} autoComplete="off" required></Form.Control>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        words: state.wordStore.words,
        wordProgress: state.wordStore.inProgress,

        suggestions: state.searchStore.suggestions,
        exist: state.searchStore.exist,
        searchProgress: state.searchStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchWords, fetchSearch})(Home)