
import './App.css';
import axios from 'axios';
import {useState} from 'react';
import ReactPaginate from "react-paginate";
function App() {
   
  
  const [text,setText]=useState("Search Repo....")
  let opt="Name";
  const [repoList,setRepo]=useState([])
  const setName=()=>
  {
    opt="Name"
     console.log(opt)
  }
  const setStars=()=>
  {
     opt="stars"
     console.log(opt)
  }
  const changeText=(event)=>
  {
     setText(event.target.value)
    
  }
  const getRepo=(event)=>
  {
    event.preventDefault()
    axios.get(`https://api.github.com/search/repositories?q=language:${text}&sort=${opt}&order=desc&page=1&per_page=10`).then((res)=>
      {
        setRepo(res.data.items)
        console.log(repoList)
        console.log(text)
      })
  }
  const getData=(currentPage)=>
  {
    console.log(currentPage)
    axios.get(`https://api.github.com/search/repositories?q=language:${text}&sort=${opt}&order=desc&page=${currentPage}&per_page=10`).then((res)=>
      {
        setRepo(res.data.items)
        window.scrollTo(0, 0)
      })
  }
  const handlePageChange=(data)=>
  {
    
    let currentPage = data.selected + 1;
    console.log(currentPage)
    getData(currentPage)
  }
  return (
    
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Repo List App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
       
        <li className="nav-item dropdown" >
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort By
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#" onClick={setName}>Name</a></li>
            <li><a className="dropdown-item" href="#" onClick={setStars}>Stars</a></li>
            
            
          </ul>
        </li>
       
      </ul>
      <form className="d-flex" onSubmit={getRepo}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={text} onChange={changeText}/>
        <button className="btn btn-outline-success" type="submit" >Search</button>
      </form>
    </div>
  </div>
</nav>
<div className="container my-3">
<div className='row m-2'>
{
   repoList.map((value,index)=>
   {
     return(
       <div className='col-sm-6 col-md-4 v my-2'>
        <div className="card shadow-sm w-100" style={{width: "18rem"}}>
        
        <div className="card-body">
          <h2 className="card-title">{value.name}</h2>
          <p className="card-text">{value.description}</p>
          <h4 className="card-text">owner: {value.owner.login}</h4>
          <h4 className="card-text">stargazers_count: {value.stargazers_count}</h4>
          <h4 className="card-text">watchers_count: {value.watchers_count}</h4>
          <h4 className="card-text">language: {value.language}</h4>
          <a href={value.html_url} className="btn btn-primary">Github Url</a>
        </div>
      </div>
      </div>
     );
   })
 }
 </div>
 </div>
 <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={10}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
    />
</>
 
    
  );
}

export default App;
