import { useNavigate } from 'react-router-dom';
import React,{ useState,useEffect } from "react";
import AddOrEditTaskModal from "../molecules/Modal";
import Navbar from "../molecules/Navbar";
import TaskHeader from "../molecules/TaskForm";
import TaskList from "../molecules/TaskList";
import DeleteModal from "../molecules/DeleteModal";
import { connect } from "react-redux";
import {list_task,add_task,update_task,delete_task,} from  "../../../redux/actions/task";
import {logout} from  "../../../redux/actions/auth";
import {createTask,taskList,updateTask,deleteTask} from "./../../../apis/services/task";

const  Task = ({phone,logout,list_task,add_task,update_task,delete_task,tasks}) => {
    const style={ width: '75%',height: 'auto', margin:'auto'};
    const [type,setType] = useState("");
    const [modal,setModal]= useState(false);
    const [deleteModal,setDeleteModal]= useState(false);
    const navigate = useNavigate();
    const [error,setError] = useState({error:false});
    const [id,setId]=useState(null);
    
    useEffect(() => {
      const getTasks = async()=>{
        try {
          let {tasks} = await taskList();
          list_task(tasks);
        }catch(e){
          setError({...error,e})
        }
      }
      getTasks()
      
      window.onbeforeunload = async()=> {
          await list_task([])
          return true;
      };
      
      return () => {
          window.onbeforeunload = null;
      };
    },[]);
    
    const signout=()=>{
      localStorage.clear();
      logout();
      navigate('/');
    }

    const handleTask=(type)=>{
      setType(type)
      setModal(true);
    }
    
    const handleClose = (type) => {
      if(type   ===  'create') setModal(false);
      if(type   ===  'delete') setDeleteModal(false);
    };

    const controlHandler=async(type,id)=>{
      console.log(type)
      await setId(id)
      await setType(type)
      if(type  === 'edit' || type  === "create") {
        await setModal(true)
        await setDeleteModal(false)
      }else if(type  === "delete"){
        await setModal(false)
        await setDeleteModal(true)
      }
    }

    const action = async({controlName,type,obj})=>{
        if(controlName  === 'modal'){
          let data = new FormData();
          data.append('title',obj.title);
          console.log('uploaded_file')
          data.append('uploaded_file',obj.file);
          data.append('category',obj.category)
          const {task} = type  === 'create'? await createTask(data): await updateTask(data,id)
          if(type  === 'create') 
            add_task(task) 
          else 
            update_task(task)
          setModal(false)
        } else if(controlName  === "deleteModal"){
          if(type   ===  'yes'){
            let {task} = await deleteTask(id);
            if(task._id  === id) delete_task(id);
          }
          setDeleteModal(false)
        }
        return
    }

    return(
        <div >
          <Navbar phone={phone} signout={signout} />
          <div style={style}>
            <TaskHeader  handleTask={()=>handleTask('create')} />
            <TaskList controlHandler={controlHandler} />
          </div>
          { (type  === "create" || type  === "edit") &&
            <AddOrEditTaskModal id={id} tasks={tasks} modal={modal} type={type} action={action} handleClose={()=>handleClose('create')} />
          }
          { type  === "delete" &&
            <DeleteModal action={action} deleteModal={deleteModal}  handleClose={()=>handleClose('delete')} />
          }
        </div>
    )
}

const mapStateToProps = ({phone,token,isLoggedin,tasks})=>({phone,token,isLoggedin,tasks})

const mapDispatchToProps=(dispatch)=>{
  return {
    logout:async()=> dispatch(logout()),
    list_task:(data) => dispatch(list_task(data)),
    add_task:(data) => dispatch(add_task(data)),
    update_task:(data) => dispatch(update_task(data)),
    delete_task:(data) => dispatch(delete_task(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Task);