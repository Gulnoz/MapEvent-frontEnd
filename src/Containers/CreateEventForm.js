import React from 'react';
import { Button, Form, Segment, Select } from "semantic-ui-react"

export default class CreateEventForm extends React.Component {
    
    closeWinwdowHendler=()=>{
        this.props.closeWindow()
    }
    
    options = this.props.categories.map(category => {
        return {
            key: category['id'], text: category['name'], value: category['id']
        }
    })
    render() {
        return (
            <Segment compact color="blue">
                <h2 style={{color:'white'}}>Create Event:</h2>
                <Form style={{margin: '0'}}onSubmit={this.props.handleSubmit }>
                    <Form.Field>
                        <input name="name" placeholder="name" value={this.props.createEventFormState.name} onChange={this.props.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <input name="image" placeholder="Image: link" value={this.props.createEventFormState.image} onChange={this.props.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <input name="description" placeholder="description" value={this.props.createEventFormState.description} onChange={this.props.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <input name="address" placeholder="Building Street, City, State" value={this.props.createEventFormState.address} onChange={this.props.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <input name="date" placeholder="Date: MM/DD/YYYY" value={this.props.createEventFormState.date} onChange={this.props.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <input name="start" placeholder="Start-time: 20:00" value={this.props.createEventFormState.start} onChange={this.props.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <input name="end" placeholder="End-time: 22:30" value={this.props.createEventFormState.end} onChange={this.props.handleChange} />
                    </Form.Field>
                     <div style={{ margin: '0' }}><select value={this.props.createEventFormState.value} onChange={this.props.onChangeSelectHendler}>
                        <option value={null}> Select Category: </option>
                            {this.props.categories.map(category => {
                                return <option value={category.id}> {category.name} </option>
                            })}
                           </select>
                           </div>
                    <div style={{display:'flex', flexDirection: 'row'}}>
                        <Button type='submit' onClick={this.props.closeWindow}>Cancel</Button>
                        <Button type='submit'>Submit</Button></div>
                     </Form>
            </Segment>
          )}
}

