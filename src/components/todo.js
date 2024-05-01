import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase.js';

const Todo = ({ arr }) => {
	const [completed, setCompleted] = useState(arr.item.completed);

	const handleCheck = async () => {
		await updateDoc(doc(db, 'todos', arr.id), {
			completed: !completed,
		});
		setCompleted(!completed);
	};

	return (
		<List className='todo__list'>
			<ListItem style={{ opacity: completed ? 1 : 0.5, cursor: 'pointer' }}>
				<ListItemAvatar>
					<CheckIcon
						style={{ opacity: completed ? 1 : 0.5, cursor: 'pointer' }}
						onClick={handleCheck}
					/>
				</ListItemAvatar>
				<ListItemText primary={arr.item.todo} secondary={completed ? arr.item.todo : 'Completed'} />
			</ListItem>

			<DeleteIcon
				fontSize='large'
				style={{ opacity: 0.7, cursor: 'pointer' }}
				onClick={() => {
					deleteDoc(doc(db, 'todos', arr.id));
				}}
			/>
		</List>
	);
};
export default Todo;
