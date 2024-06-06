import { RadioGroup, RadioItem } from './general/RadioGroup';
import { CollapsiblePanel } from './general/CollapsiblePanel';
import { useLocale } from '../../locale/hooks/useLocale';
import { useMemo } from 'react';
import { useSettings } from '../../settings/hooks/useSettings';
import { Icon } from '../icons/Icon';

export const LanguageRadioButtons = () => {
  const { settings, modifySettings } = useSettings();
  const { availableLanguages, l } = useLocale();

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
      },
      ...convertedAvailableLanguages,
    ];
  }, [availableLanguages, l]);

  const onSelectionChange = (languageId: string) => {
    modifySettings({
      ...settings,
      languageId: languageId === idForSystemDefault ? undefined : languageId,
    });
  };

  return (
    <CollapsiblePanel
      title={l.settings.general.language.collapseTitle}
      icon={<Icon name={'translate'} />}
    >
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
