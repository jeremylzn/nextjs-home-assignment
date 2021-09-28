import type { NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../styles/ArticlesList.module.css'
import React, { Component } from 'react';
import LazyLoad from "react-lazyload";

const Spinner = () => (
  <div className="post loading">
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#49d1e0"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="rotate(275.845 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

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

        {this.state.filteredArticles.map((el: any, index: number) =>
          <LazyLoad
            key={index}
            height={100}
            offset={[-100, 100]}
            placeholder={<Spinner />}
          >
            <div className="row" key={index}>
              <div className={styles.card + " mb-3"}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={el.featuredImage.node.sourceUrl} className="img-fluid rounded-start" alt={el.featuredImage.node.altText} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-center">{el.title}</h5>
                      <p className="card-text mt-5"><FontAwesomeIcon icon={faUserEdit} /> : {el.author && el.author.node.name}</p>
                      <p className="card-text mt-5"><small className="text-muted">{new Date(el.date).toLocaleDateString()}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LazyLoad>
        )
        }
      </div>
    )
  }
}

export default ArticleList;