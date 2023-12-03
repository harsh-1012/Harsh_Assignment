import React ,{useState,useEffect,useRef,useMemo} from "react"
import DataTable from "react-data-table-component"

function Pagination(props){
    // props.arr = whole array
    // props.currentPage

    const recordsPerPage = 10;
    const lastIndex = props.currentPage*recordsPerPage;
    const firstIndex = lastIndex-recordsPerPage;
    
    const new_arr = props.arr.slice(firstIndex,lastIndex);

    const [editing,setEditing] = useState(false);
    const [editId,setEditId] = useState();
    const [DeleteID,setDeleteID] = useState([]);

    const memoizedDeleteID = useMemo(() => DeleteID, [DeleteID]);
    
    const divRef = useRef(null);
    const [val,setVal] = useState({name:"",email:"",role:""});

    useEffect(function(){
       // if anything is selected for delete then it should remain marked how to do?
       // use memoizedDeleteID
       let count=0;
        for(let j=0;j<new_arr.length;j++){
            if(memoizedDeleteID.includes(parseInt(new_arr[j].id))){
                const element = document.getElementById(parseInt(new_arr[j].id));
                const rows = element.getElementsByClassName("row-data-cells");
                if(rows.length>0){
                    const inputs = rows[0].querySelectorAll('input[type="checkbox"]');
                    inputs.forEach(input=>{
                        input.checked=true;
                    });
                }
                for(let k of rows){
                    k.style.backgroundColor="#dddddd";
                }
                count++;
            }
        }
        if(count===(lastIndex-firstIndex)){
            document.getElementById("selectAll").checked=true;
        }

       // unmounting of component
        return function(){
            if(divRef.current){
                const inputs = divRef.current.querySelectorAll('input[type="checkbox"]');
                inputs.forEach(input => {
                    input.checked = false;
                });
            }
        };

    },[props.currentPage,props.arr]);

    function handleChange(event){
        // event.target.checked property
        const id = parseInt(event.target.name);
        
        const element = document.getElementById(id);
        const rows = element.getElementsByClassName("row-data-cells");

        if(event.target.checked===true){   
            setDeleteID(function(prev_arr){
                return [...prev_arr,id]
            });
            // also make it greyish in color
            for(let j of rows){
                j.style.backgroundColor="#dddddd";
            }
        }else{
            setDeleteID(function(prev_arr){
                return prev_arr.filter(function(ID){
                    return (ID!==id);
                });
            });
            // remove its greyish color
            for(let j of rows){
                j.style.backgroundColor="white";
            }
        }
    }
  
    function handleEdit(event){
        let id = parseInt(event.target.getAttribute('name'));
        setEditing(function(prev){
            if(prev===true)return false;
            else return true;
        });
        setVal({name:new_arr[id].name, email:new_arr[id].email, role:new_arr[id].role});
        setEditId(event.target.getAttribute('value'));
    }
    function handleDelete(event){
        let id = event.target.getAttribute('name');

        // const temp = props.arr.filter(function(entry){
        //     return (entry.id!==id);
        // });
        // trigger parent side function by passing temp as new array
        props.handleArrayChange([parseInt(id)],"delete");
        // also remove this id from DeleteID
        setDeleteID(function(prevArr){
            return prevArr.filter(function(ID){
                return (parseInt(ID)!==parseInt(id));
            });
        });
    }

    function handleDeleteChecked(){
        // const temp = props.arr.filter(function(entry){
        //     return (!DeleteID.includes(parseInt(entry.id)))
        // });
        props.handleArrayChange(DeleteID,"delete");
        setDeleteID([]);
    }
    
    function editChange(event){
        setVal(function(prev_val){
            return {...prev_val,[event.target.name]:event.target.value}
        });
    }

    function saveChanges(){
        setEditing(false);
        // now change that particular entry in array (new_arr)
        // const temp = props.arr.map(function(entry){
        //     if(parseInt(entry.id)===parseInt(editId)){
        //         return {...val, key : editId };
        //     }else{
        //         return entry;
        //     }
        // });
        props.handleArrayChange([editId,val],"edit");
    }

    function createEntry(entry,index){
        return(
            <tr key={entry.id} className="row-cells" id={entry.id}>
                <td className="row-data-cells"><input type="checkbox" name={entry.id} onChange={handleChange}/></td>
                <td className="row-data-cells"><span>{entry.name}</span></td>
                <td className="row-data-cells"><span>{entry.email}</span></td>
                <td className="row-data-cells"><span>{entry.role}</span></td>
                <td className="row-data-cells">
                    <div className="action">
                        <button name={index} value={entry.id} onClick={handleEdit} className="edit btn" >
                            <span name={index} value={entry.id} className="material-symbols-outlined">edit_square</span>
                        </button>
                        <button name={entry.id} onClick={handleDelete} className="delete btn" >
                            <span name={entry.id} className="material-symbols-outlined">delete_forever</span>
                        </button>
                    </div>
                </td>
            </tr>
        )
    }

    function selectAll(event){
        if(event.target.checked===true){
            const inputs = divRef.current.querySelectorAll('input[type="checkbox"]');
            inputs.forEach(input => {
                input.checked = true;
            });
            const rows = [...divRef.current.querySelectorAll(".row-data-cells")];
            for(let j of rows){
                j.style.backgroundColor="#dddddd";
            }
            // put all in index in DeleteID
            let temp=[];
            for(let j=0;j<new_arr.length;j++){
                temp.push(parseInt(new_arr[j].id));
            }

            temp.map(function(element,index){
                setDeleteID(function(prevArr){
                    if(!prevArr.includes(element)){
                        return [...prevArr,element];
                    }
                    else{
                        return [...prevArr];
                    }
                });
            });
        }
        else{
            if(divRef.current){
                const inputs = divRef.current.querySelectorAll('input[type="checkbox"]');
                inputs.forEach(input => {
                    input.checked = false;
                });
                const rows = [...divRef.current.querySelectorAll(".row-data-cells")];
                for(let j of rows){
                    j.style.backgroundColor="white";
                }
            }
            setDeleteID(function(prev_arr){
                return prev_arr.filter(function(id){
                    return !new_arr.some(item => parseInt(item.id) === parseInt(id));
                });
            });
        }
    }
    
    return (
        <div ref={divRef} className="display-area table-responsive">
            {/* {display.map(handleSectionPrinting)} */}
            <table className="styled-table table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col"><input type="checkbox" name="all" id="selectAll" onChange={selectAll}/></th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {new_arr.map(createEntry)}
                </tbody>
            </table>
            <p className="selected">{memoizedDeleteID.length} out of {props.arr.length} rows selected</p>
            <button onClick={handleDeleteChecked} className="delete-checked btn">
                <span className="material-icons">delete_sweep</span>
            </button>
            {editing===true?
                <div className="popup container-fluid">
                    <label htmlFor="name" className="form-label">Name
                        <input type="text" id="name" name="name" className="form-control" value={val.name} onChange={editChange}/>
                    </label>
                    
                    <label htmlFor="email" className="form-label">Email
                        <input type="text" id="email" name="email" className="form-control" value={val.email} onChange={editChange}/>
                    </label>
                    
                    <label htmlFor="role" className="form-label">Role
                        <input type="text" id="role" name="role" className="form-control" value={val.role} onChange={editChange}/>
                    </label>

                    <button onClick={saveChanges} className="save btn btn-dark">Save</button>
                </div>
                :
                null
            }
        </div>
    );
    
}

export default Pagination;
