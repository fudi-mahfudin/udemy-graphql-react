import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs';

/**
 * * TIPS working with GraphQL
 *  1. Identify data required
 * 2. Write query in Graphiql(for practice) and in component file
 * 3. Bond query + component
 * 4. Access data
 */

function SongList(props) {
  function handleDeleteSong(id) {
    props
      .mutate({
        variables: { id },
      })
      .then(() => props.data.refetch());
  }

  const renderSongs = () => {
    return props.data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i
          className="material-icons"
          onClick={() => handleDeleteSong(id)}
          title="Delete"
        >
          delete
        </i>
      </li>
    ));
  };

  if (!props.data.songs) {
    return <h6>Loading...</h6>;
  }

  return (
    <div>
      <ul className="collection">{renderSongs()}</ul>
      <div>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongs)(SongList));
