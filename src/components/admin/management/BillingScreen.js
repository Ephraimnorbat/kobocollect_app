import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, List, Divider, DataTable, Surface } from 'react-native-paper';

const BillingScreen = ({ route }) => {
  const { orgId } = route.params;

  const subscriptionInfo = {
    plan: 'Professional',
    status: 'Active',
    billingCycle: 'Monthly',
    nextBilling: '2023-08-20',
    amount: '$199.00'
  };

  const invoices = [
    {
      id: 'INV-2023-07',
      date: '2023-07-20',
      amount: '$199.00',
      status: 'Paid'
    },
    {
      id: 'INV-2023-06',
      date: '2023-06-20',
      amount: '$199.00',
      status: 'Paid'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.currentPlan}>
        <Title>Current Plan: {subscriptionInfo.plan}</Title>
        <View style={styles.planDetails}>
          <View style={styles.planDetail}>
            <Paragraph>Status</Paragraph>
            <Title>{subscriptionInfo.status}</Title>
          </View>
          <View style={styles.planDetail}>
            <Paragraph>Next Billing</Paragraph>
            <Title>{subscriptionInfo.nextBilling}</Title>
          </View>
          <View style={styles.planDetail}>
            <Paragraph>Amount</Paragraph>
            <Title>{subscriptionInfo.amount}</Title>
          </View>
        </View>
        <Button mode="contained" style={styles.upgradeButton}>
          Upgrade Plan
        </Button>
      </Surface>

      <Card style={styles.section}>
        <Card.Content>
          <Title>Payment Method</Title>
          <List.Item
            title="**** **** **** 4242"
            description="Expires 12/24"
            left={props => <List.Icon {...props} icon="credit-card" />}
            right={props => <Button mode="outlined">Update</Button>}
          />
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Title>Billing History</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Invoice</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            {invoices.map(invoice => (
              <DataTable.Row key={invoice.id}>
                <DataTable.Cell>{invoice.id}</DataTable.Cell>
                <DataTable.Cell>{invoice.date}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.amount}</DataTable.Cell>
                <DataTable.Cell>{invoice.status}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Title>Billing Settings</Title>
          <List.Item
            title="Billing Email"
            description="billing@company.com"
            right={props => <Button mode="outlined">Edit</Button>}
          />
          <Divider />
          <List.Item
            title="Billing Address"
            description="123 Business St, City, Country"
            right={props => <Button mode="outlined">Edit</Button>}
          />
          <Divider />
          <List.Item
            title="Tax Information"
            description="VAT: EU123456789"
            right={props => <Button mode="outlined">Edit</Button>}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  currentPlan: {
    padding: 16,
    margin: 16,
    elevation: 4,
    borderRadius: 8,
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  planDetail: {
    alignItems: 'center',
  },
  upgradeButton: {
    marginTop: 8,
  },
  section: {
    margin: 16,
  },
});

export default BillingScreen;
