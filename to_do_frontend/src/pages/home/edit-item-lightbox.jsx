import React, { useState } from "react";
import "./add-item-lightbox.css"; 
//lightbox used for editing todos has same styles as lightbox used for adding todos

import { useMutation } from "@apollo/client";
import { UPDATE_TO_DO } from "../../GraphQL/Mutations";

import exitIcon from "../../assets/close.svg";

function EditItemLightbox(props) {
    const [updateToDo, { error }] = useMutation(UPDATE_TO_DO);

    const [descriptionValue, setDescriptionValue] = useState(props.itemDesc);
    const [priorityValue, setPriorityValue] = useState(props.itemPriority);
    const [statusValue, setStatusValue] = useState(props.itemStatus);

    const updateListItem = () => {
        updateToDo({
            variables: {
                id: props.id,
                description: descriptionValue,
                priority: priorityValue,
                status: statusValue
            }
        })
    }

    function submitUpdateToDo() {
        if ((!priorityValue) || (!descriptionValue) || (!statusValue)) return;
        else updateListItem();
    }

    return (
        <div className="lightbox-overlay">
            <div className="lightbox-container">
                <div className="lightbox-header">
                    <h1 className="lightbox-title">Edit Task</h1>
                    <img src={exitIcon} onClick={() => props.setEditItemVisibility((originalVisibility) => !originalVisibility)}/>
                </div>
                <form className="create-form">
                    <div className="priority-form">
                        <label className="priority-label">Priority</label>
                        <select id="priority" defaultValue={priorityValue} required onChange={(e) => setPriorityValue(e.target.value)}>
                            <option value="">Select</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="priority-form">
                        <label className="priority-label">Status</label>
                        <select id="priority" defaultValue={statusValue} required onChange={(e) => setStatusValue(e.target.value)}>
                            <option value="">Select</option>
                            <option value="backlog">Backlog</option>
                            <option value="in progress">In Progress</option>
                            <option value="under review">Under Review</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <label htmlFor="desc-input" className="desc-label">To Do Description</label>
                    <textarea id="desc-input" type="text" required onChange={(e) => setDescriptionValue(e.target.value)}
                    defaultValue={descriptionValue}></textarea>
                    <button className="create-todo-button" onClick={submitUpdateToDo}>Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditItemLightbox;