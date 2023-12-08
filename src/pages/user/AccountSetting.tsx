import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { User } from "../../hooks/userData"
import { useNavigate } from "react-router-dom"
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { auth, db } from "../../hooks/firebase"
import { sendEmailVerification, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth"

const AccountSetting = () => {

    // Definisikan beberapa state yang akan digunakan untuk proses update email dan password nantinya
    const [dataUser, setDataUser] = useState<User[]>([])
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [email, ] = useState<string>('')
    const [newMail, setNewMail] = useState<string>('')

    const [newPassword, setNewPassword] = useState<string>('')

    const navigate: any = useNavigate()
    const userId = localStorage.getItem('LOGGED_IN')

    // Function fetchUser. fungsi yang sama dengan yang ada dikomponen DefaultLayout
    const fetchUser = async () => {
        const colRef = query(collection(db, "users"), where("userId", '==', userId))
        const querySnapshot = await getDocs(colRef)

        const fetchDataUser: any | undefined = querySnapshot.docs.map((doc) => ({
            ...doc.data()
        }))
        console.log(fetchDataUser);

        setDataUser(fetchDataUser)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const UserData = dataUser[0] || ''
    // console.log("Result userData", UserData);

    const refreshPage = () => {
        setTimeout(() => {
            navigate(0)
        }, 3000)
    }

    // Fungsi untuk  update email authentication user
    const updateEmailUser = async (e: React.FormEvent) => {
        e.preventDefault()

        // Melakukan validasi apakah email dan password kosong
        if (!email && !currentPassword) {
            toast.error("Data tidak boleh kosong")
        }

        // Menyiapkan data yang akan digunakan untuk memperbarui email
        const dataUpdateEmail = {
            currentPassword: currentPassword,
            currentEmail: UserData.email,
            newMail: newMail
        }

        // Mendapatkan referensi ke dokumen yang ada dalam koleksi "users"
        const colRef = doc(db, "users", UserData.userId)
        const querySnapshot = await getDoc(colRef)

        // Menjalankan proses re-authenticate users
        signInWithEmailAndPassword(auth, dataUpdateEmail.currentEmail, dataUpdateEmail.currentPassword).then(() => {
            // Mendapatkan credential users
            const userCredential: any = auth.currentUser

            // Memperbarui email autentikasi user
            updateEmail(userCredential, dataUpdateEmail.newMail).then(() => {
                toast.loading("Update email autentikasi", { duration: 3000 })

                if (querySnapshot.exists()) {
                    // Memperbarui dokumen yang ada di dalam collection users
                    updateDoc(doc(db, "users", UserData.userId), {
                        email: dataUpdateEmail.newMail
                    }).then(() => {

                        // Proses kirim email verifikasi ke user
                        sendEmailVerification(userCredential).then(() => {
                            toast.success("Email verifikasi terkirim", { duration: 3000 })
                        }).catch((errorSendMail: any) => {
                            toast.error(errorSendMail, { duration: 3000 })
                        })
                            // Setelah email terkirim jalankan proses logout dan redirect ke halaman login
                            .finally(() => {
                                signOut(auth).then(() => {
                                    localStorage.clear()
                                    refreshPage()
                                })
                            })
                    }).catch((error: any) => {
                        toast.error(error)
                    })
                }
            })
        })
    }

    // Fungsi untuk update password authentication user
    const updatePasswordUser = async (e: React.FormEvent) => {
        e.preventDefault()

        // lakikan proses validasi input
        if (!newPassword || !currentPassword) {
            return toast.error('Data tidak boleh kosong')
        }

        // Membuat object dataUpdatePassword yang berisi nilai dari hasil query ke document yang ada
        // Pada collection users dan inputan dari user, yang mana object ini kaan digunakan untuk
        // Proses re-authenticate (login) dan update password
        const dataUpdatePassword = {
            currentEmail: UserData.email,
            currentPassword: currentPassword,
            newPassword: newPassword
        }

        // console.log("result datUpdatePassword",dataUpdatePassword);

        // Lakukan proses re-authenticate user
        await signInWithEmailAndPassword(auth, dataUpdatePassword.currentEmail, dataUpdatePassword.currentPassword).then(() => {
            const userCredential: any = auth.currentUser

            // Jika proses berhasil lakukan proses update password
            updatePassword(userCredential, dataUpdatePassword.newPassword).then(() => {
                toast.success('Password berhasil diperbarui')
            }).then(() => {
                // Setelah proses update password berhasil lakukan proses signOut, redirect user ke halaman login
                // Dan hapus data yang tersimpan pada localStorage
                signOut(auth).then(() => {
                    refreshPage()
                    localStorage.clear()
                })
            }).catch((error: any) => {
                toast.error(error)
            })
        })
    }

    return (
        <>
            <Toaster />
            <div className='grid grid-cols-1 gap-9 sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-semibold text-black dark:text-white'>
                                Update Email
                            </h3>
                        </div>
                        <form onSubmit={updateEmailUser}>
                            <div className="p-6.5">

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            name={currentPassword}
                                            onChange={e => setCurrentPassword(e.target.value)}
                                            placeholder="Enter your current password"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name={newMail}
                                            onChange={e => setNewMail(e.target.value)}
                                            placeholder="Enter your new email"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                    </div>
                                </div>

                                <button
                                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Update Email Authentication
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* FORM UPDATE EMAIL AUTHENTICATION */}


                {/* FORM UPDATE PASSWORD FOR AUTHENTICATION */}
                <div className='flex flex-col gap-9'>
                    <div className='rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-semibold text-black dark:text-white'>
                                Update Password
                            </h3>
                        </div>
                        <form onSubmit={updatePasswordUser}>
                            <div className="p-6.5">

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Recent Password
                                        </label>
                                        <input
                                            type="password"
                                            name={currentPassword}
                                            onChange={e => setCurrentPassword(e.target.value)}
                                            placeholder="Recent Password"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            placeholder="New Password"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                    </div>
                                </div>

                                <button
                                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Update Password Authentication
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountSetting