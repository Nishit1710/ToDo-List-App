import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native';                  
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ToDoList({ tasks, deleteTask, editTask, darkMode }) {
  return (
      <ScrollView>
        {tasks.map((task, index) => (
          <View key={index} style={darkMode ? styles.taskDark : styles.taskLight}>
            <Text style={darkMode ? styles.taskTextDark : styles.taskTextLight}>{task}</Text>
            <Menu>
              <MenuTrigger>
                <Ionicons name="ellipsis-vertical" size={24} color={darkMode ? "#fff" : "#333"} />
              </MenuTrigger>
              <MenuOptions customStyles={darkMode ? darkMenuOptionsStyles : lightMenuOptionsStyles}>
                <MenuOption onSelect={() => editTask(index)}>
                  <Ionicons name="create" size={24} color={darkMode ? "#f5deb3" : "#333"} />
                </MenuOption>
                <MenuOption onSelect={() => deleteTask(index)}>
                  <Ionicons name="trash-bin" size={24} color={darkMode ? "#f5deb3" : "#333"} />
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        ))}
      </ScrollView>
  );
}

const darkMenuOptionsStyles = {
  optionsContainer: {
    backgroundColor: '#494949', 
  },
};

const lightMenuOptionsStyles = {
  optionsContainer: {
    backgroundColor: '#fff',
  },
};

const styles = StyleSheet.create({
    taskLight: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#c5cae9', 
      marginVertical: 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
    taskDark: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#333', 
      marginVertical: 10,
      borderRadius: 5,
    },
    taskTextLight: {
      fontSize: 18,
      color: '#333',
    },
    taskTextDark: {
      fontSize: 18,
      color: '#f5f5f5',
    },
    menuTextLight: {
      fontSize: 18,
      color: '#333',
    },
    menuTextDark: {
      fontSize: 18,
      color: '#f5f5f5',
    },
});

export default ToDoList;