import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { utilService } from '../services/util.service';
const IMG_SRC =
    'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60';
function News(props) {
    const [articlesCount, setArticlesCount] = useState(5);
    const {
        data: cryptoNews,
        isLoading,
        isSuccess,
    } = useGetCryptoNewsQuery({ newsCategory: props.coinName, count: articlesCount });
    const expandNewsHandler = () => {
        if (articlesCount === 5) {
            setArticlesCount(10);
        } else {
            setArticlesCount(5);
        }
    };
    return (
        <div className="news-container">
            <div className="news-container-title">
                <h1>Top {props.coinName} Related News</h1>
            </div>
            {isLoading && <h1>Loading...</h1>}
            {isSuccess &&
                cryptoNews &&
                cryptoNews.value.map((news, idx) => (
                    <a href={news.url} rel="noreferrer" target="_blank" key={news.name}>
                        <div className="news-container-item">
                            <img
                                src={news.image ? news.image.thumbnail.contentUrl : IMG_SRC}
                                alt={props.coinName}
                            ></img>
                            <div className="news-container-item-content">
                                <h1>{news.name}</h1>
                                <h2>
                                    {news.description.length + news.name.length > 550
                                        ? `${news.description.substring(0, 100)}...`
                                        : news.description}
                                </h2>
                                <div className="news-container-item-author">
                                    <img
                                        src={
                                            news.provider[0].image
                                                ? news.provider[0].image.thumbnail.contentUrl
                                                : IMG_SRC
                                        }
                                        alt={news.provider[0].name}
                                    ></img>
                                    <h1>{utilService.convertDate(news.datePublished)}</h1>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            <div className="news-container-action" onClick={expandNewsHandler}>
                {articlesCount === 5 && <h1>Load More</h1>}
                {articlesCount === 10 && <h1>Show Less</h1>}
            </div>
        </div>
    );
}

export default News;
