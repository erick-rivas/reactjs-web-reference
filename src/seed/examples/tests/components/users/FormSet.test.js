import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react';
import { render, mockGql } from 'seed/jest';
import * as data from 'seed/examples/tests/data'
import FormSet from 'seed/examples/components/users/FormSet';

test('examples/components/users/FormSet', () => {
  mockGql.useDetail({"user": data.GQL_USER})
    mockGql.useQuery({"teams": data.GQL_TEAMS});
  mockGql.useSet({"user": data.GQL_USER})
  render(<FormSet />);
  expect(screen).toBeDefined()
});