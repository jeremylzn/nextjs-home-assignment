import type { NextPage } from 'next'
import Head from 'next/head'
import '../styles/Home.module.css'
import ArticleList from './components/articles-list'
import Spinner from './components/spinner'
import Navbar from './components/navbar'

import React, { useState, useEffect } from 'react';
import { scrappingData } from './api/data'

const Home: NextPage = (props:any) => {
  const [articles, setArticlesData]: any = useState(null) // Articles storing
  const [categories, filterCategoriesData]: any = useState(null) // Unique categories storing

  // useEffect to call the API once mounted and set the data
  useEffect(() => {
    setArticlesData(props.articles.props.pageProps.posts)
    // filter categories for to get eahc unique categories
    var filteredCateg = props.articles.props.pageProps.posts.reduce((unique: any, o: any) => {
      if (!unique.some((obj: any) => obj.categories.nodes[0].name === o.categories.nodes[0].name && obj.categories.nodes[0].uri === o.categories.nodes[0].uri)) {
        unique.push(o);
      }
      return unique;
    }, []);
    filterCategoriesData(filteredCateg)
  }, []);

  var articlesProps = { // make sure all required component's inputs/Props keys&types match
    articles: articles
  }

  const categProps = { // make sure all required component's inputs/Props keys&types match
    categories: categories
  }

  // Catch data from the child component (navbar) and renew articles
  const handleCallback = (childData: any) => {
    setArticlesData(childData)
  }

  const changeArticles = { // make sure all required component's inputs/Props keys&types match
    changeArticles: handleCallback
  }

  return (
    <div>
      {categories && <Navbar {...categProps} {...changeArticles} />}
      {articles ? articles && <ArticleList {...articlesProps} /> : <Spinner />}
    </div>
  )
}

// const getDataFromTheWebsite = async () => {
//   const res =  await fetch('http://localhost:3000/api/data', {method: 'POST', body: JSON.stringify({ url: '/' }), headers: { 'Content-Type': 'application/json' }})
//   return await res.json()
// }

const getDataFromTheWebsite = async () => {
  const response = await fetch(`https://populareverything.com/`)
  const data = await scrappingData(response)
  return JSON.parse(data)
}

export async function getStaticProps() {
  const data = await getDataFromTheWebsite()
  return {
    props: {articles: data},
    // we will attempt to re-generate the page:
    // - at most once every 30 second
    revalidate: 30
  }
}

export default Home
