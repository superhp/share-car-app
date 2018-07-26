// @flow
import * as React from "react";
//import * as todoItem from "../../data/todoItem";
//import { StatusInput } from "../TodoItem/StatusInput";
//import { Loader } from "../Loader";
import axios from 'axios';

/*
type TodoItemFormProps = {
    onUpdate: (item: TodoItem) => mixed,
    todoItemRef?: TodoItemRef,
    onFullDataRequest?: () => Promise<TodoItem>;
};

type TodoItemFormState = {
    isLoading: boolean,
    todoItem?: TodoItem
}
*/
 class RequestForm extends React.Component<{}>{
    //state = {
    //    isLoading: true
   // }
   /*
    async componentDidMount() {
        if (this.props.onFullDataRequest !== undefined) {
            const data = await this.props.onFullDataRequest();
            await new Promise(resolve => setTimeout(resolve, 1000)); //sleep 1000ms
            this.setState({isLoading: false, todoItem: data});
        } else {
            this.setState({...this.state, isLoading: false});
        }
    }*/
    state = {
        requests: []
      }


 showDriverRequests(){
    axios.get('http://localhost:5963/api/Request/driver')
    .then(res => {
      const requests = res.data;
      this.setState({ requests });
    })
};

    // This binding is necessary to make `this` work in the callback
   // this.showPassengerRequests = this.showPassengerRequests.bind(this);
  

  showPassengerRequests(){
    axios.get('http://localhost:5963/api/Request/passenger')
    .then(res => {
      const requests = res.data;
      this.setState({ requests });
    })
};


    handleSubmit(e: any) {
        e.preventDefault();
        const data = {
            rideId: e.target.rideId.value,
            address: e.target.address.value
        };

          axios.post(`http://localhost:5963/api/Request`, { data })
            .then(res => {
              console.log(res);
              console.log(res.data);
            })    }

    render(){

        return(

            <div>

            <form onSubmit={this.handleSubmit.bind(this)}>
                Address: <input type="text" name="address" defaultValue={""}/>
                <br/>
                Ride Id: <input type="text" name="rideId" defaultValue={""}/>
                <br/>
             
                <button>Save</button>       
            </form>

<button>Driver requests</button>       

<button onClick={this.showPassengerRequests}>Passenger requests</button>

    <ul>
    { this.state.requests.map(requests => 
    requests.seenByPassenger 
    ?<li>{requests.requstId}</li>
    : <li>{requests.requstId}</li>
    )
    
    }
    </ul>



</div>

        );
    }
}
export default RequestForm;