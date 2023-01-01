import {useEffect, useState} from 'react'
import Button from './Button'
import { View, StyleSheet } from 'react-native'
import { evaluate, round,pi,e } from 'mathjs'
function Keyboard(props) {

  const [toggle, setToggle] = useState(false)
  const [toggleS, setToggleS] = useState(false);
  const [newExpresion, setNewExpression] = useState("");
  const [error, setError] = useState("");
  const [keyPressed, setKeyPressed] = useState("")

  const [clickedEqual, setClickedEqual] = useState(false);
  const toggleMe = (key) =>{
    setToggle(!toggle);
  }
  const toggleSins = (key) =>{
    setToggleS(!toggleS);
  }
  useEffect(() => {
    if(clickedEqual){
        let result = null
        try{
            result = round(evaluate(props.expression),4)
        }catch(e){
            result = "Error"
        }
        let historyElem = {
            title: props.expression,
            subTitle: result
        }
        props.setHistory([...props.history, historyElem])
        props.setRes(""+result)
        props.setDisplayResult(true)
        setClickedEqual(false)
    }
  }, [clickedEqual])
  
  useEffect(() => {
    props.setExpression(newExpresion)
  }, [newExpresion])
  
  useEffect(() => {
    if(error){
        props.setRes("")
        props.setExpression(""+keyPressed)
        setError(false)
    }
  }, [error])
  
  const keypressed = (key)=>{
    if(props.res == "Error"){
        if(key !="C" && key != "AC" && key != "<=" && key != "=")
            setKeyPressed(key)
        else
            setKeyPressed("")
        setError(true)
    }
    if(props.displayResult && !isNaN(parseFloat(key)))
        setNewExpression(""+key)
    else if(props.displayResult && key !="C" && key != "AC" && key != "<=" && key != "=")
        setNewExpression(props.res+key)

    props.setDisplayResult(false)
    if(key == "C"){
        props.setExpression("")
        props.setRes("")
        props.setIsC(false)
    }else if(key == "AC"){
        props.setExpression("")
        props.setRes("")
        props.setHistory([])
    }else if(key == "<="){
        props.setExpression(props.expression.slice(0, -1));
        if(props.expression.length == 1) 
            props.setRes("");
    }else if(key == "="){
        if(props.expression.length > 0){
            setClickedEqual(true);
        }
    }else{
        props.setExpression(props.expression+key);
        props.setIsC(true);
    }
  }
  const styles = StyleSheet.create({
    rows:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-around',
    },
    keyboard:{
        flex:toggle?7:5,
        justifyContent:'space-around',
        borderTopWidth:1,
        borderTopColor:'grey'
    }
    })
  return (
    <View style ={styles.keyboard}>
        {toggle?<View style={styles.rows}>
            <Button theme={props.theme} text="2nd" onClick={toggleSins} toggledButton={true}/>
            <Button theme={props.theme} text="cbrt"  onClick={keypressed} toggledButton={true} value="cbrt("/>
            <Button theme={props.theme} text={toggleS?"asin":"sin"} onClick={keypressed} toggledButton={true} value= {toggleS?"asin(":"sin("}/>
            <Button theme={props.theme} text={toggleS?"acos":"cos"} onClick={keypressed} toggledButton={true} value={toggleS?"acos(":"cos("}/>
            <Button theme={props.theme} text={toggleS?"atan":"tan"} onClick={keypressed} toggledButton={true} value={toggleS?"atan(":"tan("}/>
        </View>:''}
        {toggle?<View style={styles.rows}>
            <Button theme={props.theme} text="xy" onClick={keypressed} hasIcon={true} icon={"exponent"} toggledButton={true} value="^"/>
            <Button theme={props.theme} text="lg" onClick={keypressed} toggledButton={true} value="log2("/>
            <Button theme={props.theme} text="ln" onClick={keypressed} toggledButton={true} value="log10("/>
            <Button theme={props.theme} text="(" onClick={keypressed} toggledButton={true} value="("/>
            <Button theme={props.theme} text=")" onClick={keypressed} toggledButton={true} value=")"/>
        </View>:''}
        <View style={styles.rows}>
            {toggle?<Button theme={props.theme} text="r(x)" icon={"square-root"} hasIcon={true} onClick={keypressed} toggledButton={true}  value="sqrt("/>:''}
            <Button primary={true} theme={props.theme} text={props.isC?"C":"AC"} onClick={keypressed}/>
            <Button primary={true} theme={props.theme} text="<=" icon={"backspace-outline"} hasIcon={true} onClick={keypressed}/>
            <Button primary={true} theme={props.theme} text="%" onClick={keypressed}/>
            <Button primary={true} theme={props.theme} text="/" onClick={keypressed}/>
        </View>
        <View style={styles.rows}>
            {toggle?<Button theme={props.theme} text="X!" onClick={keypressed} toggledButton={true} value="!"/>:''}
            <Button theme={props.theme} text="7" onClick={keypressed}/>
            <Button theme={props.theme} text="8" onClick={keypressed}/>
            <Button theme={props.theme} text="9" onClick={keypressed}/>
            <Button primary={true} theme={props.theme} text="*" onClick={keypressed}/>
        </View>
        <View style={styles.rows}>
            {toggle?<Button theme={props.theme} text="1/x" onClick={keypressed} toggledButton={true} value='^(-1)'/>:''}
            <Button theme={props.theme} text="4" onClick={keypressed}/>
            <Button theme={props.theme} text="5" onClick={keypressed}/>
            <Button theme={props.theme} text="6" onClick={keypressed}/>
            <Button primary={true} theme={props.theme} text="-" onClick={keypressed}/>
        </View>
        <View style={styles.rows}>
            {toggle?<Button theme={props.theme} text="PI" onClick={keypressed} toggledButton={true} value={round(pi,2)}/>:''}
            <Button theme={props.theme} text="1" onClick={keypressed}/>
            <Button theme={props.theme} text="2" onClick={keypressed}/>
            <Button theme={props.theme} text="3" onClick={keypressed}/>
            <Button primary={true} theme={props.theme} text="+" onClick={keypressed}/>
        </View>
        <View style={styles.rows}>
            <Button primary={true} hasIcon={true} icon={"swap-horizontal"} theme={props.theme} text="<>" onClick={toggleMe}/>
            {toggle?<Button theme={props.theme} text="e" onClick={keypressed} toggledButton={true} value={round(e,2)}/>:''}
            <Button theme={props.theme} text="0" onClick={keypressed}/>
            <Button theme={props.theme} text="." onClick={keypressed}/>
            <Button primary={true} theme={props.theme} text="=" onClick={keypressed}/>
        </View>
    </View> 
  )
}


export default Keyboard