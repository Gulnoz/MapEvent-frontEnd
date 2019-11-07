import React from 'react';
import { Button, Form, Segment, Select } from "semantic-ui-react"

export default class CreateEventForm extends React.Component {
    
   




// onChangeSelectHendler = (event) => {
//     console.log(event)
//     this.setState({ value: event.target.value});
//     }

//     handleChange = event => {
//         this.setState({
//             [event.target.name]: event.target.value
//         });
//     }


    options = this.props.categories.map(category => {
        return {
            key: category['id'], text: category['name'], value: category['id']
        }
    })
    render() {
        // console.log(this.state.value)
        return (
            <Segment compact color="blue">
                <h2 style={{color:'white'}}>Create Event:</h2>
                {/* <Button type='submit' onClick={this.props.createEventHendler}>Go Back:</Button> */}
                <Form style={{margin: '0'}}onSubmit={this.props.handleSubmit }>

                    <Form.Field>
                        {/* <label>Name:</label> */}
                        <input name="name" placeholder="name" value={this.props.createEventFormState.name} onChange={this.props.handleChange} />

                    </Form.Field>

                    <Form.Field>
                        {/* <label>Image:</label> */}
                        <input name="image" placeholder="Image: link" value={this.props.createEventFormState.image} onChange={this.props.handleChange} />

                    </Form.Field>
                    <Form.Field>
                        {/* <label>Image:</label> */}
                        <input name="description" placeholder="description" value={this.props.createEventFormState.description} onChange={this.props.handleChange} />

                    </Form.Field>
                    <Form.Field>
                        {/* <label>Address:</label> */}
                        <input name="address" placeholder="Building Street, City, State" value={this.props.createEventFormState.address} onChange={this.props.handleChange}/>

                    </Form.Field>

                    <Form.Field>
                        {/* <label>Date:</label> */}
                        <input name="date" placeholder="Date: MM/DD/YYYY" value={this.props.createEventFormState.date} onChange={this.props.handleChange} />

                    </Form.Field>

                    <Form.Field>
                        {/* <label>Start:</label> */}
                        <input name="start" placeholder="Start-time: 20:00" value={this.props.createEventFormState.start} onChange={this.props.handleChange} />

                    </Form.Field>

                    <Form.Field>
                        {/* <label>End:</label> */}
                        <input name="end" placeholder="End-time: 22:30" value={this.props.createEventFormState.end} onChange={this.props.handleChange} />

                    </Form.Field>
                    {/* <Form.Field fluid control={Select} value={this.state.value} placeholder='Select Category' options={this.options} onChange={e => this.onChangeSelectHendler(e)} /> */}
                    {/* <Form.Select placeholder='Select your country' options={this.options} onChange={e=>this.onChangeSelectHendler(e)}/> */} 
                    <div style={{ margin: '0' }}><select value={this.props.createEventFormState.value} onChange={this.props.onChangeSelectHendler}>
                        <option value={null}> Select Category: </option>
                            {this.props.categories.map(category => {
                                return <option value={category.id}> {category.name} </option>
                            })}
                           </select>
                           </div>

                    <Button type='submit'>Submit</Button>

                </Form>
                
                    
                        {/* <Button type='submit' onClick={this.props.createEventHendler}>My Events</Button> */}
                       
                
            </Segment>
            
           
        )
    }
}

