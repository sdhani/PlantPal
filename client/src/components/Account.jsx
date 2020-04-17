import React from 'react';

class Account extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            //REGISTER FORM
            <div className="register">
                <h3>Register</h3>
                <form onSubmit={this.props.handleRegisterSubmit}>
                    <input 
                        type="text"
                        name="email"
                        placeholder="email@email.com"
                        onChange={this.props.handleRegisterChange}
                    />
                    <input 
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={this.props.handleRegisterChange}

                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.props.handleRegisterChange}
                    />
                    <input type="submit" value="Sign Up" /> 
                </form>
            </div>
        )
    }
}

export default Account;