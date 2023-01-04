/* eslint-disable react/jsx-no-undef */
import React,{useEffect,useState} from 'react'

import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {

    const[articles,setArticals]=useState([])
    const[loading,setLoading]=useState(true)
    const[page,setPage]=useState(1)
    const[totalResults,setTotalResults]=useState(0)
    
    
    const updateNews=async()=> {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(400);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticals(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        
        props.setProgress(100);
    }
    useEffect(()=>{
        document.title = `${props.category.toUpperCase()}-NewsTadaka`;
        updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    // const handlePrevClick = async () => {
        
        
    //     setPage(page-1)
    //     updateNews();
    // }

    // const handleNextClick = async () => {
        
       
    //     setPage(page+1)
    //     updateNews();
    // }

    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticals(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults )
       
    };

    
        return (
            <>
                <h2 className='text-center' style={{ marginTop: "5rem", marginBottom: "2.5rem" }} > NewsTadaka - Top {props.category} headlines  </h2>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    // loader={<Spinner />}
                >
                    <div className='container'>

                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>

                    </div>
                </InfiniteScroll>
                
            </ >
        )
    
}

export default News


News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}