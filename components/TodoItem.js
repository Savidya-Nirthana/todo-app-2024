import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

const styles = StyleSheet.create({
    todoItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingLeft: 5,
      paddingHorizontal: 12,
      marginVertical: 5,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    priorityLine: {
      width: 13, // Width of the priority line
      height: '100%',
      backgroundColor: 'pink', // Pink color for decoration
      marginRight: 10,
      marginLeft: 1, // Space between line and checkbox
      borderBottomLeftRadius: 10,
     // borderTopLeftRadius: 15,

    },  
    checkboxContainer: {
      marginRight: 10,
    },
    contentContainer:{
      flex:1,
    },
    todoItemText: {
     // flex: 1,
      fontSize: 16,
      color: '#333',
    },
    completed: {
      textDecorationLine: 'line-through',
      color: '#999',
      
    },
    buttonContainer: {
      flexDirection: 'column',
      alignItems: 'left',
      justifyContent:'left',
      
    },
    editButton: {
      backgroundColor: '#00BFFF',
      paddingVertical: 3,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginRight: 1,
      marginBottom:5,
    },
    editButtonText: {
      color: '#fff',
      fontSize: 13,
      paddingHorizontal: 5,
      paddingVertical: 3,
    },
    deleteButton: {
      backgroundColor: '#FF6347',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 12,
    },
    // New style for date and time
    dateText: {
    fontSize: 12,  // Smaller font size for date and time
    color: '#888',  // Lighter color for date and time
    marginTop: 3,
  },
  categoryText: {
    fontSize: 12, // Smaller font size for category
    color: '#888', // Lighter color for category
  },
  });
  

export default function TodoItem({ task, deleteTask,editTask, toggleCompleted, priority }) {
  const taskDate = "2024-09-16";
  const taskTime = "10:30 AM";
  const taskCategory = "Personal"; // Example category
    return (
     
        <View style={styles.todoItem}>
       <View style={styles.priorityLine}></View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={task.completed}
            onValueChange={() => toggleCompleted(task.id)}
            tintColors={{ true: '#4CAF50', false: '#ccc' }} // Green when checked
          />
        </View>
         {/* Content containing task name and date/time */}
      <View style={{ flex: 1 }}>
        {/* Task Text */}
        <Text style={[styles.todoItemText, task.completed && styles.completed]}>
          {task.text}
        </Text>
        {/* Decorative Date and Time (smaller and lighter) */}
        <Text style={styles.dateText}>
          {taskDate} at {taskTime}
        </Text>
        <Text style={styles.categoryText}>
            {taskCategory}
          </Text>
      </View>
      <View style={styles.buttonContainer}>
      {/* Decorative Edit Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>

      {/* Functional Delete Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(task.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
      </View> 
      </View>

      
    );

  }