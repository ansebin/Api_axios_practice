import { useNavigate} from "react-router-dom"
import styled from 'styled-components';
import { movieId } from "../recoil/MovieId";
import { ReactComponent as MenuLogo } from '../svg/MenuLogo.svg';
import { constSelector, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SimilarMovie(){
    const navigate = useNavigate();
    const API_KEY = '7d28cdc0ff6b5b2e3d6ed25096011d9b';
    const [Result, setResult] = useState({})
    const movie_id = useRecoilValue(movieId);
    const IMG_URL = "https://image.tmdb.org/t/p/w1280/"
    console.log(movie_id)
    const Similar_URL = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}&language=ko&page=1`;

    const SimilarMovie = async (e)=>{
        try{
            const data = await axios({
              method:"get",
              url:Similar_URL,
            });
            console.log(data)
            setResult(data); 
          }
          catch(e){
            console.log(e)
          }
    }
    useEffect(()=>{
        SimilarMovie()
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
                        <div>비슷한 영화</div>
                    </div>
                </div>
                <div className="header_menu">
                    <MenuLogo></MenuLogo>
                </div>
            </Header>
        <div>
        {
          Object.keys(Result).length !=0 &&(
            <Main>
              <div className="main_wrap">
                {
                  Result.data.results.map((Result)=>{
                    return(
                      <>
                        <div className="main_item">
                          <img src={IMG_URL+Result.backdrop_path}></img>
                          <div className="main_info">
                            <h4>{Result.title}</h4>
                            <span>{Result.vote_average}</span>
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
    )
}

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
    color:white;
    font-size:25px;
    margin-left:100px;
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