import JSONEditor from 'jsoneditor';
import React from 'react';

type Props = {
  defaultJSON?: any
  onChange: (json: any) => void
}

function JSONInput({ defaultJSON, onChange }: Props): JSX.Element {
  const defaultJSONRef = React.useRef(defaultJSON)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const jsonEditorRef = React.useRef<JSONEditor>()
  const handleChange = React.useCallback(() => {
    try {
      const value = jsonEditorRef.current?.get()
      onChange(value)
    } catch (error) { }
  }, [onChange])

  React.useEffect(() => {
    if (containerRef.current) {
      jsonEditorRef.current = new JSONEditor(containerRef.current, { onChange: handleChange, modes: ['code', 'text', 'form', 'tree'] })
      jsonEditorRef.current.set(defaultJSONRef.current)
    }
    return () => { jsonEditorRef.current?.destroy() }
  }, [handleChange])

  return (
    <div ref={containerRef}></div>
  )
}

export default JSONInput