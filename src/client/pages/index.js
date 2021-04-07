import React, { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import config from '../common/config';
import styled from 'styled-components';
import memoize from 'memoize-one';
import { useRouter } from 'next/router';

const pageTitle = 'GitHub Commits';

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
  margin-right: 10px;
`;

createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

const customStyles = {
  headCells: {
    style: {
      paddingLeft: '8px', 
      paddingRight: '8px',
      fontSize: '24px',
      fontWeight: 800,
      width: '100px'
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      width: '100px'
    },
  },
};

const columns = memoize(handleAction => [
  {
    name: 'Auther',
    selector: 'author',
    sortable: true,
  },
  {
    name: 'Message',
    selector: 'message',
    sortable: false,
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
  },
  {
    cell: (row) => <Button data-url={row.url} raised primary onClick={handleAction}>View Details</Button>,
    ignoreRowClick: false,
    allowOverflow: true,
    button: true,
  }
]);

 const Home = () => {
  const [rows, setRows] = useState([]); 
  const router = useRouter();

  useEffect(() => {
      fetch(`https://api.github.com/repos/${config.user}/${config.repo}/commits`, {
        headers: new Headers({
                'Authorization': 'token ' + config.token,
        })
    })
      .then(response =>{ 
        console.log('response');
        console.log(response)
        return response.json();
      })
      .then(data => {
        console.log('data');
        console.log(data);
        const tableRows = [];
        data.forEach(item => {
          tableRows.push({
            author: item.commit.author.name,
            date: item.commit.author.date,
            message: item.commit.message,
            url: item.sha,
          }); 
        });
        setRows(tableRows);
      }).catch(err => console.log(err));    
  }, []);
  const updateState = state => {
    const commitId = state.target.dataset.url;
    router.push(`/details?id=${commitId}`, undefined, { shallow: true });
  }
  return (
    <>
      <Heading dangerouslySetInnerHTML={{__html: pageTitle}} />
      <DataTable
        title=""
        data={rows}
        customStyles={customStyles}
        theme="solarized"
        pagination={true}
        columns={columns(updateState)}
        onSelectedRowsChange={updateState}
      />
    </>
  )
}

export default Home;