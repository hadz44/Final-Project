import './LoginModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import { useEffect, useState } from 'react'

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({ email: false, password: false })
  const [isValid, setIsValid] = useState(false)

  const validateEmail = (value) => {
    if (!value) return 'Email is required'
    if (!/^\S+@\S+\.\S+$/.test(value)) return 'Enter a valid email address'
    return ''
  }

  const validatePassword = (value) => {
    if (!value) return 'Password is required'
    if (value.length < 8) return 'Password must be at least 8 characters'
    return ''
  }

  useEffect(() => {
    if (!isOpen) return
    setValues({ email: '', password: '' })
    setErrors({ email: '', password: '' })
    setTouched({ email: false, password: false })
    setIsValid(false)
  }, [isOpen])

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error)
    const hasValues = values.email && values.password
    setIsValid(!hasErrors && hasValues)
  }, [errors, values])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    }
    if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) {
      setTouched({ email: true, password: true })
      return
    }
    onLogin({ email: values.email, password: values.password })
  }

  const footer = (
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
  )

  return (
    <ModalWithForm
      name="login"
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
      footer={footer}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className={`modal__input ${
            touched.email && errors.email ? 'modal__input_error' : ''
          }`}
          placeholder="Enter email"
          required
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className={`modal__input ${
            touched.password && errors.password ? 'modal__input_error' : ''
          }`}
          placeholder="Enter password"
          required
          minLength="8"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  )
}

export default LoginModal
