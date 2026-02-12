export default function Page() {

    return (
        /* Container */
        <div className="relative mx-auto px-5 pt-24 max-w-300">


            <div className="mb-16 text-center animate-[slideUp_0.8s_ease_forwards] reveal">
                <h1 className="drop-shadow-[0_0_15px_rgba(0,210,255,0.6)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white uppercase tracking-tighter">
                    <span className="text-primary">About</span> Us
                </h1>
            </div>

            {/* Content Box: What is RCSC? */}
            <div className="bg-[rgba(10,20,40,0.7)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-[15px] mb-10 p-6.25 md:p-10 border border-[rgba(0,210,255,0.2)] rounded-4xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] reveal">
                <h2 className="mb-5 font-black text-[#00d2ff] text-2xl uppercase tracking-wider">
                    What is RCSC?
                </h2>
                <div className="space-y-5 text-[#ccc] text-[1rem] md:text-[1.1rem] leading-[1.8]">
                    <p>
                        Rajuk College Science Club (RCSC) is one of the largest and most active student organizations at <span className="font-bold text-white">Rajuk Uttara Model College</span>, dedicated to exploring science beyond the boundaries of textbooks.
                    </p>
                    <p>
                        Guided by the slogan <span className="font-extrabold text-[#00d2ff] uppercase">"Grab Beyond the Infinity,"</span> RCSC encourages students to push their limits, ask bold questions, and dive deeper into the world of science and innovation. The club serves as a platform for curious minds to learn, experiment, and grow through collaborative learning and hands-on experiences.
                    </p>
                    <p>
                        With departments spanning <span className="font-bold text-white">Physics, Chemistry, Biology, Mathematics and Technology</span>, RCSC brings together students who are passionate about science, problem-solving, and discovery.
                    </p>
                </div>
            </div>

            {/* Content Box: Why Join RCSC? */}
            <div className="bg-[rgba(10,20,40,0.7)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-[15px] mb-10 p-6.25 md:p-10 border border-[rgba(0,210,255,0.2)] rounded-4xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] reveal">
                <h2 className="mb-5 font-black text-[#00d2ff] text-2xl uppercase tracking-wider">
                    Why Join RCSC?
                </h2>
                <p className="mb-5 text-[#ccc] text-[1rem] md:text-[1.1rem] leading-[1.8]">
                    Joining RCSC means becoming part of a community that believes learning doesn't stop in the classroom. Through its regular activities and events, RCSC helps students build confidence, academic excellence, and a strong foundation in scientific fields.
                </p>

                {/* Features Grid */}
                <div className="gap-7.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
                    <FeatureCard
                        title="Olympiad Training"
                        desc="Participate in Olympiad training sessions and competitive exam preparation to sharpen your analytical skills."
                    />
                    <FeatureCard
                        title="Interactive Workshops"
                        desc="Attend workshops, seminars, and interactive learning sessions led by experts and seniors."
                    />
                    <FeatureCard
                        title="Competitions"
                        desc="Take part in national and intra-college competitions to showcase your talent on a bigger stage."
                    />
                    <FeatureCard
                        title="Skill Development"
                        desc="Develop critical thinking, leadership, and teamwork skills essential for future innovators."
                    />
                    <FeatureCard
                        title="Mentorship"
                        desc="Learn from experienced seniors, mentors, and trainers who will guide you through your journey."
                    />
                </div>
            </div>

            {/* Footer Quote Section */}
            <div className="mb-20 text-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] reveal">
                <p className="font-light text-[1.5rem] text-white italic">
                    "At RCSC, students don't just learn science, they experience it."
                </p>
                <p className="mt-3.75 font-extrabold text-[#00d2ff] uppercase tracking-[2px]">
                    Join RCSC where curiosity meets opportunity.
                </p>
            </div>
        </div>
    );
}

/* Helper Component for the Feature Cards */
function FeatureCard({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="group bg-[rgba(20,30,50,0.5)] hover:bg-[rgba(20,30,50,0.8)] p-7.5 border border-white/10 hover:border-[#00d2ff] rounded-3xl transition-all hover:-translate-y-1.25 duration-300">
            <h3 className="mb-2.5 font-extrabold text-white text-lg">
                {title}
            </h3>
            <p className="m-0 text-[#aaa] text-[0.95rem] leading-normal">
                {desc}
            </p>
        </div>
    );
}