// @flow
import * as React from "react";
import { TodoItemForm } from "../TodoItemForm/TodoItemForm";

type NewTodoItemProps = {
    onInsert: (data: TodoItem) => mixed
};

type NewTodoItemState = {
    isOpen: boolean
};

export class NewTodoItem extends React.Component<NewTodoItemProps, NewTodoItemState> {
    state = {
        isOpen: false
    };
    render(){
        return(
            <div>
                <button onClick={() => this.setState({isOpen: !this.state.isOpen})}>Add new task</button>
                {
                    this.state.isOpen
                    ? <TodoItemForm
                    onUpdate={this.props.onInsert}/>
                    : ""
                } 
            </div>
        );
    }
}