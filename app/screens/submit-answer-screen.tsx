import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, Alert, ActivityIndicator } from "react-native"
import { Screen, Text, Button } from "../components"
import { color, spacing } from "../theme"
import { useRoute, useNavigation } from "@react-navigation/native"
import { Question } from "../models"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  paddingHorizontal: spacing.large,
}

const HEADER_CONTAINER: ViewStyle = {
  marginTop: spacing.extraLarge,
  marginBottom: spacing.medium,
}

const QUESTION: TextStyle = {
  fontWeight: "bold",
  fontSize: 16,
  marginVertical: spacing.medium,
}

const QUESTION_WRAPPER: ViewStyle = {
  paddingVertical: spacing.large,
}

const ANSWER: TextStyle = {
  fontSize: 12,
}

const ANSWER_WRAPPER: ViewStyle = {
  paddingVertical: spacing.small,
}

const BOTTOM_ACTION_BAR: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: 20,
  justifyContent: 'space-between'
}

export const SubmitAnswerScreen: Component = observer(function SubmitAnswerScreen() {
  // const navigation = useNavigation()
  const route = useRoute()
  const navigation = useNavigation()
  const question: Question = route.params?.question

  if (!question || !question.allAnswers) {
    return <ActivityIndicator />
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <Text style={HEADER_CONTAINER} preset="header" tx="submitAnswerScreen.header" />

      <View style={QUESTION_WRAPPER}>
        <View
          key={question.id} >
          <Text style={QUESTION} text={question.question} />
          <View>
            {question.allAnswers()?.map((a, index) => {
              return (
                <View key={index} style={ANSWER_WRAPPER}>
                  <Text style={ANSWER} text={a} />
                </View>
              )
            })}
          </View>
        </View>
      </View>

      <View style={BOTTOM_ACTION_BAR}>
        <Button text={'Go back'} onPress={() => navigation.goBack()} ></Button>
        <Button text={'Submit'} onPress={() => Alert.alert("Anser submitted.")} ></Button>
      </View>

    </Screen>
  )
})
