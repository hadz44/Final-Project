import './RegisterModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm'

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')
    onRegister({ email, password, name })
  }

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      buttonText="Sign up"
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
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Enter your name"
          required
          minLength="2"
        />
      </label>
      <p className="modal__switch">
        or{' '}
        <button
          type="button"
          className="modal__switch-link"
          onClick={() => {
            onClose()
            onSwitchToLogin()
          }}
        >
          Sign in
        </button>
      </p>
    </ModalWithForm>
  )
}

export default RegisterModal
