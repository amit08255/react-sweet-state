// @flow

import {
  createStore,
  createContainer,
  createSubscriber,
  createHook,
} from 'react-sweet-state';
import type { State } from './types';

import * as actions from './actions';

type Actions = typeof actions;
type ContainerProps = {| selectedUser: string | null |};

const initialState: State = {
  data: null,
  loading: false,
};

const Store = createStore<State, Actions>({
  name: 'todo',
  initialState,
  actions,
});

export const TodoContainer = createContainer<State, Actions, ContainerProps>(
  Store,
  {
    onInit: () => ({ dispatch }, { selectedUser }) => {
      if (selectedUser) dispatch(actions.load(selectedUser));
    },
    onUpdate: () => ({ dispatch }, { selectedUser }) => {
      if (selectedUser) dispatch(actions.load(selectedUser));
    },
    onCleanup: () => ({ setState }) => {
      setState(initialState);
    },
  }
);

export const TodoSubscriber = createSubscriber<State, Actions>(Store);

export const useTodo = createHook<State, Actions>(Store);
