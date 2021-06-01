import Database from "../misc/database";
import { createContextWrapper } from "../testUtils";
import StorageWorkerAPI from "../workers/storageWorkerAPI";
import * as TESTDATA from "../testData";
import React from 'react'
import { useEventsQuery, useHistoricalEventsMutation } from "./storageHooks";
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { makeEvent } from "../factories";

describe('storageHooks', () => {
  const db = new Database()
  const storageWorkerClient = new StorageWorkerAPI(db)

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
    const Wrapper = createContextWrapper(storageWorkerClient)
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

    await expect(waitFor(() => screen.getByText("bar"))).resolves.toBeInTheDocument()
  });

  it('should add event', async () => {
    const Wrapper = createContextWrapper(storageWorkerClient)
    const Comp = () => {
      const { data } = useEventsQuery()
      const { putMutation } = useHistoricalEventsMutation()

      return (
        <div>
          <button onClick={() => {
            putMutation.mutate([makeEvent(10, new Date(), [], "historical", "this is a new event")])
          }}>
            update
          </button>
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

    fireEvent.click(screen.getByText("update"))

    await expect(waitFor(() => screen.getByText("this is a new event"))).resolves.toBeInTheDocument()
  });

  it('should delete an event', async () => {
    const Wrapper = createContextWrapper(storageWorkerClient)
    const Comp = () => {
      const { data, isLoading } = useEventsQuery()
      const { deleteMutation } = useHistoricalEventsMutation()
      const event = data?.find(event => event.description === "bar")

      return (
        <div>
          <button onClick={() => {
            if (!event?.id) return {}
            deleteMutation.mutate([event.id])
          }}>
            update
          </button>
          <p>{isLoading ? "loading" : ""}</p>
          {data?.map(event => <p key={event.id}>{event.description}</p>)}
        </div>
      )
    }

    render(
      <Wrapper>
        <Comp />
      </Wrapper>
    )

    await expect(waitFor(() => screen.getByText("bar"))).resolves.toBeInTheDocument()

    fireEvent.click(screen.getByText("update"))

    if (screen.queryByText("loading")) {
      await waitForElementToBeRemoved(() => screen.getByText("loading"))
    }

    await expect(waitFor(() => screen.queryByText("bar"))).resolves.not.toBeInTheDocument()
  });

  it('should update query if opts change', async () => {
    const Wrapper = createContextWrapper(storageWorkerClient)
    const Comp = () => {
      const [start, setStart] = React.useState(new Date("2000-01-01T00:00"))
      const { data, isLoading } = useEventsQuery(start)
      return (
        <div>
          <button onClick={() => {
            setStart(new Date("2020-01-01T00:00"))
          }}>
            update
          </button>
          <p>{isLoading ? "loading" : ""}</p>
          {data?.map(event => <p key={event.id}>{event.description}</p>)}
        </div>
      )
    }

    render(
      <Wrapper>
        <Comp />
      </Wrapper>
    )

    await expect(waitFor(() => screen.getByText("bar"))).resolves.toBeInTheDocument()

    fireEvent.click(screen.getByText("update"))

    if (screen.queryByText("loading")) {
      await waitForElementToBeRemoved(() => screen.getByText("loading"))
    }

    await expect(waitFor(() => screen.queryByText("bar"))).resolves.not.toBeInTheDocument()
  });
});