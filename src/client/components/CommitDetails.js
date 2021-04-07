import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import config from '../common/config';

const nodataMessage = "There is no details to display";

const ErrorMessage = styled.div`
  padding: 24px;
  text-align:center;
  font-size: 16px;
`;

const Rows = styled.div`
  clear:both;
  float:left;
  padding-top:25px;
`;

const Container = styled.div`
  font-size: 22px;
  color: #268bd2;
  background-color: #002b36;
  min-height: 56px;
  padding-left: 16px;
  padding-right: 8px;
  min-height: 400px;
`;

const CommitDetails = ({ commit }) => {
  const [details, setDetails] = useState({})
  useEffect(() => {
      fetch(`https://api.github.com/repos/${config.user}/${config.repo}/git/commits/${commit}`,  {
        headers: new Headers({
                'Authorization': 'token ' + config.token,
        })
    })
      .then(response =>{ 
        return response.json();
      })
      .then(data => {
        console.log('data');
        console.log(data);
        setDetails(data)
      }).catch(err => console.log(err));  
  }, []);
  return (
    <Container>
      {details.author ? (<>
        <Rows dangerouslySetInnerHTML={{__html: `Author: ${details.author.name}`}} />
        <Rows dangerouslySetInnerHTML={{__html: `Date: ${details.author.date}`}} />
        <Rows dangerouslySetInnerHTML={{__html: `Message: ${details.message}`}} />
        <Rows dangerouslySetInnerHTML={{__html: `Open:  <a target="_blank" href=${details.html_url}>Click</a>`}} />
      </>) : 
        <ErrorMessage dangerouslySetInnerHTML={{__html: nodataMessage}} /> 
      }
    </Container>
  )
}

  export default CommitDetails;