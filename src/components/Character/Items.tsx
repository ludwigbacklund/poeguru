import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';

import isNotNull from '../../utils/isNotNull';
import { Item } from './Item/Item';
import { useStoreState } from '../../features';
import { Placeholder } from '../Placeholder/Placeholder';
import { useItemsQuery } from '../../graphql-types';

const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );

export const Items: React.SFC = () => {
  const currentTimelineLevel = useStoreState(
    state => state.build.currentTimelineLevel,
  );
  const { loading, data, error } = useItemsQuery({
    variables: { id: 1, currentLevel: currentTimelineLevel },
  });
  if (!data || loading || error) {
    return <Placeholder height={550}>No item data...</Placeholder>;
  }

  const { nodes } = data.buildUniquesByBuildIdAndLevel;
  const buildUniques = nodes.filter(isNotNull);

  return (
    <ItemsWrapper>
      <Header>Items</Header>
      <ItemGroups>
        <ItemGrid>
          {buildUniques
            .filter(buildUnique => !buildUnique.slot.startsWith('flask'))
            .map(({ slot, unique }) => {
              if (!unique) return;
              const { name, iconUrl } = unique;
              return (
                <Item
                  key={slot + name}
                  uniqueName={name}
                  slot={snakeToCamel(slot)}
                  iconUrl={iconUrl}
                />
              );
            })}
        </ItemGrid>
        <Flasks>
          {buildUniques
            .filter(buildUnique => buildUnique.slot.startsWith('flask'))
            .map(({ unique }, i) => {
              if (!unique) return;
              const { name, iconUrl } = unique;
              return (
                <Item key={i + name} uniqueName={name} iconUrl={iconUrl} />
              );
            })}
        </Flasks>
      </ItemGroups>
    </ItemsWrapper>
  );
};

export const QUERY_QUERY = gql`
  query Items($id: Int!, $currentLevel: Int!) {
    buildUniquesByBuildIdAndLevel(
      buildId: $id
      givenLevel: $currentLevel
      orderBy: SLOT_DESC
    ) {
      nodes {
        level
        slot
        unique {
          name
          iconUrl
        }
      }
    }
  }
`;

const ItemsWrapper = styled.div`
  justify-self: center;
`;

const Header = styled.h2`
  margin: 0;
`;

const ItemGroups = styled.div`
  width: max-content;
  margin-top: 16px;
`;

const ItemGrid = styled.div`
  display: grid;
  max-width: 100vw;
  grid-template-areas:
    'weaponOne weaponOne .       helmet helmet .       weaponTwo weaponTwo'
    'weaponOne weaponOne .       helmet helmet .       weaponTwo weaponTwo'
    'weaponOne weaponOne .       body   body   amulet  weaponTwo weaponTwo'
    'weaponOne weaponOne ringOne body   body   ringTwo weaponTwo weaponTwo'
    '.         gloves    gloves  body   body   boots   boots     .'
    '.         gloves    gloves  belt   belt   boots   boots     .';
  grid-template-columns: repeat(8, minmax(40px, 60px));
  grid-template-rows: repeat(6, 1fr);
`;

const Flasks = styled.div`
  display: flex;
  justify-content: center;
`;