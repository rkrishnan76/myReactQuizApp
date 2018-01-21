import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { purple, white, udacityBlue, red, qiitaGreen, lightGray, orange } from '../styles/colors'
import { containers } from '../styles/containers'
import { texts } from '../styles/texts'
import { buttons } from '../styles/buttons'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { pluralize } from '../utils/helpers'
import {
  setLocalNotification,
  clearLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    answers: undefined,
    ready: false,
    questionIdx: 0,
    finishedQuiz: false
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  componentWillUnmount() {
    this.animatedValue.removeAllListeners()
  }

  componentDidMount() {
    const questions = this.props.deck.questions
    const answers = Array(questions.length).fill(undefined)
    this.setState({
      answers,
      ready: true,
    })
    clearLocalNotification()
      .then(setLocalNotification())
  }

  handleRestartGame = () => {
    const questions = this.props.deck.questions
    const answers = Array(questions.length).fill(undefined)
    this.animatedValue.setValue(0)
    this.setState({
      answers,
      questionIdx: 0,
      finishedQuiz: false
    })
  }

  handleAnswerSubmit = (remember) => {
    this.animatedValue.setValue(0)
    const { answers, questionIdx } = this.state
    answers[questionIdx] = remember
    this.setState({
      answers,
    })
    if ( questionIdx === answers.length -1) {
      this.setState({
        finishedQuiz: true
      })
    } else {
      this.setState({
        questionIdx: questionIdx + 1
      })
    }
  }

  handleToggleShowingAnswer = () => {
    const { isShowingAnswer }  = this.state
    this.setState({
      isShowingAnswer: !isShowingAnswer,
    })
  }

  handleFlipCard = () => {
    if(this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start()
    }
  }

  countElement = (arr, element) => arr.filter((elem) => elem === element).length

  render() {
    const { questions } = this.props.deck
    const { answers, questionIdx, isShowingAnswer, finishedQuiz, ready } = this.state

    if (ready === false || !answers) {
      return <AppLoading />
    }

    if (answers.length === 0) {
      return (
        <View style={containers.centerContainer}>
          <Text>There are no cards in the deck, please add card</Text>
        </View>
      )
    }

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }

    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate}
      ]
    }

    const { question, answer } = questions[questionIdx]

    return (
      <View style={containers.centerContainer}>
      { finishedQuiz
        ?
        <View style={[containers.centerContainer, {padding: 20}]}>
          <View style={{marginBottom: 20}}>
            <Text style={{textAlign: 'center', fontSize: 40}}>
              You finished quiz
            </Text>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              {this.countElement(answers, true)} correct out of {pluralize(questions.length, 'question')}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={buttons.baseBtn}
              onPress={this.handleRestartGame}>
              <Text style={[texts.centerBold, { color: white, fontSize: 20 }]}>
                Click to restart flash card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttons.baseBtn, {marginTop: 20, marginBottom: 20, backgroundColor: orange}]}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={[texts.centerBold, { color: white, fontSize: 20}]}>
                Go back to Deck
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={containers.centerContainer}>
          <Text style={[texts.centerBold, { marginBottom: 10}]}>
            Question: {`${questionIdx + 1}/${questions.length}`}
          </Text>
          <View>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <Text style={texts.centerBold}>{question}</Text>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
              <Text style={texts.centerBold}>{answer}</Text>
            </Animated.View>
          </View>
          <TouchableOpacity style={{marginTop: 20}} onPress={this.handleFlipCard}>
            <Text style={[texts.centerBold, { color: red }]}>
              Click to flip card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[buttons.baseBtn, { backgroundColor:'#0F7F12', marginTop: 20}]} onPress={() => this.handleAnswerSubmit(true)}>
            <Text style={[texts.centerBold, { color: white }]}>I knew this</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[buttons.baseBtn, {backgroundColor:'#D22A25', marginTop: 20}]} onPress={() => this.handleAnswerSubmit(false)}>
            <Text style={[texts.centerBold, { color: white }]}>I didnt know this</Text>
          </TouchableOpacity>
        </View>
      }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightGray,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: lightGray,
    position: "absolute",
    top: 0,
  },
})
const mapStateToProps = (decks, { navigation }) => {
  const title = navigation.state.params.title
  return {
    deck: decks[title],
  }
}
export default connect(mapStateToProps)(Quiz)
