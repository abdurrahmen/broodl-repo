import { Poppins } from "next/font/google";


const bPoppins = Poppins({subsets: ['latin'], weight: ['600']})

export default function Button(props) {


    const { logout, text, dark , full, clickHandler} = props;

  return (
    <button onClick={clickHandler} className={'rounded-xl overflow-hidden duration-200 hover:opacity-60 active:opacity-100 border-2 border-solid border-indigo-600 ' + (dark ? ' text-white bg-indigo-600 ' : ' text-indigo-600 ') + (full ? ' grid place-items-center w-full ' : ' ') + (logout ? 'bg-red-600 border-none rounded-[8px] text-xs' : '')}>
        <p className={'px-2 sm:px-4 whitespace-nowrap py-[10px] ' + bPoppins.className}>
            {text}
        </p>
    </button>
  )
}
