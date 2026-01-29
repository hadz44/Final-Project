import './RegisterModal.css'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import { useEffect, useState } from 'react'

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [values, setValues] = useState({ email: '', password: '', name: '' })
  const [errors, setErrors] = useState({ email: '', password: '', name: '' })
  const [touched, setTouched] = useState({ email: false, password: false, name: false })
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

  const validateName = (value) => {
    if (!value) return 'Name is required'
    if (value.length < 2) return 'Name must be at least 2 characters'
    return ''
  }

  useEffect(() => {
    if (!isOpen) return
    setValues({ email: '', password: '', name: '' })
    setErrors({ email: '', password: '', name: '' })
    setTouched({ email: false, password: false, name: false })
    setIsValid(false)
  }, [isOpen])

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error)
    const hasValues = values.email && values.password && values.name
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
    if (name === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(value) }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) {
      setTouched({ email: true, password: true, name: true })
      return
    }
    onRegister({ email: values.email, password: values.password, name: values.name })
  }

  const footer = (
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
  )

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      buttonText="Sign up"
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
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className={`modal__input ${
            touched.name && errors.name ? 'modal__input_error' : ''
          }`}
          placeholder="Enter your name"
          required
          minLength="2"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
    </ModalWithForm>
  )
}

export default RegisterModal
