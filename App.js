import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

import Tarefa from './src/tarefas'

export default function App() {
  const [tarefa, setTarefa] = useState('')

  const [list, setList] = useState([])

  function handleAdd() {
    if (tarefa === '') {
      return
    }

    const dados = {
      key: Date.now(),
      item: tarefa,
    }

    setList((oldArray) => [dados, ...oldArray])

    setTarefa('')
  }

  function handleDelete(item) {
    let filtroItem = list.filter((tarefa) => {
      return tarefa.item !== item
    })

    setList(filtroItem)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Varejão das Bebidas</Text>
      <Text style={styles.subTitle}>Tarefas</Text>

      <View style={styles.containerInput}>
        <TextInput
          placeholder="Digite sua tarefa..."
          style={styles.input}
          value={tarefa}
          onChangeText={(text) => setTarefa(text)}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Tarefa data={item} deleteItem={() => handleDelete(item.item)} />
        )}
        style={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22272e',
    paddingTop: 28,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#c32113',
    marginTop: '5%',
    paddingStart: '5%',
    marginBottom: 12,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFF',
    marginTop: '1%',
    paddingStart: '5%',
    marginBottom: 12,
  },
  containerInput: {
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  input: {
    width: '75%',
    backgroundColor: '#FBFBFB',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  buttonAdd: {
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  list: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingStart: '4%',
    paddingEnd: '4%',
  },
})
