import Button from '@mui/material/Button'
import { FC } from 'react'

type Props = {
    buttonText: string
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit'
}

export const SubmitButton: FC<Props> = ({ buttonText, color }) => {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginX: 0, marginY: 3 }}
            color={color}
        >
            {buttonText}
        </Button>
    )
}
