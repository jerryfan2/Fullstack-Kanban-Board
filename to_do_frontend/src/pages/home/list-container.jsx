import React, { useState, useContext } from "react";
import "./list-container.css";

import addIcon from "../../assets/plus.svg";

import ListItem from "./list-item.jsx";

import { UserContext } from "../../App.jsx";

function ListContainer(props) {
    const [searchItemTerm, setSearchItemTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const { user, setUser } = useContext(UserContext);

    const renderToDoItems = (items) => {
        return items.filter(item => {
            return ((searchItemTerm === "") || (item["description"].toLowerCase().includes(searchItemTerm.toLowerCase())));
        }).filter(item => {
            return ((priorityFilter === "") || (item["priority"] === priorityFilter));
        }).map(item => 
        <ListItem key={ item["id"] } id={ item["id"] } itemDesc={ item["description"] } 
        itemPriority={ item["priority"] } itemStatus={ item["status"] } itemOwner={ item["owner"] } />)
    }

    return (
        <div className="listContainer">
            <div className="listHeader">
                <h1 className="listTitle">Create To Do</h1>
                {user &&
                <img className="addToList" src={addIcon} alt="Add Item" 
                onClick={() => props.setAddItemVisibility((originalVisibility) => !originalVisibility)}/>
                }
            </div>
            <div className="itemFilters">
                <input className="listFilterInput" type="text" placeholder="Search" 
                onChange={e => setSearchItemTerm(e.target.value)} />
                <select className="priorityFilterInput" defaultValue="" onChange={e => setPriorityFilter(e.target.value)}>
                    <option value=""></option>
                    <option value="low">L</option>
                    <option value="medium">M</option>
                    <option value="high">H</option>
                </select>
            </div>
            <div className="toDoItemsContainer">
                {renderToDoItems(props.toDoItems)}
            </div>
        </div>
    )
}

export default ListContainer;