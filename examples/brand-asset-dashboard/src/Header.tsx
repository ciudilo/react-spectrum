import {Flex, Switch, Text, View} from '@adobe/react-spectrum';
import Asset from '@spectrum-icons/workflow/Asset';

interface HeaderProps {
  isDark: boolean;
  onToggleDark: (isDark: boolean) => void;
}

export function Header({isDark, onToggleDark}: HeaderProps) {
  return (
    <View
      elementType="header"
      backgroundColor="gray-100"
      borderBottomWidth="thin"
      borderBottomColor="gray-300"
      paddingX="size-400"
      paddingY="size-200">
      <Flex direction="row" alignItems="center" justifyContent="space-between" gap="size-200" wrap>
        <Flex direction="row" alignItems="center" gap="size-150">
          <Asset size="L" aria-hidden="true" />
          <Flex direction="column">
            <Text UNSAFE_style={{fontSize: '1.25rem', fontWeight: 700}}>Brand Asset Dashboard</Text>
            <Text UNSAFE_style={{opacity: 0.75}}>Manage and distribute your brand assets</Text>
          </Flex>
        </Flex>
        <Switch isSelected={isDark} onChange={onToggleDark}>Dark mode</Switch>
      </Flex>
    </View>
  );
}
