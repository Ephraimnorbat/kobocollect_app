import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, List, Surface, Avatar } from 'react-native-paper';

const SubscriptionConfirmationScreen = ({ route, navigation }) => {
  const { plan, billingData } = route.params;

  const subscriptionDetails = {
    orderId: 'ORD-' + Date.now(),
    date: new Date().toLocaleDateString(),
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.successBanner}>
        <Avatar.Icon size={64} icon="check-circle" style={styles.successIcon} />
        <Title style={styles.successTitle}>Subscription Confirmed!</Title>
        <Paragraph style={styles.successText}>
          Your subscription has been successfully processed
        </Paragraph>
      </Surface>

      <Card style={styles.detailsCard}>
        <Card.Content>
          <Title>Subscription Details</Title>
          <List.Item
            title="Order ID"
            description={subscriptionDetails.orderId}
            left={props => <List.Icon {...props} icon="identifier" />}
          />
          <List.Item
            title="Plan"
            description={`${plan.name} - ${plan.price}/${plan.interval}`}
            left={props => <List.Icon {...props} icon="package-variant" />}
          />
          <List.Item
            title="Purchase Date"
            description={subscriptionDetails.date}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
          <List.Item
            title="Next Billing"
            description={subscriptionDetails.nextBilling}
            left={props => <List.Icon {...props} icon="calendar-clock" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.detailsCard}>
        <Card.Content>
          <Title>Billing Information</Title>
          <List.Item
            title="Payment Method"
            description={`Card ending in ${billingData.cardNumber.slice(-4)}`}
            left={props => <List.Icon {...props} icon="credit-card" />}
          />
          <List.Item
            title="Billing Email"
            description={billingData.email}
            left={props => <List.Icon {...props} icon="email" />}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.button}
        >
          Go to Dashboard
        </Button>
        
        <Button 
          mode="outlined" 
          onPress={() => {}}
          style={styles.button}
        >
          Download Receipt
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  successBanner: {
    padding: 24,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  successIcon: {
    backgroundColor: '#4CAF50',
  },
  successTitle: {
    marginTop: 16,
    fontSize: 24,
  },
  successText: {
    textAlign: 'center',
    marginTop: 8,
  },
  detailsCard: {
    margin: 16,
  },
  buttonContainer: {
    padding: 16,
    gap: 12,
  },
  button: {
    marginVertical: 4,
  },
});

export default SubscriptionConfirmationScreen;
