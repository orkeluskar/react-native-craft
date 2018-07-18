import React, { Component } from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import { app_token, ticket } from 'react-native-dotenv';


export default class InventoryManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      barcode: '',
      error: ''
    };
  }

  //Adding record to my quickabase db using alternate URL format
  addRecord = async () => {
    const baseUrl = 'https://omkarkeluskar.quickbase.com/db/bnuxbri4m';
    const params = `?a=API_AddRecord`
      + `&_fid_7=${this.state.name}`
      + `&_fid_8=${this.state.barcode}`
      + `&apptoken=` + app_token
      + `&ticket=` + ticket
    const url = baseUrl + params;

    const options = {
      method: 'POST',
    }
    const res = await fetch(url, options);
    //Displaying error if there's one
    res.ok ? this.setState({ error: '' }) : this.setState({ error: res.statusText })
  }

  //Verifying input in a very trivial manner. More condition could be added here, if required
  verifyInput = () => {
    this.state.name === '' || this.state.barcode === ''
      ?
      this.setState({ error: 'Name and/or Barcode cannot be empty' })
      :
      this.addRecord()
  }


  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 50 }}>
        <Text style={{ textAlign: 'center', fontSize: 30 }}>
          Sally's Garage Inventory
        </Text>
        <TextInput
          style={{ height: 40, marginTop: 20 }}
          placeholder="Model Name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          style={{ height: 40, marginTop: 20 }}
          placeholder="Barcode"
          onChangeText={(barcode) => this.setState({ barcode })}
        />
        <Text style={{ color: 'red', marginTop: 20 }}>
          {this.state.error}
        </Text>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#DDDDDD', height: 30, marginTop: 20 }}
          onPress={this.verifyInput}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
