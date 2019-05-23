import React from 'react';

class Idea extends React.Component {

    handleDelete = () => { this.props.handleDelete(this.props.idea.id)}
    handleClick = () => {  this.props.handleClick(this.props.idea.id)}
    render() {
    return (
        <div className='tile'>
        <span className='deleteButton' onClick={this.handleDelete}>x</span>
            <h4 onClick={this.handleClick}>{this.props.idea.title}</h4>
            <p onClick={this.handleClick}>{this.props.idea.body}</p>
        </div>
    )}
}

export default Idea;