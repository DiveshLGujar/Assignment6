import React,{useEffect,useState} from 'react';
import {Url} from './Url';

const Main = ()=>{

    let [articles,setArticles]= useState([])
    let [searchQuery, setSearchQuery] = useState("")

    const querySearch =()=>{
        let url = Url(searchQuery);
        /*"https://newsapi.org/v2/everything?q=" + searchQuery +"&apiKey=258a0c3001424e23927cc24fef591b1f";
         */
        fetch(url)
         .then((response)=> response.json())
         .then((news)=>{
             console.log(news.articles);
             setArticles(news.articles);
        })
        setSearchQuery("");

    }

    useEffect( ()=>{
         let url = Url("");
         fetch(url)
         .then((response)=> response.json())
         .then((news)=>{
             console.log(news.articles);
             setArticles(news.articles);
        })

         


    },[])

    return(
        <div className="container">
            <div className="search-bar">
                <input value={searchQuery} type="search" placeholder="Enter topic to find news!" onChange={(event)=>{setSearchQuery(event.target.value)}}></input>
                <button onClick={()=>{querySearch()}}  >Search</button>
            </div>

            <div className ="pad">
            <h2>All News!!</h2>
            
            {
            (articles.length>0)?(
            articles.map((article,index)=>(
                <div key={index} className="article">
                    <div className="article-pad">
                        <div className="news-img">
                            <img src={article.urlToImage}/>
                        </div>
                        <div className="news-details">
                            <h3>{article.title}</h3>
                            <p>{article.author}</p>
                            <p>{article.description}</p>
                            <p>
                                <a href={article.url} target="_blank">
                                    <button  >View Full News</button>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            ))
            ):
            (
                <h3>No Data Found!</h3>
            )
            }
        
            </div>
        

        </div>

    )
}
export default Main;