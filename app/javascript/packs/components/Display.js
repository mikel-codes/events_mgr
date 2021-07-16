import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Ideas from 'ideas.svg'
export const Display = (props) => {
    const [event, setEvent] = useState(null)
    let { params: { id } } = useRouteMatch("/events/:id")

    useEffect(() => {
        if (props.events.length > 0 && id !== undefined) {
            let updatedEvent = props.events.find(e => e.id === Number(id))
            setEvent(updatedEvent)
        }
    }, [props.events, id])
    if (event === null || event === undefined) {
        return <div className="block" style={{ backgroundColor: "burlywood" }}>
            <h1>No Event selected</h1></div>

    }
    else {
        const { event_type, speaker, title, host, event_date, published } = event
        return (
            <div className="block">
                <img src={Ideas} />
                <ul style={{ listStyle: "none" }}>
                    <li><em>Speaker:- </em>{speaker}</li>
                    <li><em>Type:- </em>{event_type}</li>
                    <li><em>Date:- </em>{event_date}</li>
                    <li><em>Title:- </em>{title}</li>
                    <li><em>Host:- </em>{host}</li>
                    <li>Published:- {published === true ? "yes" : "no"}</li>
                </ul>
                <br />
                <button className="btn first" onClick={(id) => props.delete}>
                    Delete Event &times;
                </button>
            </div>
        )
    }
}

