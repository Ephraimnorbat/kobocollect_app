import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Searchbar, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const DataFilter = ({ onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <View style={styles.chipContainer}>
        <Chip 
          selected={selectedFilters.includes('surveys')}
          onPress={() => setSelectedFilters([...selectedFilters, 'surveys'])}
          style={styles.chip}
        >
          Surveys
        </Chip>
        <Chip 
          selected={selectedFilters.includes('users')}
          onPress={() => setSelectedFilters([...selectedFilters, 'users'])}
          style={styles.chip}
        >
          Users
        </Chip>
        <Chip 
          selected={selectedFilters.includes('projects')}
          onPress={() => setSelectedFilters([...selectedFilters, 'projects'])}
          style={styles.chip}
        >
          Projects
        </Chip>
      </View>

      <Button 
        mode="outlined" 
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        Select Date Range
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  dateButton: {
    marginTop: 8,
  },
});

export default DataFilter;
