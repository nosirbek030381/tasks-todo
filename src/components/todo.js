import { Close } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase.js';

const Todo = ({ arr }) => {
	const [completed, setCompleted] = useState(arr.item.todo);

	const handleCheck = async () => {
		await updateDoc(doc(db, 'todos', arr.id), {
			completed: !completed,
		});
		setCompleted(!completed);
	};

	const handleDelete = () => {
		deleteDoc(doc(db, 'todos', arr.id));
	};

	return (
		<List className='todo__list'>
			<ListItem style={{ opacity: completed ? 1 : 0.5, cursor: 'pointer' }}>
				<ListItemAvatar></ListItemAvatar>
				<ListItemText
					primary={arr.item.todo}
					secondary={completed ? arr.item.todo : 'Completed'}
					className={completed ? '' : 'completed'}
				/>
				<Close
					onClick={handleDelete}
					sx={{ opacity: completed ? 1 : 0.5, cursor: 'pointer', color: 'red' }}
				/>
				<CheckIcon
					onClick={handleCheck}
					style={{ opacity: completed ? 1 : 0.5, cursor: 'pointer' }}
				/>
				<DeleteIcon
					onClick={handleDelete}
					fontSize='large'
					style={{ opacity: 0.7, cursor: 'pointer' }}
				/>
			</ListItem>
		</List>
	);
};
export default Todo;
