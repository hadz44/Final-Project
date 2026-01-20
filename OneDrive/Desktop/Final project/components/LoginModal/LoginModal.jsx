import './LoginModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm'

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')
    onLogin({ email, password })
  }

  return (
    <ModalWithForm
      name="login"
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter email"
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Enter password"
          required
          minLength="8"
        />
      </label>
      <p className="modal__switch">
        or{' '}
        <button
          type="button"
          className="modal__switch-link"
          onClick={() => {
            onClose()
            onSwitchToRegister()
          }}
        >
          Sign up
        </button>
      </p>
    </ModalWithForm>
  )
}

export default LoginModal
