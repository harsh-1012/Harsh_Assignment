import React,{useState,useEffect} from "react";
import Pagination from "./Pagination";
import Bar from "./Bar";

function Print(props){
    // Here from the input array we will print records also implementing pagination
    const [pageNo,setPageNo] = useState(1);
    // how many can be there ?  = arr.length
    // 1 entry = (1/10) page
    // 10 entry = 1 page
    // 20 entry = 2 page
    // arr.size entry = arr.size*(1/10) pages
    const maxPageNo = Math.ceil(props.arr.length/10);

    function handleNext(){
        setPageNo(function(prev_no){
            let x = ((prev_no+1)%(maxPageNo+1));
            return (x===0?1:x);
        });
    }
    function handlePrevious(){
        setPageNo(function(prev_no){
            let x = (prev_no-1);
            return (x===0?maxPageNo:x);
        });
    }
    function handleFirstPage() {
        setPageNo(1);
    }
    function handleLastPage(){
        setPageNo(maxPageNo);
    }

    function handlePageChange(num){
        setPageNo(parseInt(num));
    }

    function handleArrayChange(temp,str){
        props.handleArrayChange(temp,str);
    }

    return (
        <div>
            <Pagination arr={props.arr} currentPage={pageNo} handleArrayChange={handleArrayChange}/>
            {/*Page No Bar*/}
            <div className="bar">
                <span style={{marginTop:'2px'}}>Page {maxPageNo===0?0:pageNo} of {maxPageNo}</span>
                <button onClick={handleFirstPage} className="first-page btn btn-outline-dark">
                    <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
                </button>
                <button onClick={handlePrevious} className="previous-page btn btn-outline-dark">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </button>
                <Bar currentPage={pageNo} handlePageChange={handlePageChange} maxPageNo={maxPageNo}/>
                <button onClick={handleNext} className="next-page btn btn-outline-dark">
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                </button>
                <button onClick={handleLastPage} className="last-page btn btn-outline-dark">
                    <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
                </button>
            </div>
                
        </div>
    );
}

export default Print;