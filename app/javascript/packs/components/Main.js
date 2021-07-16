import React, { Component } from 'react'
import Axios from 'axios'

//Components
import { Events } from './Events'
import { Header } from './Header'
import { Display } from './Display'
import { withRouter, Route, Switch } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import EventForm from './EventForm'

class Main extends Component {
    state = {
        events: [],
        isLoading: true,
        stop: false,
        eventId: null
    }
    static getDerivedStateFromProps(props, state) {
        let i = props.location.pathname.split("/")
        let v = i[i.length - 1]
        state.eventId = v
        return state
    }
    componentDidMount() {
        Axios.get('/api/events').then(res => {
            this.setState({ events: res.data })
            this.setState({ isLoading: false })
        }).catch(err => {
            console.error("we could not fetch results", err.message)
            this.stopLoading()
        })
    }

    stopLoading = () => setTimeout(this.setState({ stop: true }), 2000);

    render() {
        const { events, isLoading, stop, eventId } = this.state
        return (
            <ErrorBoundary>
                <div className="container" >
                    <Header />
                    <div className="main clearfix"></div>
                    <div className="column">
                        <Events events={events} loading={isLoading} activeId={eventId} />
                    </div>

                    <Switch>
                        <Route path="/events/new" exact>
                            <div className="column">
                                <EventForm />
                            </div>
                        </Route>

                        <Route path="/events/:id" exact>
                            <div className="column">
                                <Display events={events}
                                />
                            </div>
                        </Route>
                    </Switch>
                    <div className="column"></div>
                </div>

            </ErrorBoundary >
        )
    }
}

export default withRouter(Main)