/*
* @bainloko
* DDM I
* 05/10/2021, 29/10/2021, 04/03/2022
*/

import * as React from 'react';
import { View, StatusBar, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

class ChangeInnerHTML extends React.Component {
  state = {style: {}, value: ''}

  innerHTML = (style, html) => {
    this.setState({style: style});
    this.setState({value: html});
  }

  render(){
    return(
      <View>
        <Text style={this.state.style}>{this.state.value}</Text>
      </View>
    );
  } 
} //code courtesy of Akash Mittal https://www.akashmittal.com/react-component-get-element-by-id-code-example-demo/, tweaked by @bemloko

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.componentRef = React.createRef();
  }

  referComponentByRef = (html) => {
    this.componentRef.current.innerHTML(meuEstilo.textoResultado, html); //envia o estilo desejado OBJETO e o código HTML a ser inserido SEM FORMATAÇÃO
  }

  state = {
    valor1: 0.0,
    valor2: 0.0,
    resultado: 0.0
  }

  atualizaValor1 = (number) => {
    this.setState({valor1: parseFloat(number)})
  }

  atualizaValor2 = (number) => {
    this.setState({valor2: parseFloat(number)})
  }
  
  roundAccurately(number, decimalPlaces){
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces); //code courtesy of Jack Moore https://www.jacklmoore.com/notes/rounding-in-javascript/ - in this case, I'll set the decimal places to a constant three, which is fine for me' applications. thanks m8 HUAHUEAHUAEUH
  }

  somar(valor1, valor2){
    this.state.resultado = valor1 + valor2;
    var thingToSay = ("O resultado desta soma é " + this.roundAccurately(this.state.resultado, 3));
    this.referComponentByRef(thingToSay);
    Speech.speak(thingToSay, { language: "pt-BR", pitch: 0.9, rate: 1.2 });
  }

  subtrair(valor1, valor2){
    this.state.resultado = valor1 - valor2;
    var thingToSay = ("O resultado desta subtração é " + this.roundAccurately(this.state.resultado, 3));
    this.referComponentByRef(thingToSay);
    Speech.speak(thingToSay, { language: "pt-BR", pitch: 0.9, rate: 1.2 });
  }

  multiplicar(valor1, valor2){
    this.state.resultado = valor1 * valor2;
    var thingToSay = ("O resultado desta multiplicação é " + this.roundAccurately(this.state.resultado, 3));
    this.referComponentByRef(thingToSay);
    Speech.speak(thingToSay, { language: "pt-BR", pitch: 0.9, rate: 1.2 });
  }

  dividir(valor1, valor2){
    this.state.resultado = valor1 / valor2;
    var thingToSay = ("O resultado desta divisão é " + this.roundAccurately(this.state.resultado, 3));
    this.referComponentByRef(thingToSay);
    Speech.speak(thingToSay, { language: "pt-BR", pitch: 0.9, rate: 1.2 });
  }
  
  render(){
    return(
      <View style={meuEstilo.container}>
        <StatusBar />
        <View><Text><Text style={meuEstilo.textoInicial}>Operações Matemáticas...</Text></Text></View>
        <TextInput style={meuEstilo.inputExemplo} underlineColorAndroid="transparent" placeholder="Digite o primeiro valor" autoCapitalize="none" onChangeText={this.atualizaValor1} keyboardType="numeric" />
        <TextInput style={meuEstilo.inputExemplo2} underlineColorAndroid="transparent" placeholder="Digite o segundo valor" autoCapitalize="none" onChangeText={this.atualizaValor2} keyboardType="numeric" />
        <ChangeInnerHTML ref={node => this.componentRef.current = node} />
        <View style={meuEstilo.viewHr}></View>
        <Pressable style={meuEstilo.botaoExemplo} onPress={() => this.somar(this.state.valor1, this.state.valor2)}>
          <Text style={meuEstilo.fonteExemplo}>Somar</Text>
        </Pressable>
        <Pressable style={meuEstilo.botaoExemplo} onPress={() => this.subtrair(this.state.valor1, this.state.valor2)}>
          <Text style={meuEstilo.fonteExemplo}>Subtrair</Text>
        </Pressable>
        <Pressable style={meuEstilo.botaoExemplo} onPress={() => this.multiplicar(this.state.valor1, this.state.valor2)}>
          <Text style={meuEstilo.fonteExemplo}>Multiplicar</Text>
        </Pressable>
        <Pressable style={meuEstilo.botaoExemplo} onPress={() => this.dividir(this.state.valor1, this.state.valor2)}>
          <Text style={meuEstilo.fonteExemplo}>Dividir</Text>
        </Pressable>
      </View>
    );
  }
}

/** 
* como fazer as operações (funções) fora da classe? R = importar arquivo com as funções e chamá-las em qualquer lugar do código. "import funcaoA from './funcaoA'"
* como verificar erros na entrada de dados? (letras, caracteres especiais no lugar dos números...) - como inserir try catch? R = TypeScript... muito complicado
* como colocar os botões um ao lado do outro? como fazer uma interface de app de verdade? R = ideias (https://www.instamobile.io/react-native-tutorials/best-free-react-native-app-templates-2018/) behance ou aguardar próximas aulas
*/

const meuEstilo = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoInicial: {
    marginBottom: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 21,
    letterSpacing: 0.25,
  },

  inputExemplo: {
    marginTop: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 4,
    elevation: 3,
  },

  inputExemplo2: {
    marginTop: 5,
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 4,
    elevation: 3,
  },

  textoResultado: {
    paddingVertical: 3,
    color: 'black',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },

  viewHr: {
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

  botaoExemplo: {
    backgroundColor: 'black',
    marginTop: 5,
    paddingVertical: 12,
    width: 110,
    borderRadius: 4,
    elevation: 3,
  },

  fonteExemplo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
});