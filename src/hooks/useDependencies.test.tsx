import React from 'react'
import { render } from "@testing-library/react";
import { DependencyProvider, useDependecies } from "./useDependencies";

describe('useDependencies', () => {
  it('should instantiate dependencies', () => {
    const Comp = () => {
      const { } = useDependecies()

      return (
        <div>

        </div>
      )
    }

    render(
      <DependencyProvider>
        <Comp />
      </DependencyProvider>
    )
  });
});