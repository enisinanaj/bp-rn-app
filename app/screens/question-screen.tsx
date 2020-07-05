import React, { FunctionComponent as Component, useState, useEffect } from "react"
import { ViewStyle, View, TextStyle, FlatList, ActivityIndicatorBase, TouchableOpacity, ScrollView } from "react-native"
import { Screen, Text } from "../components"
import { color, spacing } from "../theme"
import { useStores, QuestionStore, Question } from "../models"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  backgroundColor: color.background,
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
  borderBottomColor: color.line,
  borderBottomWidth: 1,
  paddingVertical: spacing.large,
}

const QUESTION_LIST: ViewStyle = {
  marginBottom: spacing.large,
}

const ANSWER: TextStyle = {
  fontSize: 12,
}

const ANSWER_WRAPPER: ViewStyle = {
  paddingVertical: spacing.small,
}

export interface QuestionScreenProps {
  questionStore: QuestionStore
}

export const QuestionScreen: Component<QuestionScreenProps> = observer(() => {
  const [refreshing, setRefreshing] = useState(false)

  const navigation = useNavigation()
  const { questionStore } = useStores()
  const { questions } = questionStore

  function fetchQuestions() {
    setRefreshing(true)

    questionStore.getQuestions()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  function renderQuestion({ item }) {
    const question: Question = item

    if (refreshing) {
      return <ActivityIndicatorBase />
    }

    return (
      <TouchableOpacity
        style={QUESTION_WRAPPER}
        key={question.id}
        onPress={_ => navigation.navigate('submitanswer', { question }) } >
        <Text style={QUESTION} text={question.question} />
        {false && <View>
          {question.allAnswers().map((a, index) => {
            return (
              <View key={index} style={ANSWER_WRAPPER}>
                <Text style={ANSWER} text={a} />
              </View>
            )
          })}
        </View>}
      </TouchableOpacity>
    )
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <View style={HEADER_CONTAINER}>
        <Text preset="header" tx="questionScreen.header" />
      </View>

      <ScrollView>
        <View style={QUESTION_LIST}>
          {questions.map(question => {
            return renderQuestion({ item: question })
          })}
        </View>
      </ScrollView>
    </Screen>
  )
})
