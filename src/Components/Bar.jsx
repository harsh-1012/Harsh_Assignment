import React from "react";

function Bar(props) {
    // props.currentPage
    // props.handlePageChange is function which will triger parent comp state
  
    function handleclick(event){
        props.handlePageChange(event.target.getAttribute('name'));
    }

    function HandleRange(props){
        if(props.range===1){
            return ( <button className="btn btn-outline-dark" onClick={handleclick} name={1}>1</button> );
        }else if(props.range===2){
            return ( 
               <> 
                <button className="btn btn-outline-dark" onClick={handleclick} name={1}>1</button>
                <button className="btn btn-outline-dark" onClick={handleclick} name={2}>2</button> 
               </>
            );
        }else{
            return ( 
               <>
                <button className="btn btn-outline-dark" onClick={handleclick} name={1}>1</button>
                <button className="btn btn-outline-dark" onClick={handleclick} name={2}>2</button> 
                <button className="btn btn-outline-dark" onClick={handleclick} name={3}>3</button> 
               </>
            );
        }
    }

    return (
        <div style={{color:'grey'}}>
            {((props.currentPage===1) || (props.currentPage===2)) && props.maxPageNo>3?
                <div className="page-numbers">
                    <button className="btn btn-outline-dark" onClick={handleclick} name={1}>1</button>
                    <button className="btn btn-outline-dark" onClick={handleclick} name={2}>2</button>
                    <button className="btn btn-outline-dark" onClick={handleclick} name={3}>3</button>
                    <button className="btn btn-outline-dark" onClick={handleclick} name={4}>..</button> 
                </div>
                : null
            }
            {((props.currentPage===props.maxPageNo) || (props.currentPage===props.maxPageNo-1))&&props.maxPageNo>3 ?
                <div className="page-numbers">
                    <button className="btn btn-outline-dark" onClick={handleclick} name={props.maxPageNo-3}>..</button>
                    <button className="btn btn-outline-dark" onClick={handleclick} name={props.maxPageNo-2}>{props.maxPageNo-2}</button>
                    <button className="btn btn-outline-dark" onClick={handleclick} name={props.maxPageNo-1}>{props.maxPageNo-1}</button>
                    <button className="btn btn-outline-dark" onClick={handleclick} name={props.maxPageNo}>{props.maxPageNo}</button>
                </div>
                :
                null
            }
            {(props.currentPage!==1) && (props.currentPage!==2) && (props.currentPage!==props.maxPageNo) && (props.currentPage!==props.maxPageNo-1) && props.maxPageNo>3?
                <div className="page-numbers">
                    <button className="btn btn-outline-dark" onClick={handleclick} name={props.currentPage-2}>..</button>
                    <button className="btn btn-outline-dark" onClick={handleclick} name={props.currentPage-1}>{props.currentPage-1}</button>
                    <button className="btn btn-outline-dark" onClick={handleclick} name={props.currentPage}>{props.currentPage}</button>
                    <button className="btn btn-outline-dark" onClick={handleclick} name={props.currentPage+1}>{props.currentPage+1}</button>
                    <button className="btn btn-outline-dark" onClick={handleclick} name={props.currentPage+2}>..</button>
                </div>
                :null
            }
            {props.maxPageNo<=3?
                <div className="page-numbers">
                    <HandleRange range={props.maxPageNo}/>
                </div>
                :null
            }
        </div>
    );
}

export default Bar;