import React, { Component } from 'react';
import { View, Text, TextInput, Button, Vibration, Alert, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Criando o stack para navegar pelo app
const Stack = createStackNavigator();

// Tela inicial que exibe as opcoes principais e conta as atividades pendentes
class TelaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      atividades: [], 
      contadorAtividades : 0, 
    };
  }

  componentDidMount() {
    this.carregarAtividades();

    // Listener que carrega as atividades quando o usuario volta para a tela inicial
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.carregarAtividades();
    });
  }

  // Carrega as atividades salvas no Asyncstorage
  carregarAtividades = async () => {
    const dadosArmazenados = await AsyncStorage.getItem('atividades');
    const atividades = dadosArmazenados ? dadosArmazenados.split('|') : [];
    this.setState({ atividades, contadorAtividades: atividades.length });
  };

  render() {
    const navega = this.props.navigation.navigate;
    return (
      <View style={estilos.container}>
        <Text style={estilos.titulo}>Jornal de Tarefas</Text>
        <Image source={require('./assets/Diario2.png')} style={{ width: 200, height: 200, marginTop: 20, }}/>
        <Text style={{ marginVertical: 20, fontSize: 18 }}>Atividades pendentes: {this.state.contadorAtividades}</Text>
        <TouchableOpacity style={estilos.botao} onPress={() => navega('Adicionar Atividade')}>
          <Text style={estilos.txtbotao}>Adicionar Atividade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botao} onPress={() => navega('Jornal de Atividades')}>
          <Text style={estilos.txtbotao}>Ver Jornal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botao} onPress={() => navega('Sobre')}>
          <Text style={estilos.txtbotao}>Sobre</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Tela para adicionar uma nova atividade, com campos para descricao e data
class AdicionarAtividadeTela extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoAtividade: '', 
      dataAtividade: '',  
      ativiades : []
    };
  }
  
  // Funcao para salvar uma nova atividade e  vibra como confirmacao
  salvarAtividade = async () => {
    const textoAtividade = this.state.textoAtividade;
    const dataAtividade = this.state.dataAtividade;

    // Validacao para garantir que todos os campos sejam preenchidos
    if (!textoAtividade || !dataAtividade) {
      alert('Preencha todos os campos');
      return;
    }

    // Cria uma nova atividade e atualiza no Asyncstorage e vibra como confirmacao
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

// Tela que exibe o historico de atividades com opcao de excluir cada uma
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
  
  // Carrega as atividades salvas no Asyncstorage
  carregarAtividades = async () => {
    const dadosArmazenados = await AsyncStorage.getItem('atividades');
    const atividades = dadosArmazenados ? dadosArmazenados.split('|') : [];
    this.setState({ atividades });
  };

  // Exclui uma atividade especifica e atualiza o AsyncStorage e depois vibra como confirmacao
  excluirAtividade = async (index) => {
    const { atividades } = this.state;
    const atividadesAtualizadas = atividades.filter((atividade, i) => i !== index);

    this.setState({ atividades: atividadesAtualizadas });
    await AsyncStorage.setItem('atividades', atividadesAtualizadas.join('|'));
    Vibration.vibrate(1000);
  };

  render() {
    return (
      <ScrollView style={estilos.container}>
        <Text style={{ fontSize: 24 }}>Historico de Atividades</Text>
        {this.state.atividades.map((atividade, index) => (
          <View key={index} style={estilos.atividadecontainer}>
            <Text style={{fontWeight: 'bold'}}>{atividade.split(' - ')[0]} </Text>
            <Text style={{fontSize: 14}}>{atividade.split(' - ')[1]} </Text>
            <TouchableOpacity onPress={() => this.excluirAtividade(index)}>
              <Text style={{ color: 'red' }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  }
}

// Tela "Sobre" que exibe informacoes sobre o programa e mim
class SobreTela extends Component {
  render() {
    return (
      <View style={estilos.container}>
        <Text style={{ fontSize: 24 }}>Sobre o Programa</Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}> App de tarefas para:</Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}> CC4670 - Computacao Movel</Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}>Desenvolvido por: Juan Manuel Citta</Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}>RA: 24.123.022-6</Text>
          <View style = {estilos.imagemsobre}>
          <Image source={require('./assets/FEI_logo_2015.png')} style={{ width: 100, height: 100, marginHorizontal: 10, }} resizeMode = "contain"/>
          <Image source={require('./assets/React.png')} style={{ width: 100, height: 100, marginHorizontal: 10, }} resizeMode = "contain" />
          <Image source={require('./assets/Arduino_Logo.svg')} style={{ width: 100, height: 100 , marginHorizontal: 10,}} resizeMode = "contain" />
          </View>
      </View>
    );
  }
}

// Componente App que define o stack
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tela Inicial" component={TelaInicial} options = {{headerShown:false}} />
        <Stack.Screen name="Adicionar Atividade" component={AdicionarAtividadeTela}/>
        <Stack.Screen name="Jornal de Atividades" component={HistoricoAtividadesTela} />
        <Stack.Screen name="Sobre" component={SobreTela} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos usados na aplicacao 
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'beige',
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
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
    width: '95%',
  },

  imagemsobre:{
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 20,
  }
});
