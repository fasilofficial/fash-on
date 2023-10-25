const detailsForm = document.getElementById('passwordForm')
const newPassword = document.getElementById('newPassword')
const confirmPassword = document.getElementById('confirmPassword')

const validateNewPasswordAndConfirmPassword = () => {
    const isMatch = newPassword.value === confirmPassword.value
    confirmPassword.classList.add('border-danger')
    if(isMatch) {
        confirmPassword.classList.remove('border-danger')
        confirmPassword.classList.add('border-success')
    }
}
confirmPassword.addEventListener('input', validateNewPasswordAndConfirmPassword)