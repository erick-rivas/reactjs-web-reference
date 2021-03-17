import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react';
import { render, mockGql } from 'seed/jest';
import * as data from 'seed/examples/tests/data'
import List from 'seed/examples/components/matches/List';

test('examples/components/matches/List', () => {
  mockGql.useQuery({"matches": data.GQL_MATCHES})
  render(<List />);
  expect(screen).toBeDefined()
});