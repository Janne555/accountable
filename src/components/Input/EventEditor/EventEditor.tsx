import React from 'react';
import { IEvent } from '../../../types';
import JSONInput from '../JSONInput';
import { Button } from '@material-ui/core'
import { makeEvent } from '../../../factories';
import { isEvent } from '../../../utils';
import './EventEditor.css'

type Props = {
  defaultValue?: IEvent
  onSave: (event: IEvent) => void
}

function EventEditor({ onSave, defaultValue = makeEvent(0, new Date(), [], "historical", "") }: Props): JSX.Element {
  const [json, setJson] = React.useState<any>(defaultValue)
  const [editedEvent, setEditedEvent] = React.useState<IEvent>()
  const handleChange = React.useCallback((json: any) => {
    if ("date" in json) {
      setJson({ ...json, date: new Date(json.date) })
    } else {
      setJson(json)
    }
  }, [])

  React.useEffect(() => {
    if (isEvent(json)) {
      setEditedEvent(json)
    } else {
      setEditedEvent(undefined)
    }
  }, [json])

  function handleSave() {
    if (editedEvent) {
      onSave(editedEvent)
    }
  }

  return (
    <div className="event-editor">
      <div className="event-editor-input">
        <JSONInput onChange={handleChange} defaultJSON={json} />
      </div>
      <Button className="event-editor-save" disabled={!editedEvent} variant="contained" color="primary" onClick={handleSave}>Save</Button>
    </div>
  )
}

export default EventEditor