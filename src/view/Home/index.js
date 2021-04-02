import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import TextBox from '../TextBox/index'
import ContentEditable from 'react-contenteditable'

import { fetchWords } from '../../redux/action/words/list'
import { fetchSearch } from '../../redux/action/words/search'

class Home extends React.Component {
    constructor(props){
        super(props)
        this.contentEditable = React.createRef()

        this.state = {
            word: '',
            html: "Search word here...",
        }
    }

    componentWillMount = () => {
        this.props.fetchWords()
    }

    handleChangeWord = (e) => {
        const { exist } = this.props

        const value = e.target.value
        const split = value.split(" ")
        const last = split[split.length - 1]
        let start = value.indexOf(last)
        let end = parseInt(start) + parseInt(last.length - 1)
        let update = value
        let splitted

        console.log(last)
        if(last !== " " && last.length > 0){
            this.props.fetchSearch(last)
        } else {
            this.props.fetchSearch('reset')
        }

        if(!exist){
            let bold = '<strong>'+last+'</strong>'
            
            // update = '<strong>'+update+'</strong>'
        }

        // update = '<strong>'+value+'</strong>'

        this.setState({ word: value, html: update })

    }

    showValue = (value) => {
        console.log(value)
        return '<strong>'+value+'</strong>'
    }

    render(){
        const { words, wordProgress, suggestions, exist, searchProgress } = this.props
        const { word, html } = this.state

        console.log(suggestions, exist)
        return(
            <div className="home">
                <div className="vh-center">
                    <div style={{width: '50%', paddingBottom: 40}}>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group controlId="word">
                                        <Form.Label className="text-white">Search word here</Form.Label>
                                        <Form.Control as="textarea" rows={5} placeholder="word" onChange={this.handleChangeWord} value={word} autoComplete="off" required ></Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4 className="text-white">Suggested words</h4>
                                <Row>
                                    {
                                        suggestions.length > 0 ?
                                        suggestions.map((item) => 
                                            <Col md={2}>
                                                <p className="text-white">{item}</p>
                                            </Col>
                                        ) : <Col md={2}><p className="text-white">-</p></Col>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    {/* <ContentEditable
                        innerRef={this.contentEditable}
                        html={html} // innerHTML of the editable div
                        disabled={false}       // use true to disable editing
                        onChange={this.handleChangeWord} // handle innerHTML change
                        tagName='article' // Use a custom HTML tag (uses a div by default)
                    /> */}
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