import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import groupBy from 'lodash/groupBy';

import { useGemsQuery } from '../../graphql-types';
import isNotNull from '../../utils/isNotNull';
import { useStoreState } from '../../features';
import { Placeholder } from '../Placeholder/Placeholder';
import { desktop } from '../../utils/styling';

export const Gems: React.SFC = () => {
  const currentTimelineLevel = useStoreState(
    state => state.build.currentTimelineLevel,
  );
  const { data, loading, error } = useGemsQuery({
    variables: { buildId: 1, currentLevel: currentTimelineLevel },
  });
  if (!data || loading || error) {
    return <Placeholder height={320}>No gems...</Placeholder>;
  }

  const buildGemNodes =
    (data.buildGemsByBuildIdAndLevel &&
      data.buildGemsByBuildIdAndLevel.nodes) ||
    [];
  const buildGems = buildGemNodes.filter(isNotNull);
  const buildGemsByGemGroup = groupBy(buildGems, ({ gemGroup }) =>
    gemGroup ? gemGroup.id : null,
  );

  return (
    <GemsWrapper>
      <Header>Gems</Header>
      <GemGroups>
        {Object.entries(buildGemsByGemGroup).map(([gemGroupId, gemGroup]) => (
          <div key={gemGroupId}>
            {gemGroup
              .sort((buildGemA, buildGemB) =>
                buildGemA.slot > buildGemB.slot ? 1 : -1,
              )
              .map(({ gem }) => {
                if (!gem) return;
                return (
                  <Gem key={gem.name}>
                    <img src={gem.iconUrl} />
                    <GemName>{gem.name}</GemName>
                  </Gem>
                );
              })}
          </div>
        ))}
      </GemGroups>
    </GemsWrapper>
  );
};

export const GEMS_QUERY = gql`
  query Gems($buildId: Int!, $currentLevel: Int!) {
    buildGemsByBuildIdAndLevel(
      givenBuildId: $buildId
      givenLevel: $currentLevel
    ) {
      nodes {
        level
        slot
        gemGroup {
          id
        }
        gem {
          name
          iconUrl
        }
      }
    }
  }
`;

const GemsWrapper = styled.div`
  grid-column: 1 / 3;
`;

const GemGroups = styled.div`
  display: flex;
`;

const Header = styled.h2`
  margin: 8px 0 0 4px;
`;

const Gem = styled.div`
  display: flex;
  align-items: center;

  @media (${desktop}) {
    width: 260px;
  }
`;

const GemName = styled.span`
  margin: 4px;
`;
