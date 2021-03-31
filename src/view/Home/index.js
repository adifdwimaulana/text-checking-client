import React from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'

import { fetchWords } from '../../redux/action/words/list'

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

        this.setState({ word: value, wordArray: split })
    }

    render(){
        const { words, wordProgress } = this.props
        const { word, wordArray } = this.state

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
        wordProgress: state.wordStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchWords})(Home)