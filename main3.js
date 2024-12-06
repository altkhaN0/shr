<script>
  document.addEventListener("DOMContentLoaded", function() {
    try {
      // Shopify ayarlarından gelen Auth Key'i güvenli bir şekilde alıyoruz
      const userAuthKey = {{ settings.auth_key | json }}.trim();

      console.log('Auth Key:', userAuthKey); // Debugging için konsola yazdır

      // Token formatını doğrulayan regex deseni (DS-XXXX-XXXX-XXXX-XXXX)
      const keyPattern = /^DS-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

      // Hata mesajı göstermek için fonksiyon
      function displayError(message) {
        console.log('Displaying error:', message);
        document.body.innerHTML = `<div style='background-color: white; padding: 20px; text-align: center; font-size: 20px;'>${message}</div>`;
      }

      // Token'ın formatının uygun olup olmadığını kontrol et
      if (!keyPattern.test(userAuthKey)) {
        console.log('Auth Key formatı geçersiz.');
        displayError("Geçerli bir Auth Key girin (örnek: DS-A1B2-C3D4-E5F6-G7H8).");
        return; // Doğrulama başarısızsa geri döner
      }

      // JSONBin URL ve API Access Key (sadece okuma için)
      const jsonBinUrl = "https://api.jsonbin.io/v3/b/6752b857acd3cb34a8b50b7e/latest"; // Bin ID'nizle değiştirilmiş URL
      const jsonBinAccessKey = "$2a$10$bcBKER7/5IzdnmhPTRAA9uX9kGyXl/QzwF2FNlz3tUUuHNC1yTrBS"; // Sadece okuma izni olan Access Key

      console.log('Fetching data from JSONBin...');

      // Auth key'i fetch ile al (X-Access-Key kullanarak)
      fetch(jsonBinUrl, {
        method: 'GET',
        headers: {
          'X-Access-Key': jsonBinAccessKey,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Fetch response status:', response.status);
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
          console.log('User not found or inactive.');
          displayError("Geçerli bir Auth Key girin.");
        } else {
          console.log("Authentication başarılı. Tema aktif.");
          // Tema aktifse yapılacak işlemleri buraya ekleyebilirsiniz
          // Örneğin, özel mesaj göstermek veya belirli bölümleri etkinleştirmek gibi
        }
      })
      .catch(error => {
        console.error("Error during authentication:", error);
        displayError("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      });
    } catch (error) {
      console.error("Error in script:", error);
      document.body.innerHTML = `<div style='background-color: white; padding: 20px; text-align: center; font-size: 20px;'>Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</div>`;
    }
  });
</script>
