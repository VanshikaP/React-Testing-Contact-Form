import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ContactForm from './ContactForm'

test('loads contact form', () => {
    render(<ContactForm />)
})

test('contact form displays info', () => {
    const { getByLabelText, getByText, findByText, findAllByText } = render(<ContactForm />)

    const firstNameInput = getByLabelText(/first name/i) // test failed - added id to input
    const lastNameInput = getByLabelText(/last name/i)
    const emailInput = getByLabelText(/email/i)
    const humanCheck = getByLabelText(/i am a human/i)
    const messageInput = getByLabelText(/message/i)

    fireEvent.change(firstNameInput, {
        target: {
            name: 'firstName',
            value: 'Vanshika'
        }
    })
    fireEvent.change(lastNameInput, {
        target: {
            name: 'lastName',
            value: 'Pundir'
        }
    })
    fireEvent.change(emailInput, {
        target: {
            name: 'email',
            value: 'abc@test.com'
        }
    })
    fireEvent.change(messageInput, {
        target: {
            name: 'message',
            value: 'this is a test message from Vanshika'
        }
    })
    fireEvent.click(humanCheck)

    // added label for submit input
    const submitButton = getByText(/submit/i)
    fireEvent.click(submitButton)

    //assertion
    findByText(/this is a test message from Vanshika/i)
})

test('required first name', () => {
    const { getByLabelText, findByText } = render(<ContactForm />)

    const firstNameInput = getByLabelText(/first name/i)
    fireEvent.change(firstNameInput, {
        target: {
            name: 'firstName',
            value: ''
        }
    })
    // assertion
    findByText(/error/i)
})