import type { NextPage } from 'next'
import Head from 'next/head'
import '../styles/Home.module.css'
import ArticleList from './components/articles-list'
import Spinner from './components/spinner'
import Navbar from './components/navbar'


import React, { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const [articles, setArticlesData]: any = useState(null) // Articles storing
  const [categories, filterCategoriesData]: any = useState(null) // Unique categories storing


  // useEffect to call the API once mounted and set the data
  useEffect(() => {
    fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({url : '/'}),
      headers: { 'Content-Type': 'application/json'}
    }).then((res) => res.json())
      .then((articles) => {
        setArticlesData(articles.props.pageProps.posts)

        // filter categories for to get eahc unique categories
        var filteredCateg = articles.props.pageProps.posts.reduce((unique: any, o: any) => {
          if (!unique.some((obj: any) => obj.categories.nodes[0].name === o.categories.nodes[0].name && obj.categories.nodes[0].uri === o.categories.nodes[0].uri)) {
            unique.push(o);
          }
          return unique;
        }, []);
        console.log(filteredCateg)
        filterCategoriesData(filteredCateg)

      })
  }, []);

  var articlesProps = { // make sure all required component's inputs/Props keys&types match
    articles: articles
  }

  const categProps = { // make sure all required component's inputs/Props keys&types match
    categories: categories
  }

  // Catch data from the child component (navbar) and renew articles
  const handleCallback = (childData:any) =>{
    setArticlesData(childData)
  }

  const changeArticles = { // make sure all required component's inputs/Props keys&types match
    changeArticles: handleCallback
  }

  return (
    <div>
      {categories && <Navbar {...categProps} {...changeArticles}/>}
      {articles ? articles && <ArticleList {...articlesProps}/> :  <Spinner />  }
    </div>
  )
}

export default Home
