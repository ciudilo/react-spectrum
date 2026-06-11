import {useState} from 'react';
import {
  Cell,
  Column,
  defaultTheme,
  Flex,
  Heading,
  Item,
  Provider,
  Row,
  StatusLight,
  TableBody,
  TableHeader,
  TableView,
  TagGroup,
  Text,
  View
} from '@adobe/react-spectrum';
import {Header} from './Header';
import {assets, stats} from './data';

function StatCard({label, value}: {label: string; value: string}) {
  return (
    <View
      backgroundColor="gray-100"
      borderWidth="thin"
      borderColor="gray-300"
      borderRadius="medium"
      paddingX="size-300"
      paddingY="size-250"
      minWidth="size-2400"
      flex>
      <Flex direction="column" gap="size-50">
        <Text UNSAFE_style={{fontSize: '1.75rem', fontWeight: 700}}>{value}</Text>
        <Text UNSAFE_style={{opacity: 0.75}}>{label}</Text>
      </Flex>
    </View>
  );
}

export function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <Provider theme={defaultTheme} colorScheme={isDark ? 'dark' : 'light'}>
      <View backgroundColor="gray-50" minHeight="100vh">
        <Header isDark={isDark} onToggleDark={setIsDark} />
        <View padding="size-400">
          <Flex direction="column" gap="size-400" maxWidth="size-6000" marginX="auto">
            <Flex direction="row" gap="size-200" wrap>
              {stats.map((s) => (
                <StatCard key={s.label} label={s.label} value={s.value} />
              ))}
            </Flex>

            <Flex direction="column" gap="size-150">
              <Heading level={2} margin={0}>Filter by type</Heading>
              <TagGroup aria-label="Asset type filters">
                <Item key="logo">Logos</Item>
                <Item key="color">Colors</Item>
                <Item key="type">Typefaces</Item>
                <Item key="icon">Icons</Item>
                <Item key="photo">Photography</Item>
                <Item key="template">Templates</Item>
              </TagGroup>
            </Flex>

            <Flex direction="column" gap="size-150">
              <Flex direction="row" alignItems="center" justifyContent="space-between">
                <Heading level={2} margin={0}>Library</Heading>
                <StatusLight variant="positive">All systems synced</StatusLight>
              </Flex>
              <TableView aria-label="Brand assets" height="size-4600">
                <TableHeader>
                  <Column key="name" isRowHeader>Asset</Column>
                  <Column key="type">Type</Column>
                  <Column key="format">Format</Column>
                  <Column key="size">Size</Column>
                  <Column key="updated">Updated</Column>
                  <Column key="downloads" align="end">Downloads</Column>
                </TableHeader>
                <TableBody items={assets}>
                  {(item) => (
                    <Row key={item.id}>
                      <Cell>{item.name}</Cell>
                      <Cell>{item.type}</Cell>
                      <Cell>{item.format}</Cell>
                      <Cell>{item.size}</Cell>
                      <Cell>{item.updated}</Cell>
                      <Cell>{item.downloads.toLocaleString()}</Cell>
                    </Row>
                  )}
                </TableBody>
              </TableView>
            </Flex>
          </Flex>
        </View>
      </View>
    </Provider>
  );
}
