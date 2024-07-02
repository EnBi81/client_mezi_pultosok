import { RadioGroup, RadioItem } from '../RadioGroup';
import { CollapsiblePanel } from '../CollapsiblePanel';
import { useLocale } from '../../hooks/useLocale';
import { useMemo } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { Icon } from '../Icon';
import { View, Text } from 'react-native'
import { formatString } from '../../utils/utils';
import { useColorTheme } from '../../hooks/useColorTheme';

export const LanguageRadioButtons = () => {
  const { settings, modifySettings } = useSettings();
  const { availableLanguages, l, fallbackLanguageStatus } = useLocale();
  const { colors } = useColorTheme();

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
        icon: <Icon name={'person'} />,
        title: l.settings.general.language.systemDefault,
        secondaryTitle: fallbackLanguageStatus.isFallbackLanguageUsed ?
          (<View style={{ flexDirection: 'row', paddingTop: 5, gap: 5 }}>
            <Icon name='warning' color='#ffcc00' size={15}/>
            <Text style={{ color: colors.text.secondary }}>{formatString(l.settings.general.language.missingLanguage, fallbackLanguageStatus.missingCountry?.toUpperCase() ?? '-')}</Text>
          </View>) : 
          undefined,
      },
      ...convertedAvailableLanguages,
    ];
  }, [availableLanguages, l, fallbackLanguageStatus]);

  const onSelectionChange = (languageId: string) => {
    modifySettings((settings) => (settings.languageId = languageId === idForSystemDefault ? undefined : languageId));
  };

  return (
    <CollapsiblePanel title={l.settings.general.language.collapseTitle} icon={<Icon name={'translate'} />}>
      <RadioGroup
        items={radioItems}
        selectedId={settings.languageId ? settings.languageId : idForSystemDefault}
        onSelect={onSelectionChange}
        level={1}
      />
    </CollapsiblePanel>
  );
};
