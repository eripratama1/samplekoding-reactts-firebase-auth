import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { User } from '../../hooks/userData'
import { useNavigate } from 'react-router-dom'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db, storage } from '../../hooks/firebase'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'


const Profile = () => {

  /**
   * Inisialisasi beberapa state 
   * 
   * dataUser state yang akan menyimpan array dari objek-objek yang sesuai dengan type User yang suadh dibuat. 
   * Awalnya diinisialisasi sebagai array kosong. setDataUser adalah fungsi yang digunakan untuk 
   * memperbarui nilai dari dataUser.
   * 
   * fullname adalah state yang akan menyimpan sebuah string yang mewakili nama lengkap. 
   * Awalnya diinisialisasi sebagai string kosong. setFullname adalah fungsi yang digunakan untuk memperbarui 
   * nilai dari fullname.
   * 
   * fileImage state yang akan menyimpan objek file gambar Tipe datanya didefinisikan sebagai File | null | any, 
   * yang berarti bisa berupa objek File, null, atau tipe data apa pun (any). setFileImage adalah fungsi 
   * yang digunakan untuk memperbarui nilai dari fileImage
   */

  const [dataUser, setDataUser] = useState<User[]>([])
  const [fullname, setFullname] = useState<string>('')
  const [fileImage, setFileImage] = useState<File | null | any>(null)

  /**
   * Penggunaan hook useNavigate dari React Router untuk mendapatkan fungsi navigate, 
   * yang dapat digunakan untuk navigasi antar halaman. Penggunaan tipe data any pada variabel navigate 
   * menunjukkan bahwa tipe data dari fungsi navigate tidak spesifik atau tidak ditentukan secara eksplisit
   */
  const navigate: any = useNavigate()

  /**
   * Mengakses nilai yang ada pada localStorage (localStorage.getItem) untuk mendapatkan nilai dari kunci 'LOGGED_IN' 
   * dalam local storage.Penggunaan tipe data any pada variabel userId menunjukkan bahwa tipe data dari nilai yang 
   * diperoleh dari local storage tidak spesifik.
   */
  const userId: any = localStorage.getItem('LOGGED_IN')

  /**
   * Fungsi untuk mengambil data dari firebase beradasrkan userId dari user yang login
   * 
   */
  async function fetchUser() {
     // Membuat referensi ke koleksi 'users' di Firestore dan melakukan query berdasarkan 'userId'
    const colRef = query(collection(db, 'users'), where('userId', '==', userId))

     // Mendapatkan snapshot hasil query
    const querySnapshot = await getDocs(colRef)

     // Mapping setiap dokumen dari snapshot ke dalam array fetchDataUser
    const fetchDataUser: any | undefined = querySnapshot.docs.map((doc) => ({
      ...doc.data()
    }))

      // Memperbarui state dataUser dengan nilai fetchDataUser
    setDataUser(fetchDataUser)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  // Mendestrukturisasi nilai stat dataUser
  const { name, image } = dataUser[0] || {}

  const refreshPage = () => {
    setTimeout(() => {
      navigate(0)
    }, 3000)
  }

  /**
   * 
   * Fungsi untuk proses update proifle user login
   * Fungsi ini melakukan update dokumen Firestore dengan data baru, termasuk URL gambar baru jika ada.
   * Jika pengguna memiliki gambar sebelumnya, gambar tersebut dihapus dari penyimpanan sebelum gambar baru diupload.
   * Progres upload gambar ditampilkan menggunakan toast.loading.
   * URL download gambar baru diperoleh setelah gambar berhasil diupload.
   * Setelah selesai, dokumen Firestore diupdate dengan data baru.
   */
  const handleUpdateData = (e: React.FormEvent) => {
    e.preventDefault()

    /**
     * Fungsi ini di mulai dengan memeriksa apakah ada file gambar yang akan di upload (!fileImage).
       Jika tidak ada maka lakuak proses update nama user saja. Fungsi updateDoc dari Firestore digunakan untuk 
       memperbarui dokumen dengan data baru.

       Setelah pembaruan berhasil, pesan sukses ditampilkan menggunakan toast.success, dan 
       halaman direfresh dengan memanggil fungsi refreshPage.
     */
    if (!fileImage) {
      const colRef = doc(db, 'users', userId)

      const dataUpdate = {
        name: fullname ? fullname : name
      }

      updateDoc(colRef, dataUpdate).then(() => {
        toast.success("Update berhasil")
        refreshPage()
      }).catch((error: any) => toast.error(error))
    } else {

      /**
       * Jika ada file gambar ynag akan diupload (fileImage), cek terlebih dulu apakah pengguna (user) sudah 
       * memiliki gambar sebelumnya (image), jika ada maka gambar tersebut dihapus dari penyimpanan menggunakan 
       * deleteObject. Lalu membuat Referensi penyimpanan baru dibuat menggunakan path yang baru.
         
         File gambar baru diupload menggunakan uploadBytesResumable. Event listener (uploadTask.on) digunakan untuk 
         memantau progres upload dan menampilkan pesan loading menggunakan toast.loading. Setelah upload selesai 
         ('success' state), URL download gambar baru diperoleh menggunakan getDownloadURL. Dokumen Firestore diperbarui 
         dengan data baru, termasuk URL gambar baru. Pesan sukses ditampilkan dan halaman direfresh setelah 
         pembaruan berhasil.
       */
      if (image) {
        const storage = getStorage()
        const imgRef = ref(storage, image)
        deleteObject(imgRef).then(() => {
          toast.loading('Hapus gambar lama...', { duration: 2000 })
        }).catch((error: any) => {
          toast.error(error)
        })
      }

      const imageName = new Date().getTime()
      const storagePath = "imgUsers/" + imageName
      const storageRef = ref(storage, storagePath)
      const uploadTask = uploadBytesResumable(storageRef, fileImage)

      uploadTask.on("state_changed", (snapshot) => {
        const progressUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        switch (snapshot.state) {
          case 'paused':
            toast.loading('Progress Upload' + progressUpload + '%', { duration: 3000 })
            break;
          case 'running':
            toast.loading('Progress Upload' + progressUpload + '%', { duration: 3000 })
            break;
          case 'success':
            toast.success('Upload gambar berhasil')
            break;
        }
      }, (error: any) => {
        toast.error(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          const colRef = doc(db, "users", userId)

          const dataUpdate = {
            name: fullname ? fullname : name,
            image: downloadUrl
          }

          updateDoc(colRef, dataUpdate).then(() => {
            toast.success('Update berhasil')
            refreshPage()
          })
        })
      })

    }
  }


  return (
    <React.Fragment>
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false} />
      </div>
      <div className='flex flex-col gap-9  '>
        <div className='rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
            <h3 className='font-semibold text-black dark:text-white'>
              Update Profile
            </h3>
          </div>
          <form onSubmit={handleUpdateData}>
            <div className="p-6.5">

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name={name}
                    defaultValue={name}
                    onChange={e => setFullname(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Upload Image
                </label>
                <input
                  type='file'
                  onChange={(e) => setFileImage(e.target.files ? e.target.files[0] : null)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
              </div>

              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Profile