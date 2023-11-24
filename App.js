import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard } from 'react-native';
import Task from './Components/Tasks';

export default function App() {
  // State variables for tasks, input, edited task, and edited task index
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  // State variable para sa edited task
  const [editedTask, setEditedTask] = useState('');
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);

// Function to handle adding and updating tasks
  const handleAddTask = () => {
    Keyboard.dismiss();
    if (editedTaskIndex !== null) {
      // Update existing task
      const updatedTasks = [...taskItems];
      updatedTasks[editedTaskIndex] = editedTask;
      setTaskItems(updatedTasks);
      setEditedTask('');
      setEditedTaskIndex(null);
    }
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>

      {/* ToDoList */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>
          ToDo<Text style={{fontWeight: "300", color: 'lightblue', fontWeight: '500'}}>Lists</Text>
        </Text>
            
        <View style={styles.items}>
          {/* This is where the tasks go */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task  text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>

      </View>

      {/* Write a task section */}
      {/* Gina make sure na dili ma cover sa keyboard ang items sa screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>

          </View>

          
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#E8EAED',
    backgroundColor: 'black',
  },
  divider: {
    backgroundColor: 'lightblue',
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 50,
    fontWeight: '800',
    color: 'white',
    paddingHorizontal: 90,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor:"#FFF",
    borderRadius: 60,
    borderColor: 'green',
    borderWidth: 1,
    width: 350,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor:'#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 1,


  },
  addText: {},
});
