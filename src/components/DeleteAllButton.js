import React from 'react';

const DeleteAllButton = (cleanTodos) => {
  return ( 
    <button 
      type="button"  
      className="btn btn-outline-danger btn-block delete-all-button" 
      onClick={() => cleanTodos()} 
      >Delete todos
    </button>
   );
}
 
export default DeleteAllButton;