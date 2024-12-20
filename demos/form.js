const messageFormElement = document.getElementById("message-form");

messageFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const messageFormData = new FormData(messageFormElement);

  const messageData = {
    name: messageFormData.get("full-name"),
    email: messageFormData.get("email"),
    phone: messageFormData.get("phone"),
    message: messageFormData.get("message"),
  };

  console.log({ messageData });
});
