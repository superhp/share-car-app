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
            <form onSubmit={this.handleSubmit.bind(this)}>
                Address: <input type="text" name="address" defaultValue={""}/>
                <br/>
                Ride Id: <input type="text" name="rideId" defaultValue={""}/>
                <br/>
             
                <button>Save</button>
            </form>
        );
    }
}
export default RequestForm;