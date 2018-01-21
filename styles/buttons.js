import { StyleSheet } from 'react-native'
import { qiitaGreen } from './colors'

export const buttons = StyleSheet.create({
  baseBtn: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: qiitaGreen,
    minWidth: 200,
    padding: 20,
  },
  restartQuizBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: qiitaGreen,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minWidth: 200,
  },
})
