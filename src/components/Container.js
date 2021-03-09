import React, { Fragment, useState, useEffect } from 'react';
import DeleteAllButton from './DeleteAllButton';
import TaskList from './TaskList';
import TodoForm from './TodoForm';


const Container = () => {

    const [task, setTask] = useState({
        newItem: "",      
        list: []
    });

    const user = 'milyrodz'; 


    const updateInput = (key, value) => {         
        setTask({
            ...task,
            [key]: value            
        });
    }

    const deleteTask = taskName => {
        const updateList = task.list.filter(value => value.label !== taskName );
        updateTasks(updateList);  
    }

    const addItem = () => {      

        const list = [...task.list];
        
        if(task.newItem.trim() !== ''){
            const newItem = {
              label: task.newItem,
              done: false                                                                                         
            } 
            list.push(newItem);  
            updateTasks(list);          
        }
    } 

    const updateTasks = async (listTask) => {
    
      let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json'            
          },                    
          body: JSON.stringify(listTask) 
        });
      
        if(response.ok){
          console.log("response update tasks ok");
            const data = await response.json();
            console.log(data);
            loadTasks();
        } 
    }
 
    const handleEnter = (e) => {

        if(e.which === 13){
           console.log("key pressed enter");
           addItem();
        }else{
            console.log("aun está escribiendo");
        }
    }

    const createNewUser = async () => { 
        let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'            
          },                    
          body: JSON.stringify([])
        });

        if(response.ok){
          console.log("response create new user ok");
            const data = await response.json();
            console.log(data);
        }  
    }  

    const loadTasks = async () => {    
        let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'            
          }
        });

        if(response.ok){
          const data = await response.json();
          console.log(data);
          setTask({
            ...task,
            newItem: "",
            list: data
          })
           
        }
    }

    const cleanTodos = async () => {
      let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json'            
          }
        }); 
        if(response.ok){
          await createNewUser();
          await loadTasks();
        }else{
            console.log("response cleanTodos");
            const data = await response.json();
            console.log(data);
        }
    }


    useEffect( () => {
          createNewUser();
          loadTasks();      
    }, []);
 

    return( 
        <Fragment>
            <div className=" container center-content">
                <div className="">  
                    <h1 className="todos-h1" >todos</h1>                    
                        <TodoForm 
                            newItem={task.newItem}
                            handleEnter={handleEnter} 
                            updateInput={updateInput}  
                        />
                </div>
                <div className=""> 
                    <TaskList 
                        list={task.list} 
                        deleteTask={deleteTask} 
                    />
                </div>
                    <div className="paper list-group-item text-left p-3 items-left">                        
                            {task.list.length}
                            {task.list.length === 1 ? " Item left" : " Items left"}                                  
                    </div>

                    <div className="delete-todos">                        
                        <DeleteAllButton 
                          cleanTodos={cleanTodos}
                        />                                  
                    </div>
            </div>
        </Fragment>
    );
}

export default Container;
