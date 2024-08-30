import { screen, render } from '@testing-library/react'
import { AuthAdmin } from './AuthAdmin'

describe('App tests', () => {
    it('should render the title', () => {
        render(<AuthAdmin />)

        expect(
            screen.getByRole('heading', {
                level: 1,
            })
        ).toHaveTextContent('Vite + React')
    })
})
