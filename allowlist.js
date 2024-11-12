// allowlist.js
const allowedKeys = ["TEST1", "TEST2", "TEST3"];

// Fonksiyon: Belirli bir anahtarın allowlist'te olup olmadığını kontrol eder
function isKeyAllowed(key) {
  return allowedKeys.includes(key);
}

// Örnek kullanım
const animationsType = "{{ settings.animations_type }}".trim(); // Tema ayarlarından gelen anahtar

if (isKeyAllowed(animationsType)) {
  console.log('Geçerli anahtar bulundu: Tema çalıştırılıyor.');
  // Tema aktif etme işlemleri buraya gelir
} else {
  console.log('Geçersiz anahtar. Tema devre dışı bırakıldı.');
}
