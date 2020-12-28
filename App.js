import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  state = {
    items: [],
    item: ''
  }

  const [items, setItems] = useState([])
  const [item, setItem] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('items')
      .then(itemsJSON => {
        if (itemsJSON) {
          setItems(JSON.parse(itemsJSON))
          console.log('itm => ' + JSON.parse(itemsJSON))
        }
      })
  }, [])



  const onChangeText = text => {
    setItem(text)
  }

  const onNewItem = e => {
    const arr = [item, ...items];
    setItems(arr)
    setItem('')
    save(arr);
  }

  const save = (arr) => {
    console.log('items arr=> ', JSON.stringify(arr))
    AsyncStorage.setItem('items', JSON.stringify(arr))
  }

  const renderRow = (item, index) => {
    console.log('items => ', JSON.stringify(item))
    return (
      <View style={styles.item}>
        <Text style={styles.itemText} >{item.item}</Text>
        <TouchableOpacity style={styles.doneButton}
          onPress={() => {
            items.splice(index, 1)
            setItems([...items])
            save(items);
          }}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}  >
        <Text style={styles.title}>ToDo</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onSubmitEditing={onNewItem}
        placeholder='Add New Item'
        returnKeyType="done"
        onChangeText={onChangeText}
        value={item}
      />

      <FlatList
        data={items}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    padding: 10,
    paddingTop: 30,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20
  },
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    flex: 1,
  },
  doneButton: {
    padding: 10,
    backgroundColor: '#eaeaea'
  }
});