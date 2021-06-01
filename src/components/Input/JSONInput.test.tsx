import { render } from "@testing-library/react";
import React from "react";
import JSONInput from "./JSONInput";
import JSONEditor from 'jsoneditor';
import { mocked } from 'ts-jest/utils'

jest.mock("jsoneditor")

const mockedJSONEditor = mocked(JSONEditor.prototype)

describe('<JSONInput />', () => {
  it('should be integrated (I don\'t know how to test this)', () => {
    render(<JSONInput onChange={jest.fn()} defaultJSON={{ foo: "bar" }} />)

    expect(mockedJSONEditor.set).toHaveBeenCalledWith({ foo: "bar" })
  });
});