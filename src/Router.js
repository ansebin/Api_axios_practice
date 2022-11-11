import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import SearchMovie from "./component/SearchMovie";
import SimilarMovie from "./component/SimilarMovie";


function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/SearchMovie" element={<SearchMovie/>}/>
                <Route path="/SimilarMovie" element={<SimilarMovie/>}/>
              
            </Routes>
        </BrowserRouter>
    )
}
export default Router;