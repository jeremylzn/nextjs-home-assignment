import 'bootstrap/dist/css/bootstrap.min.css';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../styles/ArticlesList.module.css'
import React, { Component } from 'react';
import LazyLoad from "react-lazyload";
import Spinner from './spinner'
// import { BrowserRouter, Link, Route, Router, Switch, withRouter } from "react-router-dom";
import Link from 'next/link'



class ArticleList extends Component<any, any> {

  state = {
    allArticles: [],
    filteredArticles: []
  }

  constructor(props: any) {
    super(props);
    this.state = {
      allArticles: props.articles, // get all articles
      filteredArticles: props.articles, // init filtered article with all articles
    };
  }

  // cheking search filter in all articles and set filtered article
  public handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = this.state.allArticles.filter((data: any) => {
      return (data.title.toLowerCase()).search(value) != -1;
    });
    this.setState({ filteredArticles: result });
  }

  // Catch if props is updated and renew articles
  componentDidUpdate(oldProps: any) {
    const newProps = this.props
    if (oldProps.articles !== newProps.articles) {
      this.setState({
        allArticles: this.props.articles, // get all articles
        filteredArticles: this.props.articles, // init filtered article with all articles
      })
    }

  }

  render() {
    return (
      <div className="container">
        <div className="input-group flex-nowrap mt-5 mb-5">
          <span className="input-group-text" id="addon-wrapping">Search</span>
          <input type="text" className="form-control" placeholder="Search ..." onChange={(event) => this.handleSearch(event)} aria-label="Search" aria-describedby="addon-wrapping" />
        </div>

        {this.state.filteredArticles && this.state.filteredArticles.map((el: any, index: number) =>
          <LazyLoad
            key={index}
            height={100}
            offset={[-100, 100]}
            placeholder={<Spinner />}
          >
            <div className="row" key={index}>
              <div className={styles.card + " mb-3"}>
                <div className="row g-0">
                  <div className="col-md-4 m-auto">
                    <img src={el.featuredImage.node.sourceUrl} className="img-fluid rounded-start" alt={el.featuredImage.node.altText} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-center">{el.title}</h5>
                      <div dangerouslySetInnerHTML={{ __html: el.excerpt }}></div>
                        <Link href={"/components/article-view/" + el.uri}><button className="btn btn-outline-danger rounded">Read more</button></Link>
                          {/* <Route path="/article-view" component={ArticleView}></Route> */}
                      <p className="card-text"><FontAwesomeIcon icon={faUserEdit} /> : {el.author ? el.author.node.name : "Unknown"}</p>
                      <p className="card-text"><small className="text-muted">{new Date(el.date).toLocaleDateString()}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </LazyLoad>
        )
        }
      </div>
    )
  }
}

export default ArticleList;