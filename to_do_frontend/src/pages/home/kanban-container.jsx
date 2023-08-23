import React, { useContext } from 'react'
import "./kanban-container.css"
import ListItem from "./list-item.jsx"

import { useMutation } from "@apollo/client";
import { UPDATE_TO_DO } from "../../GraphQL/Mutations";

import { UserContext } from "../../App.jsx";

export default function KanbanContainer(props) {
  const [updatePriority, { error }] = useMutation(UPDATE_TO_DO);

  const { user, setUser } = useContext(UserContext);

  const updatePriorityKanban = (id, status) => {
    updatePriority({
      variables: {
        id: id,
        status: status
      }
    })
  }

  const renderToDoItems = (items, status) => {
    return items.filter(item => {
        return (item["status"] === status);
    }).map(item => 
    <ListItem draggable key={ item["id"] } id={ item["id"] } itemDesc={ item["description"] } 
    itemPriority={ item["priority"] } itemStatus={ item["status"] } itemOwner={ item["owner"] } />)
}

const onDragOver = (ev) => {
  ev.preventDefault();
}

const onDrop = (ev, status) => {
  let itemData = JSON.parse(ev.dataTransfer.getData("text"));
  if (itemData["owner"] !== user) return; // prevents query if non-owner drags item
  if (itemData["status"] === status) return; // prevents query if item is dropped on drag location
  updatePriorityKanban(itemData["id"], status);
  window.location.reload();
}

  return (
    <div className="kanban-grid">
        <div className="kanban-header" id="backlog">Backlog</div>
        <div className="kanban-header" id="in-progress">In Progress</div>
        <div className="kanban-header" id="under-review">Under Review</div>
        <div className="kanban-header" id="completed">Completed</div>
        <div className="kanban-items-container" 
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "backlog")}>
          {renderToDoItems(props.toDoItems, "backlog")}
        </div>
        <div className="kanban-items-container" 
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "in progress")}>
          {renderToDoItems(props.toDoItems, "in progress")}
        </div>
        <div className="kanban-items-container" 
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "under review")}>
          {renderToDoItems(props.toDoItems, "under review")}
        </div>
        <div className="kanban-items-container" 
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "completed")}>
          {renderToDoItems(props.toDoItems, "completed")}
        </div>
    </div>
  )
}
