import { useEffect, useState } from 'react';
import { StyleSheet, Platform,StatusBar, View,Text, Appearance, SafeAreaView } from 'react-native';
import Display from './Components/Display';
import Keyboard from './Components/Keyboard';
import Colors from './Colors/Colors';
import { evaluate, round } from 'mathjs';
export default function App() {
  const [expression, setExpression] = useState("")
  const [history, setHistory] = useState([])
  const [res, setRes] = useState("")
  const [isC, setIsC] = useState(true)
  const [displayResult, setDisplayResult] = useState(false)
  const [theme, setTheme] = useState(Appearance.getColorScheme())
  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme)
  })

  const styles = StyleSheet.create({
    topContainer:{
      flex:1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: theme=="dark"?Colors.dark.secondary:Colors.light.secondary
    },
    container: {
      backgroundColor: theme=="dark"?Colors.dark.secondary:Colors.light.secondary,
      display: 'flex',
      flex: 1
    },
    result:{
      textAlign:'right',
      flex:displayResult?1:0,
      fontSize:displayResult?42:22,
      color:displayResult?theme=="dark"?Colors.dark.primary:Colors.light.primary:Colors.dull,
      paddingHorizontal:4,
      paddingVertical:2,
    },
    expression:{
      display:'flex',
      flex:displayResult?0:1,
      fontSize:displayResult?30:42,
      color:displayResult?Colors.dull:theme=="dark"?Colors.dark.primary:Colors.light.primary,
      textAlignVertical:'center',
      textAlign:'right',
      paddingVertical:2,
      paddingHorizontal:4,
    }
  });
  useEffect(() => {
    try{
      let result = evaluate(expression);
      if(result != undefined)
        setRes(""+round(result,2))
    }catch(e){}
  }, [expression])
  
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <Display history={history} theme={theme}/>
          <Text style={styles.expression}>{expression}</Text>
          <Text style={styles.result}>{
            res.length > 0?"= "+res:""
          }</Text>
          <Keyboard res={res} displayResult={displayResult} setDisplayResult={setDisplayResult} setIsC={setIsC} isC={isC} setRes={setRes} theme={theme} setExpression = {setExpression} expression={expression} setHistory={setHistory} history={history}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

