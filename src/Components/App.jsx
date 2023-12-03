import React,{ useState ,useEffect} from 'react';
import Print from "./Print";
import axios from "axios";

function App() {

  const [arr,setArr] = useState([]);
  const [text,setText] = useState("");
  const [filteredResults,setFilteredResults] = useState([]);

  useEffect(function(){
    axios.get(import.meta.env.VITE_API)
      .then(function(response){
        setArr(response.data);
      })
      .catch(function(err){
        console.log(err);
      });

  },[]);

  useEffect(function(){
    const filteredData = arr.filter(function(entry){
      return Object.values(entry)
        .join("")
        .toLowerCase()
        .includes(text.toLowerCase());
    });
    setFilteredResults(filteredData);
    
  },[text,arr]);

  function handleSearchClick(){
    // here new array has to be passed rest Print component will handle
  }

  function handleSearchText(event){
    setText(event.target.value);
  }

  function handleArrayChange(temp,str){
    //setArr(temp);
    console.log(temp);
    if(str==="delete"){
      const new_arr = arr.filter(function(entry){
        return (!temp.includes(parseInt(entry.id)));
      });
      console.log(new_arr);
      setArr(new_arr);
    }
    else{
      const editId = temp[0];
      const changedValue = temp[1];
      const new_arr = arr.map(function(entry){
        if(parseInt(entry.id)===parseInt(editId)){
          return {...changedValue,key:editId};
        }
        else{
          return entry;
        }
      });  
      setArr(new_arr);
    }
  }

  return (
    <div>
      <div>
        <input type="text" className="search" name="search" placeholder="Search" onChange={handleSearchText} value={text} autoComplete="off"/>
        <button className="btn search-button" onClick={handleSearchClick}>
          <span className="material-symbols-outlined search-icon">search</span>
        </button>
      </div>
      <div className="print">
        <Print arr={filteredResults} handleArrayChange={handleArrayChange}/>
      </div>
    </div>
  );
}

export default App
