import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'

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

const style = {
    position: 'absolute',
}

const Framex = ({ id, left, top, name, content }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { id, left, top, type: ItemTypes.FRAME },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })
    if (isDragging) {
        return <div ref={drag} />
    }
    return (
        <div ref={drag}>
        <Segment style={{ ...style, left, top }}>
            <Header as="h3">{name}</Header>
            {content}
        </Segment>
        </div>
    );
}

export { Framex }
export default Frame