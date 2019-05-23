import React from 'react';
import axios from 'axios';
import Idea from './Idea';
import update from 'immutability-helper';
import IdeaForm from './IdeaForm';

export default class IdeasContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ideas: [],
            dataLoaded: false,
            editingIdeaId: null,
            notification: ''
        }
    }

    addNewIdea = () => {
        axios.post('http://localhost:3001/api/v1/ideas', {idea: {title: '', body: ''}})
            .then(response => {
                const ideas = update(this.state.ideas, { $splice: [[0, 0, response.data]]})
                this.setState({ideas: ideas, editingIdeaId: response.data.id})
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/ideas.json')
        .then(response => {
            this.setState({ideas: response.data, dataLoaded:true})
        })
        .catch(error => console.log(error));
    }

    updateIdea = (idea) => {
        const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id);
        const ideas = update(this.state.ideas, {[ideaIndex]: {$set: idea}})
        this.setState({ ideas: ideas, notification: 'All data saved!'})
    }

    resetNotification = () => {
        this.setState({notification: ''})
    }

    editIdea = (id) => {
        this.setState({editingIdeaId: id}, () => {this.title.focus()})
    }

    deleteIdea = (id) => {
        axios.delete(`http://localhost:3001/api/v1/ideas/${id}`)
            .then(response => {
                const ideaIndex = this.state.ideas.findIndex(x => x.id === id);
                const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]] })
                this.setState({ ideas: ideas})
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className='ideasContainer'>
                <div>
                    <button className='newIdeaButton' onClick={this.addNewIdea}>New Idea</button>
                    <span className='notification'>{this.state.notification}</span>
                </div>

                {this.state.ideas.map((idea) => {
                    if(this.state.editingIdeaId === idea.id) {
                        return (
                            <IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea} resetNotification={this.resetNotification}
                            titleRef={input => this.title = input} />
                        )
                    } else {
                        return (
                            <Idea key={idea.id} idea={idea} handleClick={this.editIdea} handleDelete={this.deleteIdea} />
                        )
                    }
                })}
            </div>
        );
    }
}

