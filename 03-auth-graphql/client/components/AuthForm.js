import React, { Component } from 'react';

export class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    this.props.onSubmit(email, password);
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit.bind(this)} className="col s4">
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>

          <div className="errors">
            {this.props.errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
