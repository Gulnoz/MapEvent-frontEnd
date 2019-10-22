import React from 'react';


class SelectByDate extends React.Component {


    state = { value: null };


    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitHendler(this.state.value)


    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Select event by category:
          <select value={this.state.value} onChange={this.handleChange}>
                        <option value={null}>All</option>
                        {this.props.categories.map(category => {
                            return <option value={category.id}> {category.short_name} </option>
                        })}
                        {/* <option value="103">Music</option>
                    <option value="108">Sports & Fitness</option>
                    <option value="102">Science & Tech</option>
                    <option value="115">Family & Education</option>
                    <option value="120">School Activities</option>
                    <option value="199">Other</option> */}
                    </select>
                </label>
                <input type="submit" value="Go!" />
            </form>
        );
    }
}
export default SelectByDate;
