import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUser from '../queries/currentUser';
import { Link } from 'react-router';
import logout from '../mutations/logout';

export class Header extends Component {
  handleLogout() {
    this.props.mutate({
      refetchQueries: [{ query: currentUser }],
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }

    if (user) {
      return (
        <li>
          <a onClick={this.handleLogout.bind(this)}>LOG OUT</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">SIGN UP</Link>
          </li>
          <li>
            <Link to="/signin">SIGN IN</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logout)(graphql(currentUser)(Header));
