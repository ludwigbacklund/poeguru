import React from 'react';

import { render } from '../../../utils/custom-render';
import { Item } from './Item';

describe('Item', () => {
  const name = 'Test item';
  const iconUrl = 'http://example.com/image.png';
  const type = 'Test type';

  const renderItem = () => {
    return render(<Item name={name} iconUrl={iconUrl} type={type} />);
  };

  it('renders the icon', () => {
    const { getByAltText } = renderItem();
    expect(getByAltText(/Test item/i));
    expect(getByAltText(/Test item/i)).toHaveAttribute('src', iconUrl);
  });

  it('renders the name', () => {
    const { getByText } = renderItem();
    expect(getByText(/Test item/i));
  });

  it('renders the type', () => {
    const { getByText } = renderItem();
    expect(getByText(/Test type/i));
  });
});
