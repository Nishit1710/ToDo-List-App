import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Pressable } from 'react-native';
import ToDoList from './components/ToDoList';
import ToDoForm from './components/ToDoForm';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MenuProvider } from 'react-native-popup-menu';

function App() {
    const [tasks, setTasks] = useState([
        'Do laundry',
        'Go to gym',
        'Walk dog'
    ]);

    const [darkMode, setDarkMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const addTask = (taskText) => {
        if (!tasks.includes(taskText)) {
            setTasks([...tasks, taskText]);
            return true;
        }
        return false;
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((task, i) => i !== index));
    };

    const editTask = (index) => {
        setEditIndex(index);
    };

    const updateTask = (newTask) => {
        setTasks(tasks.map((task, i) => (i === editIndex ? newTask : task)));
        setEditIndex(null);
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <MenuProvider>
            <SafeAreaView style={darkMode ? styles.containerDark : styles.containerLight}>
                <Text style={darkMode ? styles.titleDark : styles.titleLight}>To Do App</Text>
                <Pressable onPress={toggleTheme} style={styles.themeIcon}>
                    <Ionicons name={darkMode ? "sunny" : "moon"} size={24} color={darkMode ? "#fff" : "#333"} />
                </Pressable>
                <ToDoForm tasks={tasks} addTask={addTask} updateTask={updateTask} editIndex={editIndex} setEditIndex={setEditIndex} darkMode={darkMode} />
                <ToDoList tasks={tasks} deleteTask={deleteTask} editTask={editTask} darkMode={darkMode}/>
            </SafeAreaView>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    titleLight: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    titleDark: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#f5f5f5',
    },
    containerLight: {
        flex: 1,
        backgroundColor: '#e8eaf6', 
        padding: 20,
    },
    themeIcon: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    containerDark: {
        flex: 1,
        backgroundColor: '#494949', 
        padding: 20,
    },
});

export default App;