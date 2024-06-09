import { useContext } from 'react';
import { ApkUpdateContext } from '../context/update/ApkUpdateContext';

export const useApkUpdater = () => {
  return useContext(ApkUpdateContext);
};
