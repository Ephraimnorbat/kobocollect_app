import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Searchbar, Menu, Portal, Modal, List, Avatar, Divider } from 'react-native-paper';

const OrganizationManagementScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const organizations = [
    {
      id: 1,
      name: 'Health Research Institute',
      teams: 5,
      members: 50,
      projects: 12,
      subscription: 'Enterprise',
      status: 'active'
    },
    {
      id: 2,
      name: 'Education Assessment Board',
      teams: 3,
      members: 25,
      projects: 8,
      subscription: 'Professional',
      status: 'active'
    }
  ];

  const renderOrganizationCard = (org) => (
    <Card key={org.id} style={styles.orgCard}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.orgInfo}>
            <Avatar.Text size={40} label={org.name.substring(0, 2)} />
            <View style={styles.orgDetails}>
              <Title>{org.name}</Title>
              <Paragraph>Subscription: {org.subscription}</Paragraph>
            </View>
          </View>
          <Menu
            visible={menuVisible === org.id}
            onDismiss={() => setMenuVisible(null)}
            anchor={
              <Button onPress={() => setMenuVisible(org.id)}>Actions</Button>
            }
          >
            <Menu.Item onPress={() => {}} title="Edit" />
            <Menu.Item onPress={() => {}} title="Manage Teams" />
            <Menu.Item onPress={() => {}} title="Billing" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Deactivate" />
          </Menu>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Title>{org.teams}</Title>
            <Paragraph>Teams</Paragraph>
          </View>
          <View style={styles.stat}>
            <Title>{org.members}</Title>
            <Paragraph>Members</Paragraph>
          </View>
          <View style={styles.stat}>
            <Title>{org.projects}</Title>
            <Paragraph>Projects</Paragraph>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('TeamManagement', { orgId: org.id })}
          >
            Manage Teams
          </Button>
          <Button 
            mode="outlined"
            onPress={() => navigation.navigate('ResourceAllocation', { orgId: org.id })}
          >
            Resources
          </Button>
          <Button 
            mode="outlined"
            onPress={() => navigation.navigate('BillingSettings', { orgId: org.id })}
          >
            Billing
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search organizations..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <ScrollView style={styles.content}>
        {organizations.map(org => renderOrganizationCard(org))}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        label="New Organization"
        onPress={() => navigation.navigate('CreateOrganization')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  searchBar: {
    marginBottom: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  orgCard: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orgInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orgDetails: {
    marginLeft: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default OrganizationManagementScreen;
