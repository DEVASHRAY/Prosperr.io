import {userData} from '../../data/user-data';
import {create} from 'zustand';

interface UserType {
  selectedUser: string;
}

interface UserDataUpdateType {
  updatedData: {};
  selectedUser: string;
}

interface UserStoreType {
  data: [];
  selectedUser: string | null;
  updateSelectedUser: (param: UserType) => void;
}

export const useUserStore = create<UserStoreType>(set => ({
  data: userData,
  selectedUser: null,
  updateSelectedUser: ({selectedUser}: UserType) => {
    return set(() => ({selectedUser}));
  },
  updateData: ({updatedData, selectedUser}: UserDataUpdateType) => {
    return set(state => {
      let updatedSelectedUserData = state?.data?.map(item => {
        const {key} = item || {};

        if (key === selectedUser) {
          return updatedData;
        }
        return item;
      });

      return {data: updatedSelectedUserData};
    });
  },
}));
