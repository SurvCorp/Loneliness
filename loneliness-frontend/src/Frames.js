import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

class Frame extends React.Component {
    render() {
        return (
            <Segment style={{position: "absolute", left: this.props.x + "px", top: this.props.y + "px"}}>
                <Header as="h3">{this.props.name}</Header>
                {this.props.content}
            </Segment>
        );
    }
}

export default Frame;