// @ts-nocheck
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { useNotify, useTranslate } from 'react-admin'

const raTransformFileOnUpload = (file) => {
    if (!(file instanceof File)) {
        return file
    }

    const preview = URL.createObjectURL(file)
    const transformedFile = {
        rawFile: file,
        url: preview,
        title: file.name,
    }

    return transformedFile
}

const UploadPictureButton = forwardRef(({ className, icon, label, onUpload }, ref) => {
    const notify = useNotify()
    const translate = useTranslate()

    const onPictureUpload = (e) => {
        const files = Array.from(e.target.files)
        const types = ['image/png', 'image/jpeg', 'image/gif']
        const file = files[0]

        if (types.every((type) => file.type !== type)) {
            notify(`'${file.type}' file type is not a supported format`, 'warning')
            return
        }

        if (file.size > 150000) {
            notify('File is too large, please pick a smaller file (limit 15mb)', 'warning')
            return
        }

        onUpload(raTransformFileOnUpload(file))
    }

    return (
        <>
            <input
                id="upload-picture"
                accept="image/*"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => onPictureUpload(e)}
            />
            <label htmlFor="upload-picture" className={className}>
                <Button
                    ref={ref}
                    color="primary"
                    variant="text"
                    fullWidth
                    startIcon={icon}
                    component="span"
                >
                    {translate(label)}
                </Button>
            </label>
        </>
    )
})

UploadPictureButton.defaultProps = {
    icon: <CloudUploadIcon />,
    label: 'Upload picture',
    onUpload: () => {},
}

UploadPictureButton.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.string,
    onUpload: PropTypes.func,
}

export default UploadPictureButton
