import type { NextPage } from 'next'
import Head from 'next/head'
import '../styles/Home.module.css'
import ArticleList from './components/articles-list'

import React, { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const [articles, setArticlesData]: any = useState(null) // Articles storing
  // const [categories, filterCategoriesData]: any = useState(null)


  // useEffect to call the API once mounted and set the data
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((articles) => {
        setArticlesData(articles.props.pageProps.posts)

        // var filteredCateg = articles.props.pageProps.posts.reduce((unique: any, o: any) => {
        //   if (!unique.some((obj: any) => obj.categories.nodes[0].name === o.categories.nodes[0].name && obj.categories.nodes[0].uri === o.categories.nodes[0].uri)) {
        //     unique.push(o);
        //   }
        //   return unique;
        // }, []);

        // filterCategoriesData(filteredCateg)

      })
  }, []);

  return (
    <div>
      {articles && <ArticleList articles={articles} />}
    </div>
  )
}

export default Home
