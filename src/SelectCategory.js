import React from 'react';
class SelectCategory extends React.Component {

    state = { value: null };

    handleChange=(event)=> {
    this.setState({ value: event.target.value });
    this.props.submitHendler(event.target.value)
}

handleSubmit=(event)=> {
    event.preventDefault();
    this.props.submitHendler(this.state.value)
}

render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <label>
                <h3 style={{color: "white"}}>Select event by category:
                <select style={{marginLeft: '3px'}} value={this.state.value} onChange={this.handleChange}>
                    <option selected disabled>-Select Category-</option>
                    <option value={null}>All</option>
                    {this.props.categories.map(category=>{
                        return <option value={category.id}> {category.name} </option>
                    })}
                </select> </h3>
            </label>
        </form>
    );
}
}
export default SelectCategory;
