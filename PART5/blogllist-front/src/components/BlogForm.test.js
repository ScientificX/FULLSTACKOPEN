import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogFrom from './BlogForm'

test.only('event handler works', () => {

    const handleNewBlog = jest.fn()
    const component = render(
        <BlogFrom handleNewBlog={handleNewBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#form')


    fireEvent.change(title, {
        target: { value: 'attack the blog' }
    })
    fireEvent.change(author, {
        target: { value: 'me' }
    })
    fireEvent.change(url, {
        target: { value: 'lordknows.com' }
    })

    fireEvent.submit(form)

    expect(handleNewBlog.mock.calls).toHaveLength(1)

})