import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Main Screens
import SurveysScreen from '../components/Client/SurveyScreen';
import SubmissionsScreen from '../components/Client/SubmissionScreen';
import NotificationsScreen from '../components/Client/NotificationScreen';
import ProfileScreen from '../components/Client/ProfileScreen';
import DraftsScreen from '../components/Client/DraftScreen';

// Detail Screens
import SurveyDetailScreen from '../components/Client/SurveyDetailScreen';
import SubmissionDetailScreen from '../components/Client/SubmissionDetailScreen';
import SettingsScreen from '../components/Client/SettingsPanel';
import HelpScreen from '../components/Client/HelpScreen';
import SurveyResponseScreen from '../components/Client/SurveyResponseScreen';
import SurveyInfo from '../components/Client/SurveyInfo';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SurveysStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SurveysList" component={SurveysScreen} options={{ title: 'Surveys' }} />
    <Stack.Screen name="SurveyDetail" component={SurveyDetailScreen} options={{ title: 'Survey' }} />
    <Stack.Screen name="SurveyResponse" component={SurveyResponseScreen} options={{ title: 'Survey Response' }} />
    <Stack.Screen name="SurveyInfo"  component={SurveyInfo}  options={{ title: 'Survey Information', headerShown: true }} />
  </Stack.Navigator>
);

const DraftsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="DraftsList" component={DraftsScreen} options={{ title: 'Drafts' }} />
    <Stack.Screen name="SurveyResponse" component={SurveyResponseScreen} options={{ title: 'Continue Survey' }} />
  </Stack.Navigator>
);

const SubmissionsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SubmissionsList" component={SubmissionsScreen} options={{ title: 'Submissions' }} />
    <Stack.Screen name="SubmissionDetail" component={SubmissionDetailScreen} options={{ title: 'Submission Details' }} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: 'Profile' }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    <Stack.Screen name="Help" component={HelpScreen} options={{ title: 'Help & Support' }} />
  </Stack.Navigator>

  
);

const ClientNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Surveys':
            iconName = focused ? 'clipboard-check' : 'clipboard-outline';
            break;
          case 'Drafts':
            iconName = focused ? 'file-document-edit' : 'file-document-edit-outline';
            break;
          case 'Submissions':
            iconName = focused ? 'send' : 'send-outline';
            break;
          case 'Notifications':
            iconName = focused ? 'bell' : 'bell-outline';
            break;
          case 'Profile':
            iconName = focused ? 'account' : 'account-outline';
            break;
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2196F3',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Surveys" component={SurveysStack} options={{ headerShown: false }} />
    <Tab.Screen name="Drafts" component={DraftsStack} options={{ headerShown: false }} />
    <Tab.Screen name="Submissions" component={SubmissionsStack} options={{ headerShown: false }} />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
    <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default ClientNavigator;
