import React from 'react';
import './Menu.css';
import {useHistory} from 'react-router-dom';


function Menu(){
  
  let history = useHistory()

  const logOut = () => {
    localStorage.clear()
    history.push('/')
  }

    return (
      <div className="menu">
        <div className="d-flex justify-content-end toolbar bg-primary">
          <div className="dropdown">
            <button className="btn mt-1" type="button" id="menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span><i className="fas fa-ellipsis-v menu-icon"></i></span>
            </button>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-left" aria-labelledby="menu">
                <button className="dropdown-item" onClick={logOut} type="button">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Menu