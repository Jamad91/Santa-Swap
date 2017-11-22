import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createExchange } from 'APP/app/reducers/exchanges'

class CreateExchange extends Component {
  constructor(props) {
    super(props);
    this.state ={
      title: "",
      searchMembers: "",
      dueDate: "",
      members: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    let newState = {};
    newState[evt.target.name] = evt.target.value;
    newState[evt.target.title] = evt.target.value;
    newState[evt.target.dueDate] = evt.target.value;
    newState[evt.target.searchMembers] = evt.target.value;
    this.setState(newState)
  }

  handleSubmit(evt) {
    let newId = Math.floor(Math.random() * 10000) + 1
    for (let i = 0; i < this.props.exchanges.length; i++) {
      if (newId === this.props.exchanges[i].newId) {
        newId = Math.floor(Math.random() * 10000) + 1
        i = -1
      }
    }

    let date = this.state.dueDate.split('/')
    if (date.length === 3 && date[0].length === 2 && typeof(parseInt(date[0])) === 'number' && date[1].length === 2 && typeof(parseInt(date[1])) === 'number' && date[2].length === 2 && typeof(parseInt(date[2])) === 'number' && this.state.title.length > 0)


    {
      evt.preventDefault();

      let newState = {
        id: newId,
        title: this.state.title,
        dueDate: this.state.dueDate,
        members: this.state.members,
        owner_id: this.props.user.id
      }

      this.props.createExchange(newState)
      this.setState({
        title: "",
        searchMembers: "",
        dueDate: "",
        members: []
      })
      // window.location.reload()
    } else {
      alert( `Please enter a valid date format`)
    }
  }

  render() {
    return (
      <div className="content-box" id="plan-form">
        <h1 className="header-font">Plan an Exchange!</h1>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-input">
            <span>What do you want to call it?</span><br />
            <textarea rows="3" cols="20" name="title" value={this.state.title} onChange={this.handleChange} /><br />
            <span>What is the due date?</span><br />
            <textarea onChange={this.handleChange} name="dueDate" value={this.state.dueDate} placeholder="MM/DD/YY"/><br />
            <input type="submit" value="Create" />
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth,
    exchanges: state.exchangeReducer.exchanges
  }
}

export default connect(mapStateToProps, {createExchange})(CreateExchange)
