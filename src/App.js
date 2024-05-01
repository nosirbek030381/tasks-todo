import { Button, TextField } from '@mui/material';
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import './App.css';
import Todo from './components/todo';
import { db } from './firebase.js';

const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		const unsubscribe = onSnapshot(q, snapshot => {
			setTodos(
				snapshot.docs.map(doc => ({
					id: doc.id,
					item: doc.data(),
				}))
			);
		});

		// Cleanup function to unsubscribe from snapshot listener
		return () => unsubscribe();
	}, []); // Runs only once on component mount

	const addTodo = e => {
		e.preventDefault();
		addDoc(collection(db, 'todos'), {
			todo: input,
			completed: false, // Initialize with completed: false
			timestamp: serverTimestamp(),
		});
		setInput('');
	};

	return (
		<div className='App'>
			<h2>TODO List App</h2>
			<form onSubmit={addTodo}>
				<TextField
					id='outlined-basic'
					label='Make Todo'
					variant='outlined'
					style={{ margin: '0px 5px' }}
					size='small'
					value={input}
					onChange={e => setInput(e.target.value)}
				/>
				<Button type='submit' variant='contained' color='primary'>
					Add Todo
				</Button>
			</form>
			<ul>
				{todos.map(item => (
					<Todo key={item.id} arr={item} />
				))}
			</ul>
		</div>
	);
}

export default App;
