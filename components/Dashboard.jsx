'use client'
import { Fugaz_One, Luckiest_Guy, Poppins } from "next/font/google";
import Calendar from "@/components/Calendar";
import React, {useEffect, useState} from 'react'
import { useAuth } from "@/context/AuthContext";
import { average, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";

const fugaz = Luckiest_Guy({subsets: ['latin'], weight: ['400']});
const lgPoppins = Poppins({subsets: ['latin'], weight: ['700']})

function Dashboard() {

  const {currentUser, userDataObj, setUserDataObj, loading} = useAuth();
  const [data, setData] = useState({});
  const now = new Date();


  async function handleSetMood(mood) {
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    try {
      const newData = { ...userDataObj }
      if (!newData?.[year]) {
        newData[year] = {}
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {}
      }

      newData[year][month][day] = mood
      // update the current state
      setData(newData);
      // update the global state
      setUserDataObj(newData);
      // update firebase
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, { merge: true })
    } catch (err) {
      console.log('Failed to set data: ', err.message)
    }
  }

  function countValue() {
    let total_days_num = 0;
    let sum_moods = 0;

    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day];
          total_days_num ++;
          sum_moods += days_mood;
        }
      }
    }
    return {num_days: total_days_num, average_mood: sum_moods / total_days_num}
  }

  const statuses = {
    ...countValue(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}MIN`,
  }

  const moods = {
    '&@#$': '🤬',
    'Sad': '🥹',
    'Existing': '😶',
    'Good': '🙂',
    'Elated': '😍',
  }

  useEffect(() => {

    if(!currentUser || !userDataObj) {
      return 
    }
    setData(userDataObj);
  }, [currentUser, userDataObj])

  if(loading) {
    return <Loading />
  }

  if (!currentUser) {
    return <Login />
  }

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
      <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4'>
        {Object.keys(statuses).map((status, index) => {
          return (

            <div key={index} className='flex flex-col gap-1 sm:gap-2'>
              <p className={'capitalize text-xs sm:text-sm ' + lgPoppins.className}>{status.replaceAll('_', ' ')}</p>
              <p className={'text-base sm:text-lg truncate px-[5px] ' + fugaz.className}>{statuses[status]}{status === 'num_days' ? ' 🔥' : ''}</p>
            </div>

          )})}
      </div>

      <h4 className={'text-4xl sm:text-5xl md:text-6xl text-center ' + fugaz.className}>
        How do you <span className='textGradient'>feel </span>today? 
      </h4>

      <div className='flex items-stretch flex-wrap gap-4'>
        {Object.keys(moods).map( (mood, moodIndex)=> {
          return(
            <button onClick={() => {
              const currentModdValue = moodIndex + 1;
              handleSetMood(currentModdValue);
            }} className='flex flex-col gap-2 p-4 px-5 rounded-2xl items-center duration-200 bg-indigo-50 purpleShadow text-center flex-1' key={moodIndex}>
              <p className={'text-4xl sm:5xl md:6xl '}>{moods[mood]}</p>
              <p className={'text-indigo-500 text-xs sm:text-sm md-text-base ' + lgPoppins.className}>{mood}</p>
            </button>
          )
        })}
      </div>

      <Calendar handleSetMood={handleSetMood} completeData={data}/>

    </div>
  )
}

export default Dashboard;
