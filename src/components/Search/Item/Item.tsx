import * as React from 'react';
import styled from 'styled-components';

import { fontSizes, desktop } from '../../../utils/styling';
import { Popover } from '../../Popover/Popover';
import { SearchItem } from '../../../graphql-types';
import { UniqueConnector } from '../../UniqueDetails/UniqueConnector';

export const Item: React.SFC<{} & SearchItem> = ({ name, type, iconUrl }) => (
  <Popover
    content={() => {
      type !== 'gem' && name && <UniqueConnector name={name} />;
    }}
  >
    <ItemWrapper tabIndex={0}>
      {iconUrl && <ItemIcon src={iconUrl} alt={name ? name : 'Item'} />}
      <Name>{name || 'Unknown'}</Name>
      <Type>{type && type.toUpperCase()}</Type>
    </ItemWrapper>
  </Popover>
);

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:focus {
    padding: 8px;
    color: rgb(${props => props.theme.lightShades});
    background-color: rgb(${props => props.theme.lightAccent});
    border-radius: 4px;
    outline: none;
    border: 1px;
  }
`;

const ItemIcon = styled.img`
  width: 30px;

  @media (${desktop}) {
    height: 30px;
    object-fit: scale-down;
    width: 40px;
    height: 40px;
  }
`;

const Name = styled.p`
  ${fontSizes.sm}

 @media (${desktop}) {
  margin: 0 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  }
`;

const Type = styled.span`
  ${fontSizes.xs}

 @media (${desktop}) {
  ${fontSizes.sm}
  color: rgba(${(props: any) => props.theme.darkShades}, 0.6);
  text-align: end;
  margin-left: auto;
  white-space: nowrap;
  }
`;
