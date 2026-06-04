export const useAppToast = () => {
    const toast = useToast()

    // Fungsi pembantu untuk membuat ID unik berdasarkan warna dan judul guna mencegah spam
    const generateToastId = (color: string, title: string) => {
        const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-')
        return `${color}-${slug}`
    }

    const showSuccess = (title: string, description?: string) => {
        toast.add({
            id: generateToastId('success', title),
            title,
            description,
            color: 'success',
            icon: 'i-heroicons-check-circle'
        })
    }

    const showError = (title: string, description?: string) => {
        toast.add({
            id: generateToastId('error', title),
            title,
            description,
            color: 'error',
            icon: 'i-heroicons-x-circle'
        })
    }

    const showWarning = (title: string, description?: string) => {
        toast.add({
            id: generateToastId('warning', title),
            title,
            description,
            color: 'warning',
            icon: 'i-heroicons-exclamation-circle'
        })
    }

    const showInfo = (title: string, description?: string) => {
        toast.add({
            id: generateToastId('info', title),
            title,
            description,
            color: 'info',
            icon: 'i-heroicons-information-circle'
        })
    }

    return {
        showSuccess,
        showError,
        showWarning,
        showInfo
    }
}