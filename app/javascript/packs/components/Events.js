import React, { Component, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const Events = (props) => {
    const { events, loading, stopp, activeId } = props
    const ev = events.sort((a, b) => new Date(a.event_date) - new Date(b.event_date))

    const reloadComponent = () => window.location.reload(false);

    return loading === false ? ev.length > 0 ?
        <div className="block">
            <h3>Events</h3>
            <span className="add"><Link to="/events/new">Add Event</Link><div class="circle">
                <div class="before"></div>
                <div class="after"></div>
            </div></span>
            <ul className="" style={{ color: "#444" }}>

                {ev.map((e, i) => <li key={i}>

                    <Link to={`/events/${e.id}`} className={e.id === Number(activeId) ? 'active' : 'ee'}>{e.event_type}{"-"}{e.event_date}</Link>
                </li>)
                }

            </ul>
        </div>

        : <hgroup><h1>No Events</h1></hgroup>
        :
        <div className="loader"></div>
}


Event.defaultProps = {
    events: null,
    isLoading: false,
    stopp: false,
    activeId: undefined
}
Event.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired,
    stopp: PropTypes.bool.isRequired,
    displayItem: PropTypes.func,
    activeId: PropTypes.number

}



