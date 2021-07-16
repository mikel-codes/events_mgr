import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    state = {
        error: null,
        info: ""
    }
    static getDerivedStateFromError(error) {
        return { error: error }
    }

    componentDidCatch(error, info) {
        this.setState({ error: error, info: info })
    }

    render() {
        const { info, error } = this.state
        return error ? <div className="container" style={{ color: "black" }}>
            <div className="column">
                <header>
                    <h1>Error Occured while loading this page</h1>
                </header>
                <button
                    className="errorbtn"
                    onClick={() => window.location.reload()}
                >
                    Reload!
            </button>
                <p>{error && error.message}</p>
                <details>
                    <summary>Click for more details</summary>
                    {info && info.componentStack.toString()}
                </details>
            </div>
        </div>
            : <React.Fragment>{this.props.children}</React.Fragment>
    }
}
