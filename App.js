import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
  Button,
} from 'react-native';
import Constants from 'expo-constants';
import ListCard from './components/ListCard';

export default function App() {
  const [items, setItems] = useState();
  const [itemsList, setItemsList] = useState([]);
  const [listId, setListId] = useState([]);
  const getParsetimeStamp = () => {
    const date = new Date();
    const parsetime = Date.parse(date) / 1000;
    return parsetime;
  };
  const handleTextInput = (e) => {
    setItems(e);
  };
  const handleListItem = () => {
    Keyboard.dismiss();
    const id = getParsetimeStamp();
    const objList = {
      id,
      name: items,
    };
    setItemsList((prevState) => [objList, ...prevState]);
    setItems(null);
  };
  const removeItemLists = (id) => {
    const copyListId = [...listId];
    if (!copyListId.includes(id)) {
      setListId((prevState) => [...prevState, id]);
    } else {
      const findIndex = copyListId.indexOf(id);
      copyListId.splice(findIndex, 1);
      setListId(copyListId);
    }
  };
  const removeSelectedList = () => {
    const filterList = itemsList.filter((item) => {
      if (!listId.includes(item.id)) return item;
    });
    setItemsList(filterList);
    setListId([]);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.topContent}>Today’s tasks</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.taskList}>
          {itemsList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onLongPress={() => removeItemLists(item.id)}
            >
              <ListCard listItem={item} listId={listId} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {listId.length === 0 ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputWrapper}
        >
          <TextInput
            onChangeText={handleTextInput}
            style={styles.input}
            placeholder={'Enter your a task'}
            value={items}
          />
          <TouchableOpacity onPress={handleListItem}>
            <View style={styles.button}>
              <Text style={styles.plus}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      ) : (
        <Button
          style={styles.removeButton}
          onPress={removeSelectedList}
          title='Delete'
          color='red'
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    marginTop: Constants.statusBarHeight,
    position: 'relative',
  },
  topContent: {
    paddingTop: 40,
    paddingBottom: 30,
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  taskList: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#E8EAED',
    alignItems: 'center',
  },
  input: {
    width: 250,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: '#FFF',
    borderRadius: 60,
  },
  button: {
    width: 50,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 50,
  },
  removeButton: {
    height: 60,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 28,
    fontWeight: '400',
    color: '#C0C0C0',
  },
});
