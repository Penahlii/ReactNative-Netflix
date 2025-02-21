import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../authorization/components/Input';

const Todo = () => {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const API_URL = 'http://192.168.1.110:5002/cards';

  const getTodos = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (response.ok) {
        getTodos();
        setTodo({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async id => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        getTodos();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Todo</Text>

      <Input
        name="title"
        setFormData={setTodo}
        value={todo?.title}
        placeholder="Enter title"
      />

      <Input
        name="description"
        setFormData={setTodo}
        value={todo?.description}
        placeholder="Enter description"
      />

      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      <FlatList
        ListHeaderComponent={() => <Text style={styles.subtitle}>Todos</Text>}
        contentContainerStyle={styles.listContainer}
        data={todos}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={styles.todoCard}>
            <View style={styles.todoTextContainer}>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <Text style={styles.todoDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTodo(item._id)}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
    alignSelf: 'center',
    paddingTop: 30,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  listContainer: {
    gap: 16,
    paddingBottom: 20,
  },
  todoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  todoDescription: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
