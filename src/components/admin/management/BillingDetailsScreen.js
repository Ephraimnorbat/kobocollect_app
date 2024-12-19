import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Card, HelperText, Switch, Paragraph } from 'react-native-paper';

const BillingDetailsScreen = ({ route, navigation }) => {
  const { plan } = route.params;
  const [billingData, setBillingData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    saveCard: true,
    autoRenew: true
  });

  const handleSubmit = () => {
    // Process billing information
    navigation.navigate('SubscriptionConfirmation', {
      plan,
      billingData
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title>Plan Summary</Title>
          <Paragraph>Plan: {plan.name}</Paragraph>
          <Paragraph>Price: {plan.price} per {plan.interval}</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        <Title>Payment Information</Title>
        <TextInput
          label="Card Number"
          value={billingData.cardNumber}
          onChangeText={text => setBillingData({...billingData, cardNumber: text})}
          mode="outlined"
          style={styles.input}
          keyboardType="numeric"
        />

        <View style={styles.row}>
          <TextInput
            label="Expiry Date"
            value={billingData.expiryDate}
            onChangeText={text => setBillingData({...billingData, expiryDate: text})}
            mode="outlined"
            style={[styles.input, styles.halfInput]}
            placeholder="MM/YY"
          />
          <TextInput
            label="CVV"
            value={billingData.cvv}
            onChangeText={text => setBillingData({...billingData, cvv: text})}
            mode="outlined"
            style={[styles.input, styles.halfInput]}
            keyboardType="numeric"
            secureTextEntry
          />
        </View>

        <TextInput
          label="Cardholder Name"
          value={billingData.name}
          onChangeText={text => setBillingData({...billingData, name: text})}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Title>Billing Address</Title>
        <TextInput
          label="Email"
          value={billingData.email}
          onChangeText={text => setBillingData({...billingData, email: text})}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          label="Address"
          value={billingData.address}
          onChangeText={text => setBillingData({...billingData, address: text})}
          mode="outlined"
          style={styles.input}
        />

        <View style={styles.row}>
          <TextInput
            label="City"
            value={billingData.city}
            onChangeText={text => setBillingData({...billingData, city: text})}
            mode="outlined"
            style={[styles.input, styles.halfInput]}
          />
          <TextInput
            label="Postal Code"
            value={billingData.postalCode}
            onChangeText={text => setBillingData({...billingData, postalCode: text})}
            mode="outlined"
            style={[styles.input, styles.halfInput]}
          />
        </View>

        <TextInput
          label="Country"
          value={billingData.country}
          onChangeText={text => setBillingData({...billingData, country: text})}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.switchRow}>
          <Paragraph>Save card for future payments</Paragraph>
          <Switch
            value={billingData.saveCard}
            onValueChange={value => setBillingData({...billingData, saveCard: value})}
          />
        </View>
        <View style={styles.switchRow}>
          <Paragraph>Enable auto-renewal</Paragraph>
          <Switch
            value={billingData.autoRenew}
            onValueChange={value => setBillingData({...billingData, autoRenew: value})}
          />
        </View>
      </View>

      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Complete Subscription
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  summaryCard: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButton: {
    marginVertical: 24,
  },
});

export default BillingDetailsScreen;
