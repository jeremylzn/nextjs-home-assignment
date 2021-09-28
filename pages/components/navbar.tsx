import 'bootstrap/dist/css/bootstrap.min.css';


import React, { Component } from 'react';

class Navbar extends Component<any, any> {

    state = {
        categories: [],
        isNavCollapsed: true
    }

    constructor(props: any) {
        super(props);
        this.state = {
            categories: props.categories, // get all categories
            isNavCollapsed:true
        };
    }

    handleNavCollapse = () => this.setState({isNavCollapsed: !this.state.isNavCollapsed}); // Collapse navbar (boostrap 5 collapse not working)


    // Fetch the news articles in specific category and send to parent component
    onTrigger = (category:any) => {
        fetch('/api/data', {
            method: 'POST',
            body: JSON.stringify({url : category.uri}),
            headers: { 'Content-Type': 'application/json'}
          }).then((res) => res.json()).then((articles) => { this.props.changeArticles(articles.props.pageProps.posts) })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-primary rounded">
            <a className="navbar-brand text-light font-weight-bolder" href="/">
              <span className="" style={{marginLeft:"5px"}}>LOGO</span>
            </a>
            <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!this.state.isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={this.handleNavCollapse}>
              <span className="navbar-toggler-icon"></span>
            </button>
      
            <div className={`${this.state.isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
            {this.state.categories.map((el: any, index: number) =>
                <a key={'navItem' + index} onClick={() => this.onTrigger(el.categories.nodes[0])} className="nav-link text-light cursor-pointer">{el.categories.nodes[0].name}</a>
            )}
            </div>
          </nav>
        )
    }
}

export default Navbar;