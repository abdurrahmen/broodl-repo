'use client'

import { baseRating, gradients, demoData } from "@/utils";
import { Luckiest_Guy, Poppins } from "next/font/google";
import React, {useState} from 'react'

const lgPoppins = Poppins({subsets: ['latin'], weight: ['600']});
const luckiest_Guy = Luckiest_Guy({subsets:['latin'], weight:['400']});

const months = {'January': 'Jan','February': 'Feb','March': 'Mar','April': 'Apr','May': 'May', 'June': 'Jun','July': 'Jul','August': 'Aug','September': 'Sept','October': 'Oct','November': 'Nov','December': 'Dec',
};
const monthsArr = Object.keys(months);
const now = new Date();

const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Calendar(props) {

  const now = new Date();
  const currMonth = now.getMonth();

  const [selectedMonth, setSelectedMonth] = useState(monthsArr[currMonth]);

  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  function handleChangeMonth(val) {
    // val = 1 or -1
    // if we hit the bounds of the months, then we can just adjust the year that displayed
    if(numericMonth + val < 0) {
      //set the month value = 11 and decrement the year
      setSelectedYear(curr => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1])
    }
    else if(numericMonth + val > 11) {
      // set the month value = 0 and increament the year
      setSelectedYear(curr => curr + 1);
      setSelectedMonth(monthsArr[0])
    }
    else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }
  

  const { demo, completeData , handleSetMood } = props;

  
  const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, monthsArr.indexOf(selectedMonth) + 1, 0).getDate();

  const dayToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = (Math.floor(dayToDisplay / 7)) + (dayToDisplay % 7 ? 1 : 0);  

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};  
  
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-3 gap-4'>
        <button className='mr-auto px-4 text-2xl text-indigo-600 duration-200 active:text-indigo-400 ' onClick={() => handleChangeMonth(-1)}><i className="fa-solid fa-circle-chevron-left"></i></button>
        <p className={'text-center capitalize text-xl ' + lgPoppins.className}>{selectedMonth},<span className='text-xs'>{selectedYear}</span></p>
        <button className='ml-auto px-4 text-2xl text-indigo-600 duration-200 active:text-indigo-400 ' onClick={() => handleChangeMonth(1)}><i className="fa-solid fa-circle-chevron-right"></i></button>
      </div>
      <div className='flex flex-col overflow-hidden'>
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return(
            <div key={rowIndex} className='grid grid-cols-7 gap-1'>
              {daysList.map((dayOfWeek, dayOfWeekIndex) => {

                  let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)

                  let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true

                  let isToday = dayIndex === now.getDate() && selectedMonth === monthsArr[now.getMonth()];


                if(!dayDisplay) {
                  return (
                    <div className='bg-white' key={dayOfWeekIndex} />
                  )
                };

                let color = demo ? 
                gradients.indigo[baseRating[dayIndex]] : 
                dayIndex in data ?
                gradients.indigo[data[dayIndex]] :
                'white';              

                return(
                  <div style={{background: color}} key={dayOfWeekIndex} className={'text-xs sm:text-sm border border-solid border-2 p-2 my-[2px] flex items-center gap-2 justify-between rounded-md ' + (isToday ? ' border-indigo-400 ' : ' border-indigo-100 ') + (color === 'white' ? ' text-indigo-400 ' : ' text-white border-none ') + lgPoppins.className }>
                    <p>{dayIndex}</p>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
