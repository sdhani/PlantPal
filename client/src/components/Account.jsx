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
                <form>
                    <input 
                        type="text"
                        name="email"
                        placeholder="email@email.com"
                    />
                    <input 
                        type="text"
                        name="username"
                        placeholder="username"
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                </form>
            </div>
        )
    }
}

export default Account;