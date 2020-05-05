import React from 'react'
import axios from 'axios'
import {createGarden, fetchGarden, verifyToken} from '../services/api'

class CreateGardenForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            garden : {
                garden_name: ''
            }

        }
    }
    handleGardenChange = (ev) => {
        const {name, value} = ev.target;
        this.setState(prevState =>({
          garden: {
            ...prevState.registerFormData,
            [name]:value
          }
        }));
      }
    
    // will submit inputted data to backend
      handleGardenSubmit = async (ev) => {
        const token = await verifyToken();
        if(token){
          try{
            ev.preventDefault();
            const garden_name = await createGarden(this.state.garden);
            console.log(garden_name);
            this.setState({
                garden : {
                    garden_name: ''
                }
            });
          }catch(e){
            console.log(e);
          }
        }
      }

      componentDidMount = async () => {
        const data = await verifyToken();
        console.log(data);
        // debugger;
      }
     
    render(){
        return(
            <div>
                <form onSubmit={this.handleGardenSubmit}>
                    <input
                        type="text"
                        required
                        placeholder="garden name"
                        name="garden_name"
                        onChange={this.handleGardenChange}
                    />
                    <button>Create</button>
                </form>
            </div>
        )
    }
}

export default CreateGardenForm;