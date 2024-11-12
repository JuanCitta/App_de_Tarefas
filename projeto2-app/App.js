import React, { Component } from 'react';
import { View, Text, TextInput, Button, Vibration, Alert, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class TelaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      atividades: [],
    };
  }

  

  render() {
    const navega = this.props.navigation.navigate;
    return (
      <View style={estilos.container}>
        <Text style={estilos.titulo}>Jornal de Tarefas</Text>
        
        <TouchableOpacity style={estilos.botao} onPress={() => navega('Adicionar Atividade')}>
          <Text style={estilos.txtbotao}>Adicionar Atividade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botao} onPress={() => navega('Jornal de Atividades')}>
          <Text style={estilos.txtbotao}>Ver Jornal</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

class AdicionarAtividadeTela extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoAtividade: '',
      dataAtividade: '',
      ativiades : []
    };
  }
  
  salvarAtividade = async () => {
    const textoAtividade = this.state.textoAtividade;
    const dataAtividade = this.state.dataAtividade;


    if (!textoAtividade || !dataAtividade) {
      alert('Preencha todos os campos');
      return;
    }

    const novaAtv = `${textoAtividade} - ${dataAtividade}`;
    const dados = await AsyncStorage.getItem('atividades');
    const atividades = dados ? dados.split('|') : [];
    const novoatividades = [...atividades, novaAtv];
    await AsyncStorage.setItem('atividades', novoatividades.join('|'))

    Vibration.vibrate(1000);
    this.setState({ textoAtividade: '', dataAtividade: '' });
    this.props.navigation.navigate('Tela Inicial');
  };

  render() {
    return (
      <View style={estilos.container}>
        <Text style={{fontSize: 18, paddingBottom:30}}>Insira a atividade:</Text>
        <TextInput
          style={estilos.input}
          placeholder="Atividade..."
          value={this.state.textoAtividade}
          onChangeText={(text) => this.setState({ textoAtividade: text })}
        />
        <TextInput
          style={estilos.input}
          placeholder="Data..."
          value={this.state.dataAtividade}
          onChangeText={(text) => this.setState({ dataAtividade: text })}
        />
        <TouchableOpacity style={estilos.botao} onPress={this.salvarAtividade}>
          <Text style={estilos.txtbotao}>Salvar Atividade</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class HistoricoAtividadesTela extends Component {
  constructor(props) {
    super(props);
    this.state = {
      atividades: [],
    };
  }

  componentDidMount() {
    this.carregarAtividades();
  }

  carregarAtividades = async () => {
    const dadosArmazenados = await AsyncStorage.getItem('atividades');
    const atividades = dadosArmazenados ? dadosArmazenados.split('|') : [];
    this.setState({ atividades });
  };

  render() {
    return (
      <ScrollView style={estilos.container}>
        <Text style={{ fontSize: 24 }}>Histórico de Atividades</Text>
        {this.state.atividades.map((atividade, index) => (
          <View key={index} style={estilos.atividadecontainer}>
            <Text style={{fontWeight: 'bold'}}>{atividade.split(' - ')[0]} </Text>
            <Text style={{fontSize: 14}}>{atividade.split(' - ')[1]} </Text>
            
          </View>
        ))}
      </ScrollView>
    );
  }
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tela Inicial" component={TelaInicial} options = {{headerShown:false}} />
        <Stack.Screen name="Adicionar Atividade" component={AdicionarAtividadeTela}/>
        <Stack.Screen name="Jornal de Atividades" component={HistoricoAtividadesTela} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  botao: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
  },
  txtbotao: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '80%',
    padding: 10,
    fontSize: 16,
    marginTop: 20,
  },
  atividadecontainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    width: '80%',
    backgroundColor: 'white',
  }
});
