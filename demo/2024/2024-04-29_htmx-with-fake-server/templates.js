// templates
export function formTemplate(contact) {
    return `<form hx-put="/contact/1" hx-target="this" hx-swap="outerHTML">
  <div>
    <label for="firstName">First Name</label>
    <input autofocus type="text" id="firstName" name="firstName" value="${contact.firstName}">
  </div>
  <div class="form-group">
    <label for="lastName">Last Name</label>
    <input type="text" id="lastName" name="lastName" value="${contact.lastName}">
  </div>
  <div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email" value="${contact.email}">
  </div>
  <button class="btn" type="submit">Submit</button>
  <button class="btn" hx-get="/contact/1">Cancel</button>
</form>`
}

export function displayTemplate(contact) {
    return `<div hx-target="this" hx-swap="outerHTML">
    <div><label>First Name</label>: ${contact.firstName}</div>
    <div><label>Last Name</label>: ${contact.lastName}</div>
    <div><label>Email Address</label>: ${contact.email}</div>
    <button hx-get="/contact/1/edit" class="btn btn-primary">
    Click To Edit
    </button>
</div>`;
}
