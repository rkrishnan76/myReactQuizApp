import React, { Component } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard
} from 'react-native'
import { purple, lightPurp, lightGray, gray, orange, white } from '../styles/colors'
import { containers } from '../styles/containers'
import { texts } from '../styles/texts'
import { buttons } from '../styles/buttons'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'

class AddCard extends Component {
  state = {
    questionBorderColor: lightGray,
    answerBorderColor: lightGray,
    question: '',
    answer: '',
  }

  handleSubmit = () => {
    const { question, answer } = this.state
    const card = { question, answer }
    const { title } = this.props.navigation.state.params
    if (question !== '' && answer !== '') {
      addCardToDeck(title, card)
        .then(() => {
          this.props.dispatch(addCard(title, card))
          this.setState({
            question: '',
            answer: '',
          })
        })
      this.props.navigation.goBack()
    }
  }

  
  render() {
    return (
      <View style={containers.centerContainer} onTouchStart={Keyboard.dismiss}>
        <KeyboardAvoidingView style={[containers.centerContainer, {padding: 10}]} behavior='padding'>
          <TextInput
            multiline={true}
            placeholder='Please input question'
            onFocus={() => this.setState({ questionBorderColor: gray })}
            onBlur={() => this.setState({ questionBorderColor: lightGray })}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            style={[texts.textInput, {borderColor: `${this.state.questionBorderColor}`}]}
            />

          <TextInput
            multiline={true}
            placeholder='Please input answer'
            onFocus={() => this.setState({ answerBorderColor: gray })}
            onBlur={() => this.setState({ answerBorderColor: lightGray })}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
            style={[texts.textInput, {borderColor: `${this.state.answerBorderColor}`}]}
            />
          <TouchableOpacity style={[buttons.baseBtn, { padding: 20, backgroundColor: orange}]} onPress={this.handleSubmit}>
            <Text style={[texts.centerBold, { color: white }]}>Add your card to deck</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }
}


const mapStateToProps = (decks) => ({ decks })

export default connect(mapStateToProps)(AddCard)
