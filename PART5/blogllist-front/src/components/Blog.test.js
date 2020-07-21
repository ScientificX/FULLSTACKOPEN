import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content but not full', () => {
    const blog = {
        likes: 3,
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/"
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'React patterns'
    )
    expect(component.container).not.toHaveTextContent(
        'https://reactpatterns.com/'
    )


})

test('button is clicked ', () => {

    const blog = {
        likes: 3,
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/"
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'React patternsMichael Chan unview likedelete'
    )

}  )
