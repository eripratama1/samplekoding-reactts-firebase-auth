import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../hooks/userData';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../hooks/firebase';

/**
 * 
 * React.FC adalah tipe (type) dari variabel DefaultLayout. 
 * FC singkatan dari "Function Component" dan merupakan bagian dari modul React. 
 * Ini digunakan untuk mendeklarasikan bahwa variabel DefaultLayout adalah sebuah React function component.
 *  */
const DefaultLayout: React.FC = () => {

  /**
   * mendeklarasikan state sidebarOpen yang awalnya diatur ke false, dan setSidebarOpen adalah fungsi yang digunakan 
   * untuk memperbarui nilai dari state sidebarOpen. State ini digunakan untuk mengetahui apakah sidebar dalam 
   * kondisi terbuka atau tidak
   */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   * Mendeklarasikan state loading yang awalnya diatur ke true, dan setLoading adalah fungsi untuk 
   * memperbarui nilai dari state loading tersebut
   */
  const [, setLoading] = useState<boolean>(true)

  /**
   * Mendeklarasikan state dataUser yang awalnya diatur sebagai array kosong ([]). 
   * setDataUser adalah fungsi untuk memperbarui nilai dari state dataUser. State ini digunakan untuk menyimpan data 
   * pengguna (user), dan tipe datanya didefinisikan sebagai User[], yang berarti itu adalah array dari objek-objek 
   * yang mengikuti struktur dari interface User yang sudah dibuat pada file userData.ts yang ada pada folder hooks 
   * 
   */
  const [dataUser, setDataUser] = useState<User[]>([])

  /**
   * useEffect ini berguna ketika kita ingin menunjukkan bahwa aplikasi sedang memuat data atau memberikan efek 
   * loading selama beberapa waktu tertentu setelah komponen di-mount
   */
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])


  useEffect(() => {
    async function fetchUser() {
      // Mendapatkan userId dari local storage
      const userId = localStorage.getItem('LOGGED_IN')
      
      // Membuat referensi koleksi (colRef) yang akan diquery dengan menggunakan where untuk filter data berdasarkan 
      // userId
      const colRef = query(collection(db,'users'),where('userId','==',userId))
      
      // Melakukan query ke Firestore dan mendapatkan snapshot hasil query.
      const querySnapshot = await getDocs(colRef)

      // Mengambil data dari setiap dokumen dalam snapshot menggunakan metode map. 
      // fetchdataUser sekarang berisi array objek data pengguna (users).
      const fetchdataUser:any | undefined = querySnapshot.docs.map((doc) => ({
        ...doc.data()
      }))

      // Memperbarui state dataUser dengan data yang telah diambil dari Firestore.
      setDataUser(fetchdataUser)
    }
    fetchUser()
  }, [])

  if (!localStorage.getItem('LOGGED_IN')) {
    return <Navigate to="/auth/login"/>
  }

   return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}

          {/* 
            Pada komponen Header dan Sidebar diatas kita melakukan passing nilai dari state yang sudah dideklarasikan
            yang nantinya niai tersebut akan kita gunakan pada masing-masing komponen tersebut 
          */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            dataUser={dataUser}
            setDataUser={setDataUser}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
