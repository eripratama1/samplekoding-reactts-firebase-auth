// Interface User digunakan untuk mendeklarasikan kontrak atau struktur data yang akan 
// diikuti oleh objek yang mengimplementasikannya

// Email, name, image, dan userId ini adalah properti yang mendeklarasikan bahwa objek interface user
// harus memiliki properti tersebut serta tipe data sesuai dengan yang sudah dideklarasikan
export interface User {
    email:string;
    name:string;
    image:string | any; // Untuk tipe data image bisa berupa string atau tipe data yang lain (any)
    userId:string;
}