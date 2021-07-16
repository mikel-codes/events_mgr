import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ValidationErrors } from './ValidationErrors'
import { GetMessages } from './GetMessages'

export default class ValidatedForm extends Component {
    static propTypes = {
        cancelText: PropTypes.string,
        submitText: PropTypes.string,
        submitCallback: PropTypes.func.isRequired,
        cancelCallback: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {
            validationErrors: {}
        }
        this.formElements = {}
    }
    handleSubmit = (ev) => {
        ev.preventDefault()
        this.setState(state => {
            const newState = { ...state, validationErrors: {} }
            Object.values(this.formElements).forEach(elem => {
                console.log(elem)
                if (!elem.checkValidity())
                    newState.validationErrors[elem.name] = GetMessages(elem)
            })
            return newState
        }, () => {
            if (Object.keys(this.state.validationErrors).length === 0) {
                const data = Object.assign(...Object.entries(this.formElements).map(e => ({ [e[0]]: e[0] === 'published' ? e[1].checked : e[1].value })))
                console.log("DATA", data)
                this.props.submitCallback(data)
            }
        })
    }

    registerRef = (elem) => {
        if (elem !== null) {
            this.formElements[elem.name] = elem
        }
    }


    renderElement = (modelItem) => {
        const name = modelItem.name || modelItem.label.toLowerCase()
        return <div className="" key={name}>
            <label htmlFor={name}>{modelItem.label}</label>
            <ValidationErrors errors={this.state.validationErrors[name]} />
            <input {...this.props.defaultAttrs} {...modelItem.attrs}
                name={name} ref={this.registerRef} />
        </div>
    }
    render() {
        return (
            <React.Fragment>
                <form>
                    <h1>Create New Event</h1>
                    <fieldset>
                        <legend><span className="number">1</span>Event Info</legend>
                        {this.props.formModel.map(m => this.renderElement(m))}
                        <div className="btn group" style={{ width: "100%", margin: "0px 1px auto", flexGrow: "2", flexDirection: "row" }}>
                            <button className="btn cancel" onClick={this.props.cancelCallback}>{this.props.cancelText ||
                                "Cancel"}</button>
                            <button className="btn submit" onClick={this.handleSubmit}>{this.props.submitText || "Submit"}</button>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}
