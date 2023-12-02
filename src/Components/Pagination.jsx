import React ,{useState,useEffect,useRef} from "react"
import DataTable from "react-data-table-component"

function Pagination(props){
    // props.arr = whole array
    // props.currentPage

    let i = ((props.currentPage-1)*10);
    let max = Math.min(i+10,props.arr.length);
    
    const [new_arr,setNewArr] = useState([]);
    const [editing,setEditing] = useState(false);
    const [editId,setEditId] = useState();
    const [DeleteID,setDeleteID] = useState([]);
    const divRef = useRef(null);
    const [val,setVal] = useState({name:"",email:"",role:""});

    useEffect(function(){
        const temp = [];
        for(;i<max;i++){
            temp.push(props.arr[i]);
        }
        setNewArr(temp);

        // unmounting of component
        return function(){
            setNewArr([]);
            if(divRef.current){
                const inputs = divRef.current.querySelectorAll('input[type="checkbox"]');
                inputs.forEach(input => {
                    input.checked = false;
                });
            }
            setDeleteID([]);
        };

    },[props.currentPage,props.arr]);

    function handleChange(event){
        // event.target.checked property
        const id = parseInt(event.target.name);
        
        if(event.target.checked===true){
            setDeleteID(function(prev_arr){
                return [...prev_arr,id]
            });
        }else{
            setDeleteID(function(prev_arr){
                return prev_arr.filter(function(ID){
                    return (ID!==id);
                });
            });
        }
    }
  
    function handleEdit(event){
        let id = parseInt(event.target.getAttribute('name'));
        console.log(id);
        setEditing(function(prev){
            if(prev===true)return false;
            else return true;
        });
        setVal({name:new_arr[id].name, email:new_arr[id].email, role:new_arr[id].role});
        setEditId(id);
    }
    function handleDelete(event){
        let id = parseInt(event.target.getAttribute('name'));
        setNewArr(function(prev_arr){
            return prev_arr.filter(function(entry,index){
                    return (index!==id);
            });
        })
        if(divRef.current){
            const inputs = divRef.current.querySelectorAll('input[type="checkbox"]');
            inputs.forEach(input => {
                input.checked = false;
            });
        }
    }

    function handleDeleteChecked(){
        setNewArr(function(prev_arr){
            return prev_arr.filter(function(entry,index){
                // if index in deleteID then return false
                // else return true
                return (!DeleteID.includes(index));
            });
        });
        setDeleteID([]);
        if(divRef.current){
            const inputs = divRef.current.querySelectorAll('input[type="checkbox"]');
            inputs.forEach(input => {
                input.checked = false;
            });
        }
    }
    
    function editChange(event){
        setVal(function(prev_val){
            return {...prev_val,[event.target.name]:event.target.value}
        });
    }

    function saveChanges(){
        setEditing(false);
        // now change that particular entry in array (new_arr)
        setNewArr(function(prevArr){
            let nums = [...prevArr];
            nums[editId] = val;
            return nums;
        });
    }

    function createEntry(entry,index){
        return(
            <tr key={index}>
                <td><input type="checkbox" name={index} onChange={handleChange}/></td>
                <td><span>{entry.name}</span></td>
                <td><span>{entry.email}</span></td>
                <td><span>{entry.role}</span></td>
                <td>
                    <div className="action">
                        <button name={index} onClick={handleEdit} className="edit btn" >
                            <span name={index} className="material-symbols-outlined">edit_square</span>
                        </button>
                        <button name={index} onClick={handleDelete} className="delete btn" >
                            <span name={index} className="material-symbols-outlined">delete_forever</span>
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
            // put all in index in DeleteID
            let temp=[0,1,2,3,4,5,6,7,8,9];
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
            }
            setDeleteID([]);
        }
    }
    
    return (
        <div ref={divRef} className="display-area table-responsive">
            {/* {display.map(handleSectionPrinting)} */}
            <table className="styled-table table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col"><input type="checkbox" name="all" onChange={selectAll}/></th>
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

            <button onClick={handleDeleteChecked} className="delete-checked btn">
                <span className="material-symbols-outlined">remove_selection</span>
            </button>
            {editing===true?
                <div className="popup container-fluid">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name="name" className="form-control" value={val.name} onChange={editChange}/>
                    
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" id="email" name="email" className="form-control" value={val.email} onChange={editChange}/>
                    
                    <label htmlFor="role" className="form-label">Role</label>
                    <input type="text" id="role" name="role" className="form-control" value={val.role} onChange={editChange}/>

                    <button onClick={saveChanges} className="save btn btn-success">Save</button>
                </div>
                :
                null
            }
        </div>
    );
    
}

export default Pagination;
