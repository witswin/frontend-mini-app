import { useContext } from 'react';
import {
  DemoQuizCounter,
  DemoQuizCounterDispatch,
  DemoQuizData,
  DemoQuizDispatch,
} from './context';

export const useDemoQuizData = () => useContext(DemoQuizData);
export const useDemoQuizDispatch = () => useContext(DemoQuizDispatch);

export const useDemoQuizCounter = () => useContext(DemoQuizCounter);
export const useDemoQuizCounterDispatch = () =>
  useContext(DemoQuizCounterDispatch);
