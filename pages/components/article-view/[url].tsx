import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../../styles/ArticleView.module.css'


export default function ArticleView() {

  const [current, setCurrentData]: any = useState(null) // Articles storing


  const router = useRouter()
  var { url } : any = router.query;

  // useEffect to call the API once mounted and set the data
  useEffect(() => {
    if(url){
      localStorage.setItem('url-parameter', url.toString());
    } else {
      url = localStorage.getItem('url-parameter')
    }
    fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({ url: '/' + url }),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json()).then((article) => { console.log(article); setCurrentData(article.props.pageProps) })
  }, []);

  return (
    <div className="container">
      {current ? current &&
        <div className="content">
          <h2 className="text-center">{current.post.title}</h2>

          <div className={styles.strike}>
            <span><FontAwesomeIcon icon={faUserEdit} /> : {current.post.author.node.name}</span>
          </div>
          {
            current.post.fullPageLayout.map((el: any, index: number) =>
              <div key={index}>
                <div className="text" dangerouslySetInnerHTML={{ __html: el.pageContent[0].content }}></div>
                <div className="text-center">
                  <img src={el.pageContent[0].imageSrc} className="img-thumbnail rounded mx-auto d-block" alt={el.pageContent[0].imageAlt} width={el.pageContent[0].imageWidth} height={el.pageContent[0].imageHeight} title={el.pageContent[0].imageTitle} />
                </div>
                <div className="text" dangerouslySetInnerHTML={{ __html: el.pageContent[1].content }}></div>
                <hr />
              </div>
            )
          }
          <span>Date : <strong>{new Date(current.post.date).toLocaleDateString()}</strong></span>
        </div>

      : null }
    </div>
  )
}