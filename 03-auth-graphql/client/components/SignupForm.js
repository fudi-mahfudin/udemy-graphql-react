import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import signup from '../mutations/signup';
import currentUser from '../queries/currentUser';
import { hashHistory } from 'react-router';

export class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
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

  componentWillUpdate(nextProps) {
    if (nextProps.data.user && !this.props.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(currentUser)(graphql(signup)(SignupForm));
