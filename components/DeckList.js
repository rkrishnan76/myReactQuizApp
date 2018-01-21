import React, { Component } from 'react'
import { Text, Platform, FlatList, View, TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../styles/colors'
import { containers } from '../styles/containers'
import { connect } from 'react-redux'
import { recieveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { AppLoading } from 'expo'
import { pluralize } from '../utils/helpers'

const DeckListItem = ({ navigation, title, questionNum }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Deck', { title } )}>
      <View style={styles.listItem}>
        <Text style={{fontSize: 30}}>{title}</Text>
        <Text style={{fontSize: 20, color: '#BBB'}}>
          This deck has {pluralize(questionNum, 'card')}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const Separator = () => {
  return (
    <View
      style={{
      height: 1,
      width: '100%',
      backgroundColor: 'black'
    }} />
  )
}

class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    getDecks()
      .then(decks => this.props.dispatch(recieveDecks(decks)))
      .then(() => this.setState(() => ({
        ready: true,
      })))
  }

  render() {
    const { decks } = this.props
    const decksLength = Object.keys(decks).length
    const decksArray = Object.keys(decks).map((key) => decks[key])
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={[containers.columnContainer, {paddingLeft: 5, paddingRight: 5}]}>
        <View style={[containers.centerContainer, { flex: 0, marginTop: 30, marginBottom: 10}]}>
          <Text style={{ fontSize: 30 }}>Your flash card decks</Text>
        </View>
        { decksLength > 0
          ?
          <FlatList
            data={decksArray}
            renderItem={({ item }) =>
              <DeckListItem
                navigation={this.props.navigation}
                title={item.title}
                questionNum={item.questions.length}
              />
            }

            keyExtractor={item => item.title}

          />
          :
          <Text>No Deck Available, Please add Deck.</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    shadowRadius: 6,
    shadowOpacity: 0.6,
    shadowColor: 'rgba(0,0,0,24)',
    shadowOffset: {
      width: 1,
      height: 5,
    }
  },
})

const mapStateToProps = (decks) => ({ decks })

export default connect(mapStateToProps)(DeckList)
