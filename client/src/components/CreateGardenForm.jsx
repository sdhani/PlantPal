import React from 'react'
import axios from 'axios'
import {createGarden, fetchGarden, verifyToken} from '../services/api'

class CreateGardenForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            garden : {
                garden_name: ''
            },

            all_gardens: [],
            show_gardens: false
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
        const token = localStorage.getItem('jwt')
        if (token){
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
            console.log(e)
          }
        }
      }

      componentDidMount = async () => {
        // const data = await fetchGarden();
        // console.log(data);
      }

      getGardens = async() => {
        const gardens = await fetchGarden();
        console.log(gardens);
        this.setState({
          all_gardens: gardens
        })
        console.log(this.state.all_gardens)
      }

    render(){
        return(
            <div>
              <button onClick={()=>{
                this.getGardens()
                this.setState({show_gardens: true})}}>View all gardens</button>
              
                {this.state.show_gardens && this.state.all_gardens.length &&(
                  <div className="all-gardens">
                    {this.state.all_gardens.map((garden)=>(
                      <li>{garden.garden_name}</li>
                    ))}
                  </div>
                )}
              
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