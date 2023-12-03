import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Status = ({ status, tasks }) => {
	return (
		<div
			style={{
				margin: 8,
				padding: 8,
				width: "250px",
				border: "1px solid lightgrey",
				borderRadius: "2px",
			}}
		>
			<h2>{status.title}</h2>
			<Droppable droppableId={status.id}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						style={{
							background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
							padding: 4,
							minHeight: "200px",
						}}
					>
						{tasks.map((task, index) => (
							<Task key={task.id} task={task} index={index} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Status;
