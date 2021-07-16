import React, { Component } from 'react';
import ValidatedForm from './forms/ValidatedForm';
import { withRouter } from 'react-router-dom';
import Axios from 'axios'

class EventForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: null,
            errors: {},
            form_load: false
        }
        //this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.defaultAttrs = { type: "text", required: true };
        this.formModel = [
            { label: "Event Type", name: "event_type", attrs: { value: "hero" } },
            { label: "Event Date", name: "event_date", attrs: { type: "date" } },
            { label: "Speaker" },
            { label: "Title" },
            { label: "Host" },
            { label: "Published", attrs: { type: "checkbox", required: false } }
        ]
    }

    handleSubmit = (data) => {
        this.setState({ form_load: true })
        const token = document.querySelector('meta[name="csrf-token"]').content;
        console.log("token", token)
        Axios.defaults.headers.common['X-CSRF-TOKEN'] = token
        Axios.post("/api/events", data).then(res => {
            if (res.status === 201) {
                alert("event added succcessfully")
                this.props.history.push(`/events/${res.data.id}`)

            }
            else {
                this.setState({ errors: res.data })
                console.log(this.state.errors)
                throw new Error("network error noted")
            }
        }).catch(err => {
            if (err.response)
                console.error("response error", err.message)
            else if (err.request)
                console.error("request error", err)

            else
                console.error("api errors =>", err.message)
        })
        this.setState({ form_load: false })
    }

    handleInputChange = (ev) => {
    }
    handleCancel = (ev) => {
        ev.preventDefault()
        this.props.history.push("/events")
    }
    renderErrors = () => {

        return Object.keys(this.state.errors).length > 0 ? Object.keys(this.state.errors).forEach(e =>
            <h4 style={{ color: "red" }}>e</h4>) : null

    }
    render() {
        const { form_load, errors } = this.state
        return (
            <React.Fragment >
                <h2 style={{ color: "black" }}>Helloo world</h2>

                {Object.keys(errors).length > 0 ?
                    <section style={{ width: "auto", height: "100px" }}>
                        {Object.keys(errors).map((e, i) =>
                            <h6 key={i} style={{ color: "red" }}>{e} -{errors[e]}</h6>)}
                    </section> : null}
                <ValidatedForm formModel={this.formModel}
                    defaultAttrs={this.defaultAttrs}
                    submitCallback={this.handleSubmit}
                    cancelCallback={this.handleCancel}
                />
                {form_load === true ? <div className="form_loader"></div> : null}
            </React.Fragment >
        );


    }
}

EventForm.propTypes = {

};

export default withRouter(EventForm);