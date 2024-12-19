import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Main Admin Screens
import DashboardScreen from '../components/admin/DashboardScreen';
import ProjectsScreen from '../components/admin/ProjectManagementScreen';
import UsersScreen from '../components/admin/UserManagementScreen';
import OrganizationsScreen from '../components/admin/management/OrganizationManagementScreen';

// Detail & Settings Screens
import LogsScreen from '../components/admin/techadmin/LogsScreen';
import SystemSettingsScreen from '../components/admin/SystemSettingsScreen';
import ProjectDetailScreen from '../components/admin/ProjectDetailScreen';
import UserDetailScreen from '../components/admin/UserDetailsScreen';
import OrganizationDetailScreen from '../components/admin/OrganizationDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="DashboardMain" component={DashboardScreen} options={{ title: 'Dashboard' }} />
    <Stack.Screen name="Logs" component={LogsScreen} options={{ title: 'System Logs' }} />
    <Stack.Screen name="Settings" component={SystemSettingsScreen} options={{ title: 'System Settings' }} />
  </Stack.Navigator>
);

const ProjectsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProjectsList" component={ProjectsScreen} options={{ title: 'Projects' }} />
    <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ title: 'Project Details' }} />
  </Stack.Navigator>
);

const UsersStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="UsersList" component={UsersScreen} options={{ title: 'Users' }} />
    <Stack.Screen name="UserDetail" component={UserDetailScreen} options={{ title: 'User Details' }} />
  </Stack.Navigator>
);

const OrganizationsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="OrganizationsList" component={OrganizationsScreen} options={{ title: 'Organizations' }} />
    <Stack.Screen name="OrganizationDetail" component={OrganizationDetailScreen} options={{ title: 'Organization Details' }} />
  </Stack.Navigator>
);

const AdminNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Dashboard':
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
            break;
          case 'Projects':
            iconName = focused ? 'folder' : 'folder-outline';
            break;
          case 'Users':
            iconName = focused ? 'account-group' : 'account-group-outline';
            break;
          case 'Organizations':
            iconName = focused ? 'domain' : 'domain';
            break;
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2196F3',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardStack} options={{ headerShown: false }} />
    <Tab.Screen name="Projects" component={ProjectsStack} options={{ headerShown: false }} />
    <Tab.Screen name="Users" component={UsersStack} options={{ headerShown: false }} />
    <Tab.Screen name="Organizations" component={OrganizationsStack} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default AdminNavigator;
