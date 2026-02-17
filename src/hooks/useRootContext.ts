import {useOutletContext} from 'react-router-dom';
import type {RootOutletContext} from '../layouts/RootLayout';

export function useRootContext() {
  return useOutletContext<RootOutletContext>();
}
