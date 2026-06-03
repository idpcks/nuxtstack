import { ConfirmModal } from '#components'

export const useAppModal = () => {
    const overlay = useOverlay()

    const openConfirmModal = (
        title: string,
        description: string,
        onConfirm: () => void,
        confirmLabel?: string,
        cancelLabel?: string
    ) => {
        const modal = overlay.create(ConfirmModal, {
            props: {
                title,
                description,
                onConfirm,
                confirmLabel,
                cancelLabel
            }
        })

        modal.open()
    }

    return {
        openConfirmModal
    }
}