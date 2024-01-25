import React, {useState} from 'react';
import {useUserStore} from '../../redux/zustand/use-users-store';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {userData} from '../../data/user-data';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {scaleHeightDP, scaleWidthDP} from '../../utils';

const dropDownOption = userData?.map(({key, name}) => ({
  label: key,
  value: name,
}));

export default function Home() {
  const {navigate} = useNavigation();

  const {updateSelectedUser, selectedUser} = useUserStore(state => state);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(dropDownOption);

  const onSelectItem = selectedValue => {
    const {label} = selectedValue || {};
    updateSelectedUser({selectedUser: label});
    navigate('test');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <DropDownPicker
        open={open}
        items={items}
        setOpen={setOpen}
        setItems={setItems}
        onSelectItem={onSelectItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: scaleWidthDP(16),
    paddingTop: scaleHeightDP(16),
  },
});
