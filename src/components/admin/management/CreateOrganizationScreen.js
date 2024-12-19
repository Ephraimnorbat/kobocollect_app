import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Subheading, Switch, Card } from 'react-native-paper';

const CreateOrganizationScreen = ({ navigation }) => {
  const [orgData, setOrgData] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    subscription: 'professional',
    allowMultipleTeams: true,
  });

  const subscriptionPlans = [
    {
      name: 'Basic',
      price: '$99/month',
      features: ['Up to 10 teams', '50 users', 'Basic support']
    },
    {
      name: 'Professional',
      price: '$199/month',
      features: ['Up to 25 teams', '150 users', 'Priority support']
    },
    {
      name: 'Enterprise',
      price: '$499/month',
      features: ['Unlimited teams', 'Unlimited users', '24/7 support']
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Organization Name"
        value={orgData.name}
        onChangeText={(text) => setOrgData({...orgData, name: text})}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Description"
        value={orgData.description}
        onChangeText={(text) => setOrgData({...orgData, description: text})}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={orgData.email}
        onChangeText={(text) => setOrgData({...orgData, email: text})}
        mode="outlined"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="Phone"
        value={orgData.phone}
        onChangeText={(text) => setOrgData({...orgData, phone: text})}
        mode="outlined"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        label="Address"
        value={orgData.address}
        onChangeText={(text) => setOrgData({...orgData, address: text})}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <Subheading style={styles.sectionTitle}>Subscription Plans</Subheading>
      <View style={styles.plansContainer}>
        {subscriptionPlans.map((plan) => (
          <Card
            key={plan.name}
            style={[
              styles.planCard,
              orgData.subscription === plan.name.toLowerCase() && styles.selectedPlan
            ]}
            onPress={() => setOrgData({...orgData, subscription: plan.name.toLowerCase()})}
          >
            <Card.Content>
              <Title>{plan.name}</Title>
              <Paragraph style={styles.price}>{plan.price}</Paragraph>
              {plan.features.map((feature, index) => (
                <Paragraph key={index}>• {feature}</Paragraph>
              ))}
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.switchContainer}>
        <Subheading>Allow Multiple Teams</Subheading>
        <Switch
          value={orgData.allowMultipleTeams}
          onValueChange={(value) => setOrgData({...orgData, allowMultipleTeams: value})}
        />
      </View>

      <Button 
        mode="contained" 
        onPress={() => navigation.goBack()}
        style={styles.submitButton}
      >
        Create Organization
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  planCard: {
    width: '48%',
    marginBottom: 16,
  },
  selectedPlan: {
    borderColor: '#6200ee',
    borderWidth: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  submitButton: {
    marginVertical: 24,
  },
});

export default CreateOrganizationScreen;
