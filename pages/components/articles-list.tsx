import type { NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../styles/ArticlesList.module.css'
import React, { Component } from 'react';

class ArticleList extends Component<{}, { allArticles: any[], filteredArticles: any[] }> {

  constructor(props: any) {
    super(props);
    this.state = {
      allArticles: props.articles,
      filteredArticles: props.articles,
    };
  }

  public handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = this.state.allArticles.filter((data) => {
      return (data.title.toLowerCase()).search(value) != -1;
    });
    this.setState({ filteredArticles: result });
  }

  render() {
    return (
      <div className="container">

        <div className="input-group flex-nowrap mt-5 mb-5">
          <span className="input-group-text" id="addon-wrapping">Search</span>
          <input type="text" className="form-control" placeholder="Search ..." onChange={(event) => this.handleSearch(event)} aria-label="Search" aria-describedby="addon-wrapping"/>
        </div>

        {this.state.filteredArticles.map((el: any, index: number) =>
          <div className="row" key={index}>
            <div className={styles.card + " mb-3"}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={el.featuredImage.node.sourceUrl} className="img-fluid rounded-start" alt={el.featuredImage.node.altText} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-center">{el.title}</h5>
                    <p className="card-text mt-5"><FontAwesomeIcon icon={faUserEdit} /> : {el.author.node.name}</p>
                    <p className="card-text mt-5"><small className="text-muted">{new Date(el.date).toLocaleDateString()}</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </div>
    )
  }
}

export default ArticleList;