export async function validate(form) {
    const { valid } = await form.value.validate();
    return valid;
}
