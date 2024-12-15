const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Função principal que executa o teste
(async function runTest() {
  // Configuração do driver do Chrome
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    // 1. Acesse a página de login
    await driver.get('http://localhost:3000'); // Ajuste para a URL correta.

    // 2. Aguarde até que o campo de email esteja disponível
    let loginField = await driver.wait(until.elementLocated(By.name('email')), 20000); // Espera de 20 segundos
    let passwordField = await driver.wait(until.elementLocated(By.name('password')), 20000); // Espera de 20 segundos

    // 3. Preencha os campos
    await loginField.sendKeys('testuser@example.com');
    await passwordField.sendKeys('password123');

    // 4. Envie o formulário de login
    await passwordField.sendKeys(Key.RETURN);

    // 5. Verifique se o login foi bem-sucedido
    await driver.wait(until.elementLocated(By.id('welcome-message')), 20000); // Ajuste conforme necessário

    // Se tudo deu certo, o teste passará
    console.log('Login realizado com sucesso!');
  } catch (err) {
    console.error('Erro durante o teste:', err);
  } finally {
    // Feche o navegador
    await driver.quit();
  }
})();
