import React from 'react';
import styled from 'styled-components';
import CommitDetails  from '../components/CommitDetails';

const Heading = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #db7093;
  margin: 20 auto;

`;

const Details = ({ id }) => {
  const pageTitle = 'GitHub Commit Details';
  return (
    <>
      <Heading dangerouslySetInnerHTML={{__html: pageTitle}} />
      <CommitDetails commit={id} /> 
    </>
  )
}

Details.getInitialProps = async ({ query }) => {
  const {id} = query
  return {id}
}

export default  Details;