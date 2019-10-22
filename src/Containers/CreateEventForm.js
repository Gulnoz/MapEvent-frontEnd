import React from 'react';
import { Button, Form, Segment, Select } from "semantic-ui-react"

export default class CreateEventForm extends React.Component {
    
    state = {
        name: "",
        image: "",
        url: "",
        address: "",
        date: "",
        start: "",
        end: "",
        categoryId: null
    }



  onChangeSelectHendler = (event) => {
      this.setState({ categoryId: event.target.value });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        fetch('http://localhost:3000/events',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.name,
                    image: this.state.image,
                    url: this.state.url,
                    category_id: this.state.categoryId,
                    user_id: this.props.currentUser.id,
                    address: this.state.address,
                    location_lat: "",
                    location_long: "",
                    date: this.state.date,
                    start: this.state.start,
                    end: this.state.end

                })
            })
            .then(res => res.json())
            .then(console.log)
    }

    
    render() {
        return (
            <>
            <Segment compact color="blue">
                <Form onSubmit={(e) => { console.log(e) }}>

                    <Form.Field>
                        <label>Name:</label>
                        <input name="name" value={this.state.name} onChange={this.handleChange} />

                    </Form.Field>

                    <Form.Field>
                        <label>Image:</label>
                        <input name="image" placeholder="link" value={this.state.image} onChange={this.handleChange} />

                    </Form.Field>

                    <Form.Field>
                        <label>Address:</label>
                        <input name="address" placeholder="Street, City, State, ZipCode" value={this.state.name} onChange={this.handleChange}/>

                    </Form.Field>

                    <Form.Field>
                        <label>Date:</label>
                        <input name="date" placeholder="MM/DD/YYYY" value={this.state.name} onChange={this.handleChange} />

                    </Form.Field>

                    <Form.Field>
                        <label>Start:</label>
                        <input name="start" placeholder="(ex: 20:00)" value={this.state.name} onChange={this.handleChange} />

                    </Form.Field>

                    <Form.Field>
                        <label>End:</label>
                        <input name="end" placeholder="(ex: 22:30)" value={this.state.name} onChange={this.handleChange} />

                    </Form.Field>
                        <Form.Select value={this.state.value} onChange={this.onChangeSelectHendler}>
                        {/* <label>Category:</label> */}
                            {this.props.categories.map(category => {
                                return <option value={category.id}> {category.name} </option>
                            })}
                    </Form.Select>

                    <Button type='submit'>Submit</Button>

                </Form>
            </Segment>
            </>
        )
    }
}
