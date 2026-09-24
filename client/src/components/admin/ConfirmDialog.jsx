import { AlertTriangle } from 'lucide-react'
import Button from '../common/Button'
import Modal from './Modal'

export default function ConfirmDialog({ title, message, onConfirm, onCancel, isLoading }) {
  return (
    <Modal title={title} onClose={onCancel} maxWidth="max-w-sm">
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-danger">
          <AlertTriangle size={24} aria-hidden="true" />
        </span>
        <p className="mt-4 text-sm text-muted">{message}</p>

        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-danger text-white hover:bg-red-700"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}