import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, List, Surface, Modal, Portal } from 'react-native-paper';

const SubscriptionPlanScreen = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$99',
      interval: 'month',
      features: [
        'Up to 10 teams',
        '50 users',
        '100GB storage',
        'Email support',
        'Basic analytics'
      ],
      recommended: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$199',
      interval: 'month',
      features: [
        'Up to 25 teams',
        '150 users',
        '500GB storage',
        'Priority support',
        'Advanced analytics',
        'Custom branding'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$499',
      interval: 'month',
      features: [
        'Unlimited teams',
        'Unlimited users',
        '2TB storage',
        '24/7 support',
        'Premium analytics',
        'Custom branding',
        'API access',
        'Dedicated account manager'
      ],
      recommended: false
    }
  ];

  const renderPlanCard = (plan) => (
    <Surface key={plan.id} style={[styles.planCard, plan.recommended && styles.recommendedCard]}>
      {plan.recommended && (
        <View style={styles.recommendedBadge}>
          <Paragraph style={styles.recommendedText}>Recommended</Paragraph>
        </View>
      )}
      
      <Title style={styles.planName}>{plan.name}</Title>
      <View style={styles.priceContainer}>
        <Title style={styles.price}>{plan.price}</Title>
        <Paragraph>per {plan.interval}</Paragraph>
      </View>

      <List.Section>
        {plan.features.map((feature, index) => (
          <List.Item
            key={index}
            title={feature}
            left={() => <List.Icon icon="check" />}
          />
        ))}
      </List.Section>

      <Button 
        mode={plan.recommended ? "contained" : "outlined"}
        style={styles.selectButton}
        onPress={() => {
          setSelectedPlan(plan);
          setConfirmModal(true);
        }}
      >
        Select Plan
      </Button>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Title style={styles.header}>Choose Your Plan</Title>
        <Paragraph style={styles.subheader}>Select the plan that best fits your needs</Paragraph>
        
        <View style={styles.plansContainer}>
          {plans.map(plan => renderPlanCard(plan))}
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={confirmModal}
          onDismiss={() => setConfirmModal(false)}
          contentContainerStyle={styles.modal}
        >
          <Title>Confirm Subscription</Title>
          {selectedPlan && (
            <>
              <Paragraph style={styles.modalText}>
                You are about to subscribe to the {selectedPlan.name} plan at {selectedPlan.price} per {selectedPlan.interval}.
              </Paragraph>
              <View style={styles.modalButtons}>
                <Button mode="outlined" onPress={() => setConfirmModal(false)}>
                  Cancel
                </Button>
                <Button 
                  mode="contained" 
                  onPress={() => {
                    setConfirmModal(false);
                    navigation.navigate('BillingDetails', { plan: selectedPlan });
                  }}
                >
                  Confirm
                </Button>
              </View>
            </>
          )}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 8,
  },
  subheader: {
    textAlign: 'center',
    marginBottom: 24,
  },
  plansContainer: {
    gap: 16,
  },
  planCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  recommendedCard: {
    borderColor: '#6200ee',
    borderWidth: 2,
  },
  recommendedBadge: {
    backgroundColor: '#6200ee',
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  recommendedText: {
    color: 'white',
  },
  planName: {
    fontSize: 24,
  },
  priceContainer: {
    marginVertical: 16,
  },
  price: {
    fontSize: 32,
  },
  selectButton: {
    marginTop: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalText: {
    marginVertical: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default SubscriptionPlanScreen;
