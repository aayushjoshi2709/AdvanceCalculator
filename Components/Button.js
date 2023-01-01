import React from 'react'
import { TouchableOpacity, Text, View,StyleSheet } from 'react-native'
import Colors from '../Colors/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
function Button(props) {
    const styles = StyleSheet.create({
        button:{
            flex:1,
            justifyContent:'center'
        },
        buttonText:{
            fontSize:props.toggledButton?22:32,
            color:props.primary?Colors.orange:props.theme == "dark"?props.toggledButton?Colors.dull:Colors.dark.primary:props.toggledButton?Colors.dull:Colors.light.primary,
            textAlign:'center'
        }
    })
  return (
    <TouchableOpacity style={styles.button} onPress={()=>props.onClick(props.toggledButton?props.value:props.text)}>
        <View>
            {
            props.hasIcon?<MaterialCommunityIcons name={props.icon} style= {{...styles.buttonText, ...{fontSize:30, fontWeight:'100'}}}/>:<Text style= {styles.buttonText}>
                {props.text}
            </Text>
            }
        </View>
    </TouchableOpacity>
  )
}

export default Button