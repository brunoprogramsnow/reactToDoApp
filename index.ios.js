import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View, 
  TouchableHighlight, 
  TextInput, 
  ListView
} from 'react-native'; 

var Firebase = require('firebase');

class exCalculator extends Component{
  constructor(props) {
    super(props); 
    render(); 
    var myFirebase = new Firebase('https://todolist54.firebaseio.com/'); 

    this.itemsRef = myFirebase.child('items')
    this.state ={
      newToDo:'', 
      toDoSource: new ListView.DataSource({rowHasChanged:(row1,row2) => row1 !==row2})
    } 

    this.items =[] 

     function componentDidMount(){
      this.itemsRef.on('child_added',(dataSnapshot) =>{
        this.items.push({id: dataSnapshot.key(), text: dataSnapshot.val()});
        this.setState({
          toDoSource: this.state.todoSource.cloneWithRows(this.items)
        })
      })
    }
     function componentDidMount(){
      this.itemsRef.on('child_removed',(dataSnapshot) =>{
        this.items = this.items.filter((x) => x.id != dataSnapshot.key());
        this.setState({
          toDoSource: this.state.todoSource.cloneWithRows(this.items)
        })
      })
    } 

    function addToDo(){
      if(this.state.newToDo != ''){
        this.itemsRef.push({
          todo: this.state.newToDo
        });
        this.setState({
          newToDo:''
        })
      }
    } 
    function removeToDo(rowData){
      this.itemsRef.child(rowData.id).remove();

    } 
      function render(){
      return(
        <View style={styles.appContainer}> 
          <View style={styles.titleView}> 
            <Text style={styles.titleText}> 
            My ToDos
            </Text> 
            </View> 
            <View style={styles.inputcontainer}> 
              <TextInput style={styles.input} onChangeText={(text) => this.setState({newToDo: text})} value={this.state.newToDo}> 
              <TouchableHighlight style={styles.button} onPress={this.addToDo()} underLayColor='#dddddd'> 
              <Text style={styles.btnText}> 
              </Text> 
              </TouchableHighlight>
              </TextInput>
              </View> 
              <ListView 
                DataSource={this.state.todoSource} 
                renderRow={this.renderRow.bind(this)} /> 
                </View>

        )
    } 
    function renderRow(rowData){
      return( 
        <TouchableHighlight 
        underLayColor='#dddddd' 
        onPress={() => this.removeToDo(rowData)}>
        <View>
          <View style={styles.row}> 
            <Text style={styles.todoText}>{rowData.text}</Text> 
            </View> 

            <View style={styles.separator}> 
            </View> 
            </View>
            

            </TouchableHighlight> 



        )

    }
var styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    color: '#FFFFFF',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
});
    // });
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('exCalculator', () => exCalculator);
