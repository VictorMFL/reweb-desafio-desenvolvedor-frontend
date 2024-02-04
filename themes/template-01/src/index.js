let data;

// executa a requisição para pegar os dados do aruivo indes.json
async function get() {
  try {
    const response = await fetch("../source/output/index.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
    document.title = data.texts.title;
  } catch (error) {
    console.log("Ocorreu um erro ao pegar os dados do arquivo json.");
  }
}

get().then(() => {
  // form
  const inputName = document.querySelector("#name");
  const inputEmail = document.querySelector("#email");
  const inputCPF = document.querySelector("#cpf");
  const inputPhone = document.querySelector("#telefone");
  const areaMesage = document.querySelector("#imensagem");
  const privacyPolicy = document.querySelector("#privacidade");
  const buttonSubmit = document.querySelector("#button-submit");

  inputName.placeholder = data.form.banner_01.fields[1].placeholder;
  inputEmail.placeholder = data.form.banner_01.fields[2].placeholder;
  inputCPF.placeholder = "CPF";
  inputPhone.placeholder = data.form.banner_01.fields[3].placeholder;
  areaMesage.placeholder = data.form.banner_01.fields[4].placeholder;
  privacyPolicy.innerHTML = data.form.banner_01.settings.privacy_policy.label;
  buttonSubmit.value = data.form.banner_01.settings.button;

  // resposta do form
  const sentSucces = document.querySelector("#sent-success");
  const errorPost = document.querySelector("#error-post");

  sentSucces.innerHTML = data.form.banner_01.settings.message_success;
  errorPost.innerHTML = data.form.banner_01.settings.message_error;

  // cards
  const urlImage = data.highlights[0].image_home;
  const backgroundCards = document.querySelectorAll(".card");
  backgroundCards.forEach(card => {
    card.style.backgroundImage = `url("${urlImage}")`;
  });

  for (let i = 1; i <= 6; i++) {
    const title = document.querySelector(`.card-${i} .card_content .card_title`);
    const description = document.querySelector(`.card-${i} .card_content .card_description`);
  
    title.innerHTML = data.highlights[i-1].title;
    description.innerHTML = data.highlights[i-1].description;
  }
});
