import { constSelector, useRecoilValue } from "recoil";
import {movieName} from '../recoil/Movie';
import styled from 'styled-components';
import axios from "axios";
import { useState } from "react";
import { ReactComponent as MenuLogo } from '../svg/MenuLogo.svg';
import { useEffect } from "react";
import { useNavigate} from "react-router-dom"
import { movieId } from "../recoil/MovieId";
import { useRecoilState } from "recoil";

export default function SearchMovie(){
    const navigate = useNavigate();
    const MovieTitle = useRecoilValue(movieName);
    const IMG_URL = "https://image.tmdb.org/t/p/w1280/"
    const [SearchResult,setSearchResult] = useState({});
    const [movieIds,setMovieIDs] = useRecoilState(movieId);
    const API_KEY = '7d28cdc0ff6b5b2e3d6ed25096011d9b';
    const Search_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko&query=${MovieTitle}`;
    const DetailPage = (e) =>{
      setMovieIDs(SearchResult.data.results[0].id);
      navigate("/SimilarMovie");
    }

    const SearchMovie = async (e)=>{
         try{
           const data = await axios({
             method:"get",
             url:Search_URL,
           });
           
           console.log(data)
           setSearchResult(data);
           
           
         }
         catch(e){
           console.log(e)
         }
       
       
     }
     useEffect(()=>{
        SearchMovie();  
     },[])

    
    return(
        <>
            <Header>
        <div className="header_title" onClick={(e)=>{navigate("/")}}>
          <span>
            영화검색
          </span>
        </div>
        <div className="search_movie">
          <div className="search_movie_wrap">
                <div>검색한 영화</div>
          </div>
        
        </div>
        <div className="header_menu">
          <MenuLogo></MenuLogo>
        </div>
      </Header>
        <Main>
            {Object.keys(SearchResult).length != 0 &&(
                <div className="main_wrap">
                    <div className="main_img">
                        <img src={IMG_URL+SearchResult.data.results[0].backdrop_path} alt="" />
                    </div>
                    <div className="main_info">
                        <div className="title">영화제목</div>
                        <span className="title_name">{SearchResult.data.results[0].original_title}</span>
                        <div className="title">평점</div>
                        <span className="title_name">{SearchResult.data.results[0].vote_average}</span>
                        <div className="title">영화 요약</div>
                        <span className="title_name">{SearchResult.data.results[0].overview}</span>
                        <button className="div_button" onClick={DetailPage}>비슷한 영화 보러가기</button>
                    </div>
                </div>
            )}
        </Main>
    </>
    )
}

const Header = styled.div`
width:1520px;
height:80px;
border-bottom:1px solid #dcdcdc;
display:flex;
background-color:#222222;
position:fixed;



.header_title{
  font-family: 'Fuzzy Bubbles', cursive;
  font-weight:bold;
  font-size:25px;
  width:200px;
  height:80px;
  color:red;
  display:flex;
  align-items:center;
  justify-content: center;
  cursor:pointer;
}

.search_movie{
  width:1000px;
  height:80px;
  display:flex;
  align-items:center;
  justify-content: center;
  margin-left:50px;
}
.search_movie_wrap{
  width:300px;
  height:40px;
  border-radius:20px;
  border:1px soild ##717171;
  margin-left:20px;
  display:flex;
  align-items:center;
  color:white;
  font-size:25px;
  margin-left:100px;
  
}

.header_menu{
  width:25px;
  height:25px;
  margin-top:25px;
  margin-left:200px;
}

`;
const Main = styled.div`
    width:1520px;
    display:flex;
    background-color:#22254b;
    justify-content: center;

    .main_wrap{
        width:1200px;
        display:flex;
        margin-top:50px;
        background-color:#373b69;
        align-items:center;
        
    }
    .main_img{
        display:flex;
        align-items:center;
        width:400px;
        height:800px;
        margin-left:20px;
    }
    .main_img img{
        max-width:100%;
        height:500px;
        border-radius:20px;
    }
    .main_info{
        display:flex;
        width:500px;
        height:500px;
        color:white;
        flex-direction: column;
        margin-left:20px;

    }
    .title{
      font-size:20px;
      margin-top:20px;
    }
    .title_name{
      font-size:16px;
      margin-top:10px;
      color:black;
    }
    .div_button{
      width:200px;
      height:50px;
      border:1px solid black;
      color:white;
      border-radius:20px;
      background-color:black;
      margin-top:120px;
      margin-left:300px;
      cursor:pointer;
    }
`;

