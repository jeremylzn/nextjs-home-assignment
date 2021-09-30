import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from './spinner'
import React, { Component } from 'react';
import Link from 'next/link'


class Navbar extends Component<any, any> {

    state = {
        categories: [],
        isNavCollapsed: true,
        isLoading: false
    }

    constructor(props: any) {
        super(props);
        this.state = {
            categories: props.categories, // get all categories
            isNavCollapsed: true,
            isLoading: false
        };
    }

    handleNavCollapse = () => this.setState({ isNavCollapsed: !this.state.isNavCollapsed }); // Collapse navbar (boostrap 5 collapse not working)


    // Fetch the news articles in specific category and send to parent component
    onTrigger = (category: any) => {
        this.setState({ isLoading: true })
        fetch('/api/data', {
            method: 'POST',
            body: JSON.stringify({ url: category.uri }),
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then((articles) => { this.setState({ isLoading: false }); this.props.changeArticles(articles.props.pageProps.posts) })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-primary rounded">
                    <a className="navbar-brand text-light font-weight-bolder">
                        <span className="" style={{ marginLeft: "5px" }}>LOGO</span>
                    </a>
                    <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!this.state.isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={this.handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`${this.state.isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
                        {this.state.categories && this.state.categories.map((el: any, index: number) =>
                            <Link href="/" key={'navItem' + index}>
                                <a onClick={() => this.onTrigger(el.categories.nodes[0])} className="nav-link text-light cursor-pointer">{el.categories.nodes[0].name}</a>
                            </Link>
                        )}
                    </div>
                </nav>
                {this.state.isLoading ? <Spinner /> : null}
            </div>
        )
    }
}

export default Navbar;