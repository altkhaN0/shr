document.addEventListener("DOMContentLoaded", function() {
  // Shopify ayarlarından gelen Auth Key'i güvenli bir şekilde alıyoruz
  const userAuthKey = "{{ settings.auth_key }}".trim();

  console.log('Auth Key:', userAuthKey); // Debugging için konsola yazdır

  // Hata mesajı göstermek için fonksiyon
  function displayError(message) {
    document.body.innerHTML = `<div style='background-color: white; padding: 20px; text-align: center; font-size: 20px;'>${message}</div>`;
  }

  // Auth Key'in boş olup olmadığını kontrol et
  if (!userAuthKey) {
    displayError("Auth Key boş olamaz. Lütfen geçerli bir Auth Key girin.");
    return; // Auth Key boşsa geri döner
  }

  // JSONBin URL ve API Access Key (sadece okuma için)
  const jsonBinUrl = "https://api.jsonbin.io/v3/b/6752b857acd3cb34a8b50b7e/latest"; // Bin ID'nizle değiştirilmiş URL
  const jsonBinAccessKey = "$2a$10$bcBKER7/5IzdnmhPTRAA9uX9kGyXl/QzwF2FNlz3tUUuHNC1yTrBS"; // Sadece okuma izni olan Access Key

  // Auth key'i fetch ile al (X-Access-Key kullanarak)
  fetch(jsonBinUrl, {
    method: 'GET',
    headers: {
      'X-Access-Key': jsonBinAccessKey,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Auth listesi yüklenemedi.");
    }
    return response.json();
  })
  .then(data => {
    console.log('Fetched data:', data); // Debugging için konsola yazdır

    // JSONBin verilerinizin doğru yapıda olduğundan emin olun
    if (!data.record || !Array.isArray(data.record.users)) {
      throw new Error("Veri formatı hatalı.");
    }

    // Auth Key'in JSONBin'deki kullanıcılar arasında olup olmadığını kontrol et
    const user = data.record.users.find(u => u.token === userAuthKey && u.isActive);
    if (!user) {
      displayError("Geçerli bir Auth Key girin.");
    } else {
      console.log("Authentication başarılı. Tema aktif.");
      // Tema aktifse yapılacak işlemleri buraya ekleyebilirsiniz
      // Örneğin, özel mesaj göstermek veya belirli bölümleri etkinleştirmek gibi
    }
  })
  .catch(error => {
    displayError("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    console.error("Error:", error);
  });
});
