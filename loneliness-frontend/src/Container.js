import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { Framex as Frame } from './Frame'
import update from 'immutability-helper'

const styles = {
    width: "100vw",
    height: "100vh",
    border: '1px solid black',
    position: 'relative',
}

const Container = ({ framesObj }) => {
    console.log("framesObj:");
    console.log(framesObj);
    
    const [frames, setFrames] = useState({
        a: { top: 20, left: 80, name: 'Frame 1', content: 'This is a Drag and Drop Test' },
        b: { top: 180, left: 20, name: 'Frame 2', content: 'Drag me too' },
        c: { top: 299, left: 299, name: 'Frame 3', content: 'This will work!'},
    })
    
    //const [frames, setFrames] = useState(framesObj);

    console.log("Frames in container:");
    console.log(frames);

    const [, drop] = useDrop({
        accept: ItemTypes.FRAME,
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)
            moveBox(item.id, left, top)
            return undefined
        },
    })
    const moveBox = (id, left, top) => {
        setFrames(
            update(frames, {
                [id]: {
                    $merge: { left, top },
                },
            }),
        )
    }
    return (
        <div ref={drop} style={styles}>
            {
                Object.keys(frames).map(key => {
                    const { left, top, name, content } = frames[key]
                    return (
                        <Frame
                            key={key}
                            id={key}
                            left={left}
                            top={top}
                            name={name}
                            content={content}
                            //hideSourceOnDrag={hideSourceOnDrag}
                        />
                    )
                })
            }
        </div>
    )
}

export default Container