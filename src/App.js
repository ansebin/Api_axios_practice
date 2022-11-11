


import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { ReactComponent as SearchLogo } from '../src/svg/SearchLogo.svg';
import { ReactComponent as MenuLogo } from '../src/svg/MenuLogo.svg';
import { useNavigate} from "react-router-dom"
import { useRecoilState } from "recoil";
import {movieName} from '../src/recoil/Movie';
function App() {
  const navigate = useNavigate();
  const URL = "https://api.themoviedb.org/3/movie/popular";
  const IMG_URL = "https://image.tmdb.org/t/p/w1280/"
  const API_KEY = '7d28cdc0ff6b5b2e3d6ed25096011d9b';
  const [movieInfo,setMovieInfo] = useState({})
  const [movie,setMovie] = useRecoilState(movieName);
  
  
  
  const Movie = async (e) =>{
    try{
      const data = await axios({
        method :"get",
        url: URL,
        params:{
          api_key:API_KEY,
          language:"ko",
        }  
      });
      console.log("결과",data);
      setMovieInfo(data)
    }
     catch(e){
        console.log(e)
     }
  }
  useEffect(()=>{
    Movie()
  })
  
  const MoviePage= (e) =>{
    navigate("./SearchMovie")
  }
  const MoviePage2 = (e) =>{
    if(e.key === "Enter"){
      navigate("./SearchMovie")
    }
  }



  return (
    <>
      <Header>
        <div className="header_title">
          <span>
            영화검색
          </span>
        </div>
        <div className="search_movie">
          <div className="search_movie_wrap">
            <label>
              <input
                placeholder="영화를 검색 하세요"
                value={movie}
                onChange={(e)=>setMovie(e.target.value)}
                type="text"
                onKeyDown={MoviePage2}
                style={{border:"0px",outline:"none",height:"30px",width:"250px",marginLeft:"10px"}}
              ></input>
              
            </label>
            <SearchLogo onClick={MoviePage}></SearchLogo>
          </div>
        
        </div>
        <div className="header_menu">
          <MenuLogo></MenuLogo>
        </div>
      </Header>
      <div>
        {
          Object.keys(movieInfo).length !=0 &&(
            <Main>
              <div className="main_wrap">
                {
                  movieInfo.data.results.map((movieInfo)=>{
                    return(
                      <>
                        <div className="main_item">
                          <img src={IMG_URL+movieInfo.backdrop_path}></img>
                          <div className="main_info">
                            <h4>{movieInfo.title}</h4>
                            <span>{movieInfo.vote_average}</span>
                          </div>
                        </div>
                      </>
                      
                    )
                  })
                }
              </div>
            </Main>
          )
        }

     
      
    </div>
    </>
    
  );
}

export default App;


const Header = styled.div`
  width:1520px;
  height:80px;
  border-bottom:1px solid #dcdcdc;
  display:flex;
  background-color:#222222;
  
  
  

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
    background-color:white;
    border-radius:20px;
    border:1px soild ##717171;
    margin-left:20px;
    display:flex;
    align-items:center;
    
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
  justify-content: center;
  background-color: #22254b;

  .main_wrap{
    width:1350px;
    height:100%;
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
    row-gap:20px;
    column-gap:20px;
    margin-top:25px;
  }
  .main_item{
    width:300px;
    height:400px;
    background-color:#373b69;
    border-radius: 20px;
    margin-top:10px;
    color:white;
    box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
  }
  .main_item img{
    max-width:100%;
    height:270px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .main_info{
    display:flex;
    padding:20px;
    justify-content:space-between;
  }
  .main_info h4{
    margin:0;
  }
`;