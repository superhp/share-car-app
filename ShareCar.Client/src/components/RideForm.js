// @flow
import * as React from "react";
//import * as todoItem from "../../data/todoItem";
//import { StatusInput } from "../TodoItem/StatusInput";
//import { Loader } from "../Loader";
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
export class TodoItemForm extends React.Component<TodoItemFormProps, TodoItemFormState>{
    state = {
        isLoading: true
    }
    async componentDidMount() {
        if (this.props.onFullDataRequest !== undefined) {
            const data = await this.props.onFullDataRequest();
            await new Promise(resolve => setTimeout(resolve, 1000)); //sleep 1000ms
            this.setState({isLoading: false, todoItem: data});
        } else {
            this.setState({...this.state, isLoading: false});
        }
    }
    handleSubmit(e: any) {
        e.preventDefault();
        const newData = {
            id: this.props.todoItemRef !== undefined ? this.props.todoItemRef.id : 0, // TODO: fix this
            title: e.target.title.value,
            description: e.target.description.value,
            priority: e.target.priority.value,
            status: e.target.status.value
        };

        this.props.onUpdate(newData);
    }
    render(){
        if (this.state.isLoading) {
            return <Loader />;
        }
        const item: TodoItem = {...this.state.todoItem};
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                Title: <input type="text" name="title" defaultValue={item.title}/>
                <br/>
                Description: <input type="text" name="description" defaultValue={item.description}/>
                <br/>
                Status: <StatusInput status={item.status}/>
                <br/>
                Priority: <select name="priority" defaultValue={item.priority}>
                {
                    todoItem.Priority.map((x,i) =>
                    <option key={i} value={x}>{x}</option>)
                }
                </select>
                <br/>
                <button>Save</button>
            </form>
        );
    }
}