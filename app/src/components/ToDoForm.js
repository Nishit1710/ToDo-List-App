import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

function ToDoForm({ tasks, addTask, updateTask, editIndex, setEditIndex, darkMode }) {
    const [task, setTask] = useState('');

    useEffect(() => {
        if (editIndex !== null) {
            setTask(tasks[editIndex]);
        } else {
            setTask('');
        }
    }, [editIndex]);

    const handleSubmit = () => {
        if (task.trim() === '') {
            Alert.alert('Error', 'Please enter a task.');
            return;
        }

        if (editIndex !== null) {
            updateTask(task);
        } else {
            const wasAdded = addTask(task);
            if (!wasAdded) {
                Alert.alert('Error', 'Task already exists.');
                return;
            }
        }
        setTask('');
    };

    return (
        <View style={darkMode ? styles.formDark : styles.formLight}>
            <TextInput
                style={darkMode ? styles.inputDark : styles.inputLight}
                value={task}
                onChangeText={setTask}
                placeholder="Enter task..."
                placeholderTextColor={darkMode ? "#f5f5f5" : "#333"}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    formLight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        marginBottom: 20,
    },
    formDark: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    inputLight: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        marginRight: 10,
        color: '#333',
    },
    inputDark: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#f5f5f5',
        paddingHorizontal: 10,
        marginRight: 10,
        color: '#f5f5f5',
    },
});

export default ToDoForm;