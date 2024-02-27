import React, { ReactNode, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
	const [data, setData] = useState([]);
    const [createInput, setCreateInput] = useState('');
    const [updateInput, setUpdateInput] = useState('');
	
	useEffect(() => {
		fetchData();
	}, []);
	
	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/read');
			const jsonData = await response.json();
			setData(jsonData);
		} catch (error) {
			console.error(error);
		}
	};
	
    const handleCreate = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: createInput }),
            });
            const jsonData = await response.json();
            console.log(jsonData);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };
	
	const handleRead = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/read');
			const jsonData = await response.json();
			console.log(jsonData);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};
	
	const handleDelete = async (id: any) => {
		try {
			const response = await fetch(`http://localhost:5000/api/delete/${id}`, {
				method: 'DELETE',
			});
			const jsonData = await response.json();
			console.log(jsonData);
			fetchData();
		} catch (error) {
			console.error(error);
		}
	};
	
    const handleUpdate = async (id: any) => {
        try {
            const response = await fetch(`http://localhost:5000/api/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: updateInput }),
            });
            const jsonData = await response.json();
            console.log(jsonData);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };
	
	
	interface DataItem {
		_id: ReactNode;
		id: any;
		name: string;
	}

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setCreateInput(text)}
                value={createInput}
                placeholder="Enter name for create"
            />
            <Button title="Create" onPress={handleCreate} />
            <Button title="Read" onPress={handleRead} />
            {data.map((item: DataItem) => (
        <View key={item._id}>
                    <Text>{item.name}</Text>
                    <Text>{item._id}</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setUpdateInput(text)}
                        value={updateInput}
                        placeholder="Enter name for update"
                    />
                    <Button title="Delete" onPress={() => handleDelete(item._id)} />
                    <Button title="Update" onPress={() => handleUpdate(item._id)} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});