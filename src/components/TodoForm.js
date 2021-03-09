import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';

const TodoForm = ({newItem, updateInput, handleEnter, cleanTodos}) => {
    
    return (
        <Fragment>
        <Card className="rounded-0" style={{ width: '100%' }}>
        <ul className="list-group list-group-flush rounded-0 task-area">  
            {newItem.length === ' ' ? <p className="alerta-error">This field is mandatory</p>
            : null }
            <input 
                className="list-group-item input-outline" 
                type="text" 
                placeholder="What needs to be done?" 
                value={newItem} 
                onChange={(e) => updateInput("newItem", e.target.value)} 
                onKeyPress={(e) => handleEnter(e)} 
            /> 
        </ul>
        </Card>
        </Fragment>
    );
}

export default TodoForm;