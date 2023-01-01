import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import Colors from '../Colors/Colors'
function ListItem(props) {
  const styles = StyleSheet.create({
    text:{
      padding:2,
      paddingHorizontal:4,
      textAlign:'right'
    },
    title:{
      fontSize:32,
      color:props.theme=="dark"?Colors.dark.primary:Colors.light.primary
    },
    subTitle:{
      fontSize:24,
      color:Colors.dull
    }
  })
  return (
    <View>
        <Text style={{...styles.text,...styles.title}}>{props.title}</Text>
        <Text style={{...styles.text,...styles.subTitle}}>{props.subtitle}</Text>
    </View>
  )
}
export default ListItem