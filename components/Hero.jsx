import { Luckiest_Guy, Poppins } from "next/font/google";
import Calendar from "./Calendar";
import CallToAction from "./CallToAction";

const luckiest_Guy = Luckiest_Guy({subsets: ['latin'], weight: ['400']});
const sPoppins = Poppins({subsets: ['latin'], weight: ['600', '700']})

function Hero() {
  

  return (
    <div className="py-4 md-py-10 flex flex-col gap-8 sm:gap-10">
      <h1 className={"text-4xl sm:text-5xl md:text-6xl text-center  " + luckiest_Guy.className}>
        <span className="textGradient">Broodl</span> helps you track your 
        <span className="textGradient"> daily</span> mood!
      </h1>
      <p className={"txt-less text-lg sm:text-xl md: text-2xl text-center w-full mx-auto max-w-[700px] " + sPoppins.className}>Create your mood record and see how you feel on
        <span className="font-bold"> every day and every year</span>
      </p>

      <CallToAction />

      <Calendar demo/>

    </div>
  );
}

export default Hero;
