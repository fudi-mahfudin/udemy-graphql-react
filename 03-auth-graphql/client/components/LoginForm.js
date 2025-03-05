import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import login from '../mutations/login';
import currentUser from '../queries/currentUser';
import { hashHistory } from 'react-router';

export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.data.user && !this.props.data.user){
      hashHistory.push('/dashboard');
    }
  }

  handleSubmit(email, password) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: currentUser }],
      })
      .catch((err) => {
        const errors = err.graphQLErrors.map((error) => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Sign In</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(currentUser)(graphql(login)(LoginForm));
