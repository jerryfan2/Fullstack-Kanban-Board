import React, { useState } from "react";
import "./add-item-lightbox.css";

import { useMutation } from "@apollo/client";
import { CREATE_TO_DO } from "../../GraphQL/Mutations";

import exitIcon from "../../assets/close.svg";

function AddItemLightbox(props) {
    const [createToDo, { error }] = useMutation(CREATE_TO_DO);

    const [descriptionValue, setDescriptionValue] = useState("");
    const [priorityValue, setPriorityValue] = useState("");
    const [statusValue, setStatusValue] = useState("");

    const createListItem = () => {
        createToDo({
            variables: {
                description: descriptionValue,
                priority: priorityValue,
                status: statusValue
            }
        })
    }

    function submitCreateToDo() {
        if ((!priorityValue) || (!descriptionValue) || (!statusValue)) return;
        else createListItem();
    }

    return (
        <div className="lightbox-overlay">
            <div className="lightbox-container">
                <div className="lightbox-header">
                    <h1 className="lightbox-title">Add a Task</h1>
                    <img src={exitIcon} onClick={() => props.setAddItemVisibility((originalVisibility) => !originalVisibility)}/>
                </div>
                <form className="create-form">
                    <div className="priority-form">
                        <label className="priority-label">Priority</label>
                        <select id="priority" defaultValue="" required onChange={(e) => setPriorityValue(e.target.value)}>
                            <option value="">Select</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="priority-form">
                        <label className="priority-label">Status</label>
                        <select id="priority" defaultValue="" required onChange={(e) => setStatusValue(e.target.value)}>
                            <option value="">Select</option>
                            <option value="backlog">Backlog</option>
                            <option value="in progress">In Progress</option>
                            <option value="under review">Under Review</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    
                    <label htmlFor="desc-input" className="desc-label">To Do Description</label>
                    <textarea id="desc-input" type="text" required onChange={(e) => setDescriptionValue(e.target.value)}
                    ></textarea>
                    <button className="create-todo-button" onClick={submitCreateToDo}>Create</button>
                </form>
            </div>
        </div>
    );
}

export default AddItemLightbox;