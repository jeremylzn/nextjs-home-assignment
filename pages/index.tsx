import type { NextPage } from 'next'
import Head from 'next/head'

import React, { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const [articles, setArticlesData]: any = useState({})

  // useEffect to call the API once mounted and set the data
  useEffect(() => {
    fetch('/api/data', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((articles) => {
        setArticlesData(articles)
      })
  }, []);

  return (
    <div>
    </div>
  )
}

export default Home
