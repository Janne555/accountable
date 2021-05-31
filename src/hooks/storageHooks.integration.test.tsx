import Database from "../misc/database";
import { createContextWrapper } from "../testUtils";
import StorageWorkerAPI from "../workers/storageWorkerAPI";
import * as TESTDATA from "../testData";
import React from 'react'
import { useEventsQuery } from "./storageHooks";
import { render, screen, waitFor } from "@testing-library/react";

describe('storageHooks', () => {
  const db = new Database()
  const storageWorkerClient = new StorageWorkerAPI(db)
  const Wrapper = createContextWrapper(storageWorkerClient)

  const { event, event2, event3, event4 } = TESTDATA.events
  const { recurringEvent, recurringEvent2 } = TESTDATA.recurringEvents

  beforeEach(async () => {
    await db.events.bulkAdd([event, event2, event3, event4])
    await db.recurringEvents.bulkAdd([recurringEvent, recurringEvent2])
  })

  afterEach(async () => {
    await db.events.clear()
    await db.recurringEvents.clear()
  })

  it('should get events', async () => {
    const Comp = () => {
      const { data } = useEventsQuery()

      return (
        <div>
          {data?.map(event => <p key={event.id}>{event.description}</p>)}
        </div>
      )
    }

    render(
      <Wrapper>
        <Comp />
      </Wrapper>
    )

    await waitFor(() => screen.getByText("bar"))

    expect(screen.getByText("bar")).toBeInTheDocument()
  });
});