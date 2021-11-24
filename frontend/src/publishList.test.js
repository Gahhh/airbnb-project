import React from 'react';
import { render, screen } from '@testing-library/react';
import PublishList from './components/PublishList';

describe('publishListing', () => {
  let props;
 
  it('has Go Live Button when listing has not yet been published', () => {
    props = {
      listingId: 940439261,
      listing: {
        published: false,
        availability: []
      }
    }
    render(<PublishList {...props}/>)
    expect(screen.getByText('Go Live')).toBeInTheDocument();
  })

  it('has publishing Button when listing has been published', () => {
    props = {
      listingId: 940439261,
      listing: {
        published: true,
        availability: []
      }
    }
    render(<PublishList {...props}/>)
    expect(screen.getByText('Publishing')).toBeInTheDocument();
  })

})