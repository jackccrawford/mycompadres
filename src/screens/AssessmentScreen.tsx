import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { globalTextStyles } from '../styles/globalStyles';

export const AssessmentScreen = () => {
  const { theme } = useTheme();
  const [responses, setResponses] = useState<Record<string, number>>({});

  const questions = [
    {
      pillar: 'Purpose',
      question: 'How clear are you on your business purpose and vision?',
    },
    {
      pillar: 'People',
      question: 'How aligned and engaged is your team?',
    },
    {
      pillar: 'Process',
      question: 'How efficient and scalable are your operations?',
    },
    {
      pillar: 'Performance',
      question: 'How healthy are your financial metrics?',
    },
    {
      pillar: 'Product',
      question: 'How strong is your product-market fit?',
    },
    {
      pillar: 'Profit',
      question: 'How sustainable is your growth trajectory?',
    },
  ];

  const handleResponse = (pillar: string, score: number) => {
    setResponses({ ...responses, [pillar]: score });
  };

  const ScoreButton = ({ score, pillar, selected }: any) => (
    <TouchableOpacity
      style={[
        styles.scoreButton,
        selected && styles.scoreButtonSelected,
      ]}
      onPress={() => handleResponse(pillar, score)}
    >
      <Text style={[
        globalTextStyles.bodyMedium,
        { color: selected ? '#FFFFFF' : theme.colors.text }
      ]}>
        {score}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[globalTextStyles.h2, { color: theme.colors.text, marginBottom: 8 }]}>
          Entry Assessment
        </Text>
        <Text style={[globalTextStyles.body, { color: theme.colors.text, opacity: 0.9, marginBottom: 32 }]}>
          Rate yourself on each pillar from 1 (struggling) to 5 (thriving)
        </Text>

        {questions.map((q, idx) => (
          <View key={idx} style={styles.questionContainer}>
            <Text style={[globalTextStyles.h4, { color: theme.colors.text, marginBottom: 8 }]}>
              {q.pillar}
            </Text>
            <Text style={[globalTextStyles.body, { color: theme.colors.text, opacity: 0.9, marginBottom: 16 }]}>
              {q.question}
            </Text>
            <View style={styles.scoreRow}>
              {[1, 2, 3, 4, 5].map((score) => (
                <ScoreButton
                  key={score}
                  score={score}
                  pillar={q.pillar}
                  selected={responses[q.pillar] === score}
                />
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={[
            styles.submitButton,
            Object.keys(responses).length === questions.length && styles.submitButtonActive
          ]}
          disabled={Object.keys(responses).length !== questions.length}
        >
          <Text style={[globalTextStyles.bodyLarge, { color: '#FFFFFF', fontWeight: '600' }]}>
            Complete Assessment
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  questionContainer: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  scoreButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreButtonSelected: {
    backgroundColor: '#FF571E',
    borderColor: '#FF571E',
  },
  submitButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  submitButtonActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
