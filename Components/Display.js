import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ListItem from './ListItem'
function Display(props) {
  return (
    <View style={styles.display}>
        {
            props.history.map((element, idx) => {
                return <ListItem key={idx} theme={props.theme} title= {element.title} subtitle={element.subTitle}/>
            })
        }
    </View>
  )
}
const styles = StyleSheet.create({
    display:{
        flex:4,
        overflow:'hidden',
        justifyContent:'flex-end'
    }
})

export default Display