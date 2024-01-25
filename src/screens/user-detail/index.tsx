import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useUserStore} from '../../redux/zustand/use-users-store';
import {scaleHeightDP, scaleWidthDP} from '../../utils';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Test() {
  const {data, updateData, selectedUser} = useUserStore(state => state);

  const [selectedUserData, setSelectedUserData] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    let filteredData = data?.filter(({key}) => key === selectedUser);

    setSelectedUserData(filteredData[0] || []);
  }, [selectedUser, data]);

  const {name, wallet, txnDetails} = selectedUserData || {};

  const renderItem = useCallback(
    ({item}) => {
      if (!item) return;

      const {amount, date, accountNo} = item || {};

      return (
        <View style={[styles.item]} key={name}>
          <Text>{`amount : ${amount || ''}`}</Text>
          <Text>{`Date : ${new Date(date).toLocaleDateString()}`}</Text>
          <Text>{`Account Number : ${accountNo}`}</Text>
        </View>
      );
    },
    [selectedUser],
  );

  const handleOnChange = text => {
    setAmount(text || '');
  };

  const addAmount = () => {
    if (!amount || amount < 1) return;
    updateData(amount);
    let updatedData = {
      ...selectedUserData,
      wallet: Number(wallet) + Number(amount),
      txnDetails: [
        {
          amount,
          date: new Date(),
          accountNo: 'XXXX XXXX 1234',
        },
        ...selectedUserData?.txnDetails,
      ],
    };

    updateData({updatedData, selectedUser});

    setAmount('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.subContainer]}>
        <Text style={[styles.nameText]}>{`Hi ${name}`}</Text>

        <Text style={[styles.wallet]}>{`Wallet ${wallet}`}</Text>

        <View style={[styles.flexView]}>
          <TextInput
            style={[styles.textInput]}
            value={amount}
            onChangeText={handleOnChange}
          />
          <Pressable style={[styles.addBtn]} onPress={addAmount}>
            <Text>Add Amount</Text>
          </Pressable>
        </View>

        <Text style={[styles.lastTxnHeader]}>Last TransactionDetais</Text>

        <FlatList data={txnDetails} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#FFF',
  },
  subContainer: {
    marginHorizontal: scaleWidthDP(16),
    marginTop: scaleHeightDP(16),
  },
  nameText: {
    fontSize: 16,
  },
  lastTxnHeader: {
    marginTop: scaleHeightDP(32),
    fontWeight: 'bold',
    fontSize: scaleWidthDP(18),
  },
  item: {
    marginVertical: scaleHeightDP(20),
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeightDP(12),
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 24,
    flex: 1,
    marginRight: 16,
    borderRadius: 8,
    padding: 12,
  },
  wallet: {
    fontSize: 18,
    marginTop: scaleHeightDP(12),
  },
});
