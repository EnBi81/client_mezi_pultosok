import { useLocale } from '../../hooks/useLocale';
import { usePultosokData } from '../../hooks/usePultosokData';
import { toast } from '../../utils/utils';
import { Icon } from '../Icon';
import { SettingsOptionContainer } from './SettingsOptionContainer';

export const MarkAllReadButton = () => {
  const { l } = useLocale();
  const { markAllAsRead } = usePultosokData();

  return (
    <SettingsOptionContainer
      icon={<Icon name={'read'} provider={'material-community'} />}
      title={l.settings.general.markAllAsRead}
      onPress={() => {
        markAllAsRead();
        toast(l.settings.general.markedAllAsRead);
      }}
    />
  );
};
