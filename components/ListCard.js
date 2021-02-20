import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ListCard(props) {
  const { listItem, listId } = props;
  const isSelected = listId.includes(listItem.id);
  return (
    <View style={styles.listContent}>
      <View style={styles.leftView}>
        <View style={styles.square} />
        <Text style={styles.listText}>{listItem.name}</Text>
      </View>
      <View style={isSelected ? styles.fillCircle : styles.circle} />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 15,
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderColor: '#f6f6f6',
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    height: 24,
    width: 24,
    backgroundColor: 'rgba(85, 188, 246, 0.4)',
    marginRight: 15,
    borderRadius: 5,
  },
  listText: {
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'capitalize',
    maxWidth: '80%',
  },
  circle: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'rgba(85, 188, 246, 0.4)',
  },
  fillCircle: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'rgba(85, 188, 246, 1)',
    backgroundColor: 'rgba(85, 188, 246, 1)'
  }
});
