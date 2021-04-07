import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../../../styles/Home.module.css'
import styled from 'styled-components';
import DataTable from 'react-data-table-component';

const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};

//const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' },{ id: 1, title: 'Conan the Barbarian', year: '1982' },{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
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
    name: 'URL',
    selector: 'url',
    sortable: false,
  },
];
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export default function Home() {
  const [rows, setRows] = useState([]); 
  useEffect(() => {
      fetch('https://api.github.com/repos/tonyuce/github-react/commits')
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
            url: item.url,
          });
          setRows(tableRows);
        });
      });  
  }, []);
  return (
    <>
      <Title>Done</Title>
      <DataTable
        title=""
        columns={columns}
        data={rows}
        customStyles={customStyles}
      />
    </>
  )
}
