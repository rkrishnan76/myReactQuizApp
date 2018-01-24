import React, { Component } from 'react'
import {
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet } from 'react-native'
import { purple, orange, gray, lightGray, white, udacityBlue } from '../styles/colors'
import { containers } from '../styles/containers'
import { texts } from '../styles/texts'
import { buttons } from '../styles/buttons'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
  state = {
    title: '',
    inputBorderColor: lightGray
  }

  resetAction = (title) => (NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({ routeName: 'Home'}),
      NavigationActions.navigate({
        routeName: 'Deck',
        params: { title }
      })
    ]
  }))

  handleSubmit = () => {
    const { title } = this.state
    if (title !== '') {
      saveDeckTitle(title)
        .then(() => {
          this.props.addDeck(title)
          this.setState({
            title: ''
          })
          // navigate to added Deck
          this.props.navigation.dispatch(this.resetAction(title))
      })
    }
  }

  render() {
    return (
      <View style={[containers.baseContainer, { padding: 20 }]} onTouchStart={Keyboard.dismiss}>
        <KeyboardAvoidingView style={[containers.centerContainer, { padding: 10 }]} behavior='padding'>
          <Text style={{fontSize: 25, marginBottom: 20}}>New deck</Text>
          <TextInput
            multiline={true}
            placeholder='Please input title of your deck'
            onFocus={() => this.setState({ inputBorderColor: gray })}
            onBlur={() => this.setState({ inputBorderColor: lightGray })}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            style={[texts.textInput, {borderColor: `${this.state.inputBorderColor}`}]}
            />
          <TouchableOpacity style={[buttons.baseBtn, { padding: 20, backgroundColor: udacityBlue}]} onPress={this.handleSubmit}>
            <Text style={[texts.centerBold, { color: white }]}>Add your new deck</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
    )
  }
}

const mapStateToProps = (decks) => ({ decks })

export default connect(mapStateToProps, { addDeck })(AddDeck)
