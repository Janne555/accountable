import { Modal } from '@material-ui/core'
import React from 'react'
import './AppModal.css'

type Props = React.PropsWithChildren<{
  isOpen: boolean
  onClose: () => void
}>

function AppModal({ children, onClose, isOpen }: Props): JSX.Element {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <div className="modal-root">
        <div className="modal-container">
          <button className="modal-close">close</button>
          <div className="modal-children">
            {children}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AppModal