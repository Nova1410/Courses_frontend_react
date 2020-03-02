import React from 'react';
import axios from '../boot/axios';
import './Login.css';
import {useHistory} from "react-router-dom";

class Login extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          username: '',
          password: ''
        }
        
        // Bind the functions to the class scope
        this.handleUsername = this.handleUsername.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.login = this.login.bind(this)
    }

    // Function to handle the username input
    handleUsername(e){
      this.setState({
        username: e.target.value
      })
    }

    // Function to handle the password input
    handlePassword(e){
      this.setState({
        password: e.target.value
      })
    }

    // Function to login the user and get the token
    login() {
      axios.post('users/login/', {username: this.state.username, password: this.state.password}).then(response => {
        // Put the username and the token in the localstorage
        localStorage.setItem('username',response.data.username)
        localStorage.setItem('token', response.data.token)
        // Send the user to the courses page
        this.props.history.push('/courses')
      }).catch(error => {
        console.log(error)
      })
    }

    render() {
      return <div className="container-login">
        <header className="header">
          <div className="toolbar bg-primary"></div>
        </header>
        <div className="container-bg-login"></div>
        <div className="row mt-5 ml-5">
          <div className="col-4">
            <div className="card">
              <div className="card-header d-flex justify-content-center">
                  <h6>LOGIN</h6>
                  <span className="ml-3"><i className="fas fa-sign-in-alt"></i></span>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="usernameIcon"><i className="fas fa-user"></i></span>
                  </div>
                  <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="usernameIcon" value={this.state.username} onChange={this.handleUsername}/>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="passwordIcon"><i className="fas fa-lock"></i></span>
                  </div>
                  <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="passwordIcon" value={this.state.password} onChange={this.handlePassword}/>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
}

export default Login