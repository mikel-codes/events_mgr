export const GetMessages = (elem) => {
    const messages = []
    const elem_name = elem.name.split("_").join(" ")
    if (elem.validity.valueMissing)
        messages.push(`${elem_name} is a required field`)
    if (elem.validity.typeMismatch)
        messages.push(`${elem_name} is not entered correctly`)
    return messages
}