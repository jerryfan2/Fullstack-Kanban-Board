import React, { useState, useContext } from 'react';

import "./list-item.css"

import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/delete.svg";

import { useMutation } from "@apollo/client";
import { DELETE_TO_DO } from "../../GraphQL/Mutations";
import EditItemLightbox from './edit-item-lightbox';

import { UserContext } from "../../App.jsx";

function ListItem(props) {

    const [editItemVisibility, setEditItemVisibility] = useState(false);
    const [deleteToDo, { error }] = useMutation(DELETE_TO_DO);

    const { user, setUser } = useContext(UserContext);

    const canUpdateDelete = user === props.itemOwner;

    const deleteListItem = () => {
        deleteToDo({
            variables: {
                id: props.id
            }
        })

        if (error) {
            console.log(error);
        }

        window.location.reload();
    }

    const onDragStart = (ev, id, status, owner) => {
        let itemData = {id: id, status: status, owner: owner};
        ev.dataTransfer.setData("text/plain", JSON.stringify(itemData));
    }

    let bg_color;
    if (props.itemPriority === "low") bg_color = "green";
    if (props.itemPriority === "medium") bg_color = "yellow";
    if (props.itemPriority === "high") bg_color = "red";

    return (
        <>
            <div className="itemContainer" draggable={props.draggable} 
            onDragStart={props.draggable ? (e) => onDragStart(e, props.id, props.itemStatus, props.itemOwner) : null}
            style={{ cursor: props.draggable ? "pointer" : null }}>
                <div className="toDoDesc">
                    {props.itemDesc}
                    <div className="toDoOwner">Owner: {props.itemOwner}</div>
                </div>
                <div className="toDoPriority" style={{ backgroundColor: `${bg_color}`}}></div>
                {canUpdateDelete && 
                <div className="itemIcons">
                    <img src={editIcon} onClick={() => setEditItemVisibility(true)}/>
                    <img src={deleteIcon} onClick={deleteListItem}/>
                </div>}
            </div>
            {editItemVisibility ? <EditItemLightbox id={props.id} itemDesc={props.itemDesc}
            itemPriority={props.itemPriority} itemStatus={props.itemStatus} setEditItemVisibility={setEditItemVisibility}/>: null}
        </>
        
    )
}

export default ListItem;