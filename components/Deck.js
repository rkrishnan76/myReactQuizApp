import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, qiitaGreen, orange, white } from '../styles/colors'
import { containers } from '../styles/containers'
import { buttons } from '../styles/buttons'
import { connect } from 'react-redux'
import { pluralize } from '../utils/helpers'

class Deck extends Component {
  render() {
    const { navigation, decks } = this.props
    const title = navigation.state.params.title
    const deck = decks[title]
    return (
      <View style={[containers.baseContainer, { padding: 40 }]}>
        <View style={containers.centerContainer}>
          <View style={[containers.centerContainer, { flex: 5 }]}>
            <Text style={{textAlign: 'center', fontSize: 60}}>{title}</Text>
            <Text style={{textAlign: 'center', fontSize: 40}}>
              {pluralize(deck.questions.length, 'card')}
            </Text>
          </View>
          <TouchableOpacity style={[buttons.baseBtn, {marginTop: 40}]} onPress={() => navigation.navigate('Quiz', { title })}>
            <Text style={{textAlign: 'center', fontSize: 25, color: white}}>Start quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[buttons.baseBtn, {marginTop: 40, backgroundColor: orange}]} onPress={() => navigation.navigate('AddCard', { title })}>
            <Text style={{textAlign: 'center', fontSize: 25, color: white}}>Add new card</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (decks) => ({ decks })

export default connect(mapStateToProps)(Deck)
