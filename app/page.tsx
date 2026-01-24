import { IconAccessPoint, IconAwardFilled, IconDna2, IconFlaskFilled, IconMath, IconMedal, IconRulerMeasure2, IconTelescope, IconTrophyFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div
        className="-top-75 -left-75 -z-10 fixed bg-[radial-gradient(circle,var(--tw-colors-secondary),transparent)] opacity-60 blur-[100px] rounded-full w-150 h-150 animate-float pointer-events-none">
      </div>
      <div
        className="-right-75 -bottom-75 -z-10 fixed bg-[radial-gradient(circle,var(--tw-colors-accent),transparent)] opacity-60 blur-[100px] rounded-full w-125 h-125 animate-float-reverse pointer-events-none">
      </div>

      <section id="home" className="min-h-dvh">
        <div className="max-w-[90vw] container">
          <h1 className="flex flex-col justify-center items-center gap-4 mb-4 font-black text-white text-center uppercase">
            <span className="lg:text-[5.25rem] text-3xl md:text-5xl">Rajuk College</span>
            <span className="text-6xl md:text-8xl">Science Club</span>
          </h1>
          <p className="opacity-0 mb-12 font-bold text-[#8899ac] text-[1.5rem] text-center tracking-[4px] animate-[slideUp_0.8s_ease_0.4s_forwards,shimmer_3s_infinite_alternate]">Grab Beyond The Infinity</p>

          <div className="flex flex-wrap justify-center gap-7.5 opacity-0 animate-[slideUp_0.8s_ease_0.8s_forwards]">
            <Button className="bg-primary hover:bg-transparent shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.6)] px-11.25 py-7 border-[3px] border-primary rounded-[50px] min-w-45 font-black text-[#050510]text-[1.1rem] hover:text-primary uppercase tracking-[1px] transition-all hover:-translate-y-1.25 duration-300 cursor-pointer" asChild><Link href="/registration">Join Now</Link></Button>
            <Button className="bg-transparent hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] px-11.25 py-7 border-[3px] border-white rounded-[50px] min-w-45 font-black text-[1.1rem] text-white hover:text-black uppercase tracking-[1px] transition-all hover:-translate-y-1.25 duration-300 cursor-pointer" asChild><Link href="/blogs">Read Blogs</Link></Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="mx-auto px-5 max-w-300 container">
          <div className="mb-15 text-center">
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase">
              Departments</h2>
            <p className="mt-2.5 text-[1.1rem] text-primary uppercase tracking-[2px]">Explore our fields of study</p>
          </div>

          <div className="w-full">
            <div className="gap-7.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <div
                className="group before:top-0 before:-left-full hover:before:left-full before:absolute relative flex flex-col justify-center items-center gap-4 bg-white/5 hover:bg-white/6 before:bg-linear-to-r before:from-transparent before:via-white/5 before:to-transparent hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:border-primary rounded-3xl before:w-full h-50 before:h-full overflow-hidden transition-all before:transition-all hover:-translate-y-2.5 duration-400 before:duration-500 cursor-pointer glass-panel">
                <IconMath className="size-12 text-white group-hover:scale-110 transition-transform duration-400" />
                <span className="font-bold text-[1.5rem] text-white">Maths</span>
              </div>

              <div
                className="group before:top-0 before:-left-full hover:before:left-full before:absolute relative flex flex-col justify-center items-center gap-4 bg-white/5 hover:bg-white/6 before:bg-linear-to-r before:from-transparent before:via-white/5 before:to-transparent hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:border-primary rounded-3xl before:w-full h-50 before:h-full overflow-hidden transition-all before:transition-all hover:-translate-y-2.5 duration-400 before:duration-500 cursor-pointer glass-panel">
                <IconRulerMeasure2 className="size-12 text-white group-hover:scale-110 transition-transform duration-400" />
                <span className="font-bold text-[1.5rem] text-white">Physics</span>
              </div>

              <div
                className="group before:top-0 before:-left-full hover:before:left-full before:absolute relative flex flex-col justify-center items-center gap-4 bg-white/5 hover:bg-white/6 before:bg-linear-to-r before:from-transparent before:via-white/5 before:to-transparent hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:border-primary rounded-3xl before:w-full h-50 before:h-full overflow-hidden transition-all before:transition-all hover:-translate-y-2.5 duration-400 before:duration-500 cursor-pointer glass-panel">
                <IconDna2 className="size-12 text-white group-hover:scale-110 transition-transform duration-400" />
                <span className="font-bold text-[1.5rem] text-white">Biology</span>
              </div>

              <div
                className="group before:top-0 before:-left-full hover:before:left-full before:absolute relative flex flex-col justify-center items-center gap-4 bg-white/5 hover:bg-white/6 before:bg-linear-to-r before:from-transparent before:via-white/5 before:to-transparent hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:border-primary rounded-3xl before:w-full h-50 before:h-full overflow-hidden transition-all before:transition-all hover:-translate-y-2.5 duration-400 before:duration-500 cursor-pointer glass-panel">
                <IconFlaskFilled className="size-12 text-white group-hover:scale-110 transition-transform duration-400" />
                <span className="font-bold text-[1.5rem] text-white">Chemistry</span>
              </div>

              <div
                className="group before:top-0 before:-left-full hover:before:left-full before:absolute relative flex flex-col justify-center items-center gap-4 bg-white/5 hover:bg-white/6 before:bg-linear-to-r before:from-transparent before:via-white/5 before:to-transparent hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:border-primary rounded-3xl before:w-full h-50 before:h-full overflow-hidden transition-all before:transition-all hover:-translate-y-2.5 duration-400 before:duration-500 cursor-pointer glass-panel">
                <IconTelescope className="size-12 text-white group-hover:scale-110 transition-transform duration-400" />
                <span className="font-bold text-[1.5rem] text-white">Astronomy</span>
              </div>

              <div
                className="group before:top-0 before:-left-full hover:before:left-full before:absolute relative flex flex-col justify-center items-center gap-4 bg-white/5 hover:bg-white/6 before:bg-linear-to-r before:from-transparent before:via-white/5 before:to-transparent hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:border-primary rounded-3xl before:w-full h-50 before:h-full overflow-hidden transition-all before:transition-all hover:-translate-y-2.5 duration-400 before:duration-500 cursor-pointer glass-panel">
                <IconAccessPoint className="size-12 text-white group-hover:scale-110 transition-transform duration-400" />
                <span className="font-bold text-[1.5rem] text-white">Technology</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="py-20">
        <div className="mx-auto px-5 max-w-300 container">
          <div className="mb-15 text-center">
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase">
              Our Achievements</h2>
          </div>
          <div
            className="flex flex-col items-center gap-10 bg-linear-to-br from-white/5 to-white/1 backdrop-blur-[20px] p-12.5 border border-white/10 rounded-4xl">


            <div className="flex-1 gap-7.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
              <div className="flex items-center gap-5">
                <div
                  className="flex justify-center items-center bg-primary/10 border border-primary/30 rounded-2xl w-15 h-15 text-[1.5rem] text-primary shrink-0">
                  <IconTrophyFilled className="size-8" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-[1.4rem]">10+ Nationalists</h3>
                  <p className="text-[0.9rem] text-slate-400">Physics Olympiad</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div
                  className="flex justify-center items-center bg-primary/10 border border-primary/30 rounded-2xl w-15 h-15 text-[1.5rem] text-primary shrink-0">
                  <IconMedal className="size-8" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-[1.4rem]">12+ Nationalists</h3>
                  <p className="text-[0.9rem] text-slate-400">Biology Olympiad</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div
                  className="flex justify-center items-center bg-primary/10 border border-primary/30 rounded-2xl w-15 h-15 text-[1.5rem] text-primary shrink-0">
                  <IconAwardFilled className="size-8" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-[1.4rem]">30+ Nationalists</h3>
                  <p className="text-[0.9rem] text-slate-400">Math Olympiad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="py-20">
        <div className="mx-auto px-5 max-w-300 container">
          <div className="mb-15 text-center">
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase">
              Our Activities</h2>
          </div>
          <div className="gap-7.5 grid grid-cols-1 md:grid-cols-3 mx-auto max-w-250">

            <div
              className="flex flex-col justify-center items-center bg-linear-to-b from-primary/5 to-transparent shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(0,210,255,0.1)] backdrop-blur-[15px] px-5 py-10 border-primary/20 hover:border-primary rounded-4xl rounded-7.5 text-center transition hover:-translate-y-1.5 duration-400 glass-panel">
              <div className="mb-2.5 font-extrabold text-[4rem] text-white">3</div>
              <div
                className="flex flex-col justify-center items-center font-bold text-primary text-xl text-center uppercase tracking-widest">
                <span>National</span>
                <span>Events</span>
              </div>
            </div>

            <div
              className="flex flex-col justify-center items-center bg-linear-to-b from-primary/5 to-transparent shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(0,210,255,0.1)] backdrop-blur-[15px] px-5 py-10 border-primary/20 hover:border-primary rounded-4xl rounded-7.5 text-center transition hover:-translate-y-1.5 duration-400 glass-panel">
              <div className="mb-2.5 font-extrabold text-[4rem] text-white">30+</div>
              <div
                className="flex flex-col justify-center items-center font-bold text-primary text-xl text-center uppercase tracking-widest">
                <span>Sessions</span>
              </div>
            </div>

            <div
              className="flex flex-col justify-center items-center bg-linear-to-b from-primary/5 to-transparent shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(0,210,255,0.1)] backdrop-blur-[15px] px-5 py-10 border-primary/20 hover:border-primary rounded-4xl rounded-7.5 text-center transition hover:-translate-y-1.5 duration-400 glass-panel">
              <div className="mb-2.5 font-extrabold text-[4rem] text-white">05</div>
              <div
                className="flex flex-col justify-center items-center font-bold text-primary text-xl text-center uppercase tracking-widest">
                <span>Intra</span>
                <span>Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="panel" className="py-20">
        <div className="mx-auto px-5 max-w-300 container">
          <div className="mb-15 text-center">
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase">
              Our
              Principal</h2>
          </div>

          <div
            className="group after:top-0 after:right-0 after:-z-10 after:absolute relative flex max-[900px]:flex-col items-center gap-15 bg-linear-to-br after:bg-linear-to-r from-white/5 after:from-transparent to-white/1 after:to-[#3a7bd5]/10 backdrop-blur-[20px] p-15 max-[900px]:p-10 border border-white/10 rounded-[40px] after:w-75 after:h-full overflow-hidden max-[900px]:text-center after:content-['']">

            <div
              className="relative p-2.5 border-4 border-white/10 rounded-full w-70 max-sm:w-50 h-70 max-sm:h-50 shrink-0">
              <Image loading="lazy" fill src="/Media/principal.jpeg" alt="Principal"
                className="grayscale-20 group-hover:grayscale-0 rounded-full w-full h-full object-cover transition duration-300" />
            </div>

            <div className="flex-1">
              <h3 className="mb-1 text-[2.2rem] text-white">Brig Gen Saiful Haque Ahmed</h3>
              <span className="inline-block mb-6 font-semibold text-[0.9rem] text-primary tracking-widest">ndc,
                psc</span>
              <i className="block fa-quote-left opacity-50 mb-5 text-[2rem] text-secondary fa-solid"></i>
              <p className="block text-[1.3rem] text-slate-400 italic leading-[1.8]">
                "Guiding the fleet towards the event horizon. Our mission is to inspire the next generation of
                scientists."
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
