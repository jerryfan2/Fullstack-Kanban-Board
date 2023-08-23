# Fullstack-Kanban-Board
A Kanban board webpage built using the MERN tech stack (MongoDB, Express.js, React, Node.js) and GraphQL. Webpage includes a list of all todos and a 
Kanban board separating them based on work status. Colours beside each to do item specifies its priority, where red means high, yellow means medium, and green means low.
The Kanban board supports drag and drop functionality of to do items into different work status sections. THe to do list interface allows search bar filtering and filtering
by priority.

User creation and login authentication and authorization is handled with JWT tokens and cookie storage. Creation of to do items is only available when a user is logged in,
and users may only edit or delete a to do if they are the owner/creator of that item.
