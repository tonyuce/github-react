import React from 'react';
import styled from 'styled-components';
import CommitDetails  from '../components/CommitDetails';
import { useRouter } from 'next/router';

const pageTitle = 'GitHub Commit Details';
const backText = 'Back';

const Heading = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #db7093;
  margin: 20 auto;
`;

const Button = styled.button`
  background-color:#268bd2;
  color: #ffffff;
  border: 0px;
  outfit:none;
  cursor: pointer;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 3px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Details = ({ id }) => {
  const router = useRouter();
  return (
    <>
      <Heading dangerouslySetInnerHTML={{__html: pageTitle}} />
      <Button onClick={()=>{
        router.push(`/`, undefined, { shallow: true });
      }} dangerouslySetInnerHTML={{__html: backText}} />
      <CommitDetails commit={id} /> 
    </>
  )
}

Details.getInitialProps = async ({ query }) => {
  const {id} = query
  return {id}
}

export default  Details;