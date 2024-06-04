import { RadioGroup, RadioItem } from './general/RadioGroup';
import { CollapsiblePanel } from './general/CollapsiblePanel';
import { useLocale } from '../../hooks/useLocale';
import { useMemo } from 'react';
import { useSettings } from '../../hooks/useSettings';
import IconFA6 from 'react-native-vector-icons/FontAwesome6';

export const LanguageRadioButtons = () => {
  const { settings, saveSettings } = useSettings();
  const { availableLanguages } = useLocale();

  const idForSystemDefault = 'id_for_system_default';

  const radioItems: RadioItem[] = useMemo(() => {
    const convertedAvailableLanguages = availableLanguages.map((l) => ({
      id: l.id,
      title: l.name,
      icon: l.icon,
    }));

    return [
      {
        id: idForSystemDefault,
        icon: <IconFA6 name={'user'} size={16} />,
        title: 'System Default',
      },
      ...convertedAvailableLanguages,
    ];
  }, [availableLanguages]);

  const onSelectionChange = (languageId: string) => {
    saveSettings({
      ...settings,
      languageId: languageId === idForSystemDefault ? undefined : languageId,
    });
  };

  return (
    <CollapsiblePanel title={'Language'} iconName={'language'}>
      <RadioGroup
        items={radioItems}
        selectedId={
          settings.languageId ? settings.languageId : idForSystemDefault
        }
        onSelect={onSelectionChange}
      />
    </CollapsiblePanel>
  );
};
