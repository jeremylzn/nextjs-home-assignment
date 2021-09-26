import type { NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';

export const ArticleList = (data: any) => {
    return (
        <div className="container">
      {
        (data.props) ? 
        data.props.pageProps.posts.map((el:any) =>
          <div className="row">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={el.featuredImage.node.sourceUrl} className="img-fluid rounded-start" alt={el.featuredImage.node.altText} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{el.title}</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : <div className="container">
          <h1>THERE IS NO ARTICLES</h1>
        </div>
      }
    </div>
    )
}