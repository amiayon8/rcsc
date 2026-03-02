export default function PhysicsOlympiadGuidelines() {
    return (
        <section className="relative flex flex-col items-center px-5 pt-[150px] pb-[60px] min-h-screen">
            <div className="relative flex flex-col items-center mx-auto w-full max-w-[1200px]">

                <div className="opacity-0 mb-12 text-center animate-[slideUp_0.8s_ease_forwards_0.2s]">
                    <h1
                        className="drop-shadow-glow-title mb-4 font-black text-[clamp(2.2rem,5vw,4rem)] text-white uppercase leading-tight">
                        Physics Olympiad Guidelines
                    </h1>
                    <p className="font-bold text-[1rem] text-primary md:text-[1.2rem] italic tracking-[1px] md:tracking-[2px]">
                        “The whole of science is nothing more than a refinement of everyday thinking.” <br className="md:hidden" /> <span
                            className="text-[#8899ac]">- Albert Einstein</span>
                    </p>
                </div>

                <div className="mb-12 w-full reveal">
                    <div
                        className="bg-glass shadow-glow-card backdrop-blur-[15px] mb-8 px-6 md:px-8 py-5 md:py-6 border border-glass-border rounded-[20px]">
                        <div className="gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <h3 className="mb-3 font-black text-primary text-lg uppercase tracking-wider"><i
                                    className="mr-2 fas fa-pen-nib"></i> Written by</h3>
                                <ul className="space-y-1.5 text-text-muted text-sm md:text-base leading-relaxed list-disc list-inside">
                                    <li><span className="font-semibold text-white">Abdul Majid</span>, International Physics Olympiad TST-1
                                        Winner 2026 Camp, SSC25, RUMC</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 font-black text-primary text-lg uppercase tracking-wider"><i
                                    className="mr-2 fas fa-chalkboard-user"></i> Advised by</h3>
                                <ul className="space-y-1.5 text-text-muted text-sm md:text-base leading-relaxed list-disc list-inside">
                                    <li><span className="font-semibold text-white">Farhan Tanvir Prionto</span>, International Physics Olympiad
                                        TST-2 Winner 2024 Camp, HSC25, Ex-Rajukian, BUET</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-[rgba(15,25,50,0.6)] shadow-glow-card backdrop-blur-[15px] p-6 md:p-8 border border-primary/30 rounded-[20px] text-center">
                        <p className="text-text-muted text-base md:text-lg leading-relaxed">
                            This guideline is designed for students of different reading levels eager to participate in the Bangladesh
                            Physics Olympiad (BdPhO), from beginners to advanced. The books are roughly arranged from easier to more
                            challenging. You don’t have to read all of them, just pick any one you like and you can start reading. If a
                            book feels too difficult or the mathematics gets too heavy, don’t worry—it’s okay to move on to another one
                            that suits you better, or brush up on your calculus first. Above all, physics is about understanding how the
                            universe works, so keep reading, experimenting, and enjoying your journey.
                        </p>
                    </div>
                </div>

                <div className="mb-16 w-full reveal">
                    <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">General
                        Problem Solving Strategies</h2>

                    <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mb-8">
                        <div
                            className="bg-glass backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-[20px] transition duration-300">
                            <h3 className="mb-4 font-bold text-primary text-lg uppercase tracking-wider">Books</h3>
                            <ol className="space-y-3 text-text-muted text-sm md:text-base leading-relaxed list-decimal list-inside">
                                <li>Fundamentals of Physics - Halliday, Resnick, and Walker</li>
                                <li>Concepts of Physics (Vol 1 & 2) - H.C. Verma</li>
                                <li>Competitive Physics: Thermodynamics, Electromagnetism and Relativity - Wang and Ricardo</li>
                                <li>Physics for Scientists and Engineers - Serway & Jewett</li>
                                <li>Physics Olympiad - Basic to Advanced Exercise - The Committee of Japan Physics Olympiad</li>
                            </ol>
                        </div>

                        <div
                            className="bg-glass backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-[20px] transition duration-300">
                            <h3 className="mb-4 font-bold text-primary text-lg uppercase tracking-wider">YouTube Channels</h3>
                            <ol className="space-y-3 text-text-muted text-sm md:text-base list-decimal list-inside">
                                <li><a href="#" className="hover:text-white hover:underline transition">BdPhO Official Channel</a></li>
                                <li><a href="#" className="hover:text-white hover:underline transition">Walter Lewin's Lectures</a></li>
                                <li><a href="#" className="hover:text-white hover:underline transition">Physics Galaxy by Ashish Arora</a>
                                </li>
                                <li><a href="#" className="hover:text-white hover:underline transition">Professor Dave Explains</a></li>
                                <li><a href="#" className="hover:text-white hover:underline transition">Physics with Elliot</a></li>
                            </ol>
                        </div>
                    </div>

                    <div
                        className="bg-[rgba(15,25,50,0.5)] backdrop-blur-[15px] p-6 md:p-8 border border-primary/30 hover:border-primary rounded-[20px] transition duration-300">
                        <h3 className="mb-4 font-bold text-primary text-lg uppercase tracking-wider">Overall Guidelines</h3>
                        <ul className="space-y-3 text-text-muted text-sm md:text-base leading-relaxed list-disc list-inside">
                            <li>Make sure to have a thorough understanding of basic vector algebra and calculus. Mathematics is the
                                language of physics, and you cannot excel at the national level without it.</li>
                            <li>After you’ve grasped the concepts from your SSC and HSC textbooks (Selu Sir, Ishak Sir), start your
                                olympiad journey with H.C. Verma or Halliday-Resnick. These books build the physical intuition required to
                                excel at the regional and national levels.</li>
                            <li>The books contain incredible, brain-teasing problems. It’s highly recommended to work on them once your
                                basic theory is rock solid.</li>
                        </ul>
                    </div>
                </div>

                <div className="mb-16 w-full reveal">
                    <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">
                        Detailed Guidelines on Major Branches</h2>

                    <div className="gap-8 grid grid-cols-1 md:grid-cols-2">

                        <div
                            className="bg-[rgba(10,20,40,0.6)] hover:shadow-glow-card backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-[20px] transition duration-300">
                            <h3 className="flex items-center gap-2 mb-5 font-black text-white text-xl uppercase">
                                <i className="text-primary fas fa-cogs"></i> Mechanics
                            </h3>
                            <h4 className="mb-2 font-bold text-primary text-xs uppercase tracking-widest">Books</h4>
                            <ul className="space-y-2 mb-6 text-text-muted text-sm list-decimal list-inside">
                                <li>An Introduction to Mechanics - Kleppner & Kolenkow</li>
                                <li>The Physics of Waves - Howard Georgi</li>
                                <li>Classical Mechanics: A Critical Introduction - Michael Cohen</li>
                            </ul>
                            <h4 className="mb-2 font-bold text-primary text-xs uppercase tracking-widest">Guidelines</h4>
                            <ul className="space-y-2 ml-4 text-text-muted text-sm leading-relaxed list-disc list-outside">
                                <li>Mechanics is the foundation of all other branches of physics. Before moving to anything else, make
                                    sure your mechanics is incredibly strong.</li>
                                <li>Give immense importance to Free Body Diagrams (FBD), Newton's Laws, conservation of energy,
                                    conservation of linear and angular momentum, and rotational kinematics.</li>
                                <li>The language and math of Morin's book (the 3rd book) can be quite advanced, relying heavily on
                                    calculus and differential equations. If you find it hard, save it for the national or camp level.</li>
                            </ul>
                        </div>

                        <div
                            className="bg-[rgba(10,20,40,0.6)] hover:shadow-glow-card backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-[20px] transition duration-300">
                            <h3 className="flex items-center gap-2 mb-5 font-black text-white text-xl uppercase">
                                <i className="text-primary fas fa-bolt"></i> Electromagnetism
                            </h3>
                            <h4 className="mb-2 font-bold text-primary text-xs uppercase tracking-widest">Books</h4>
                            <ul className="space-y-2 mb-6 text-text-muted text-sm list-decimal list-inside">
                                <li>Basic Laws of Electromagnetism - I.E. Irodov</li>
                                <li>Electricity and Magnetism - Purcell & Morin</li>
                                <li>Problems and Solutions on Electromagnetism - Yung-Kuo Lim</li>
                            </ul>
                            <h4 className="mb-2 font-bold text-primary text-xs uppercase tracking-widest">Guidelines</h4>
                            <ul className="space-y-2 ml-4 text-text-muted text-sm leading-relaxed list-disc list-outside">
                                <li>Electromagnetism relies heavily on visualizing 3D fields and applying right-hand rules. Building a
                                    strong geometric intuition will naturally improve your skill here.</li>
                                <li>Kirchhoff's circuit laws, Gauss's law, and Ampere's law are the trickiest topics to master for
                                    beginners.</li>
                                <li>It’s okay to struggle with calculus at first, but the faster you train yourself in vector calculus,
                                    the better. For Griffiths and Purcell, a solid understanding of surface and volume integrals is required
                                    (strictly for advanced national and TST preparation).</li>
                            </ul>
                        </div>

                        <div
                            className="bg-[rgba(10,20,40,0.6)] hover:shadow-glow-card backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-[20px] transition duration-300">
                            <h3 className="flex items-center gap-2 mb-5 font-black text-white text-xl uppercase">
                                <i className="text-primary fas fa-temperature-full"></i> Thermodynamics
                            </h3>
                            <h4 className="mb-2 font-bold text-primary text-xs uppercase tracking-widest">Books</h4>
                            <ul className="space-y-2 mb-6 text-text-muted text-sm list-decimal list-inside">
                                <li>Concepts in Thermal Physics - Blundell</li>
                                <li>An Introduction to Thermal Physics - D.V. Schroeder</li>
                            </ul>
                            <h4 className="mb-2 font-bold text-primary text-xs uppercase tracking-widest">Guidelines</h4>
                            <ul className="space-y-2 ml-4 text-text-muted text-sm leading-relaxed list-disc list-outside">
                                <li>Master all the basic concepts: the laws of thermodynamics, ideal gas equations, and specific heat from
                                    your standard textbooks up to class 11-12.</li>
                                <li>New to Thermodynamics? Start with the relevant chapters in Halliday-Resnick before jumping into the
                                    specialized books listed above.</li>
                                <li>Key concepts to focus on: Carnot engines, entropy, P-V diagrams, and the Kinetic Theory of Gases.</li>
                                <li>Pay very close attention to sign conventions (work done by the gas vs. work done on the gas). Mixing
                                    these up is the most common mistake in olympiad problem solving.</li>
                            </ul>
                        </div>

                        <div
                            className="bg-[rgba(10,20,40,0.6)] hover:shadow-glow-card backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-[20px] transition duration-300">
                            <h3 className="flex items-center gap-2 mb-5 font-black text-white text-xl uppercase">
                                <i className="text-primary fas fa-water"></i> Oscillations & Optics
                            </h3>
                            <h4 className="mb-2 font-bold text-primary text-xs uppercase tracking-widest">Books</h4>
                            <ul className="space-y-2 mb-6 text-text-muted text-sm list-decimal list-inside">
                                <li>Optics - Ajoy Ghatak</li>
                                <li>The Physics of Vibrations and Waves - H.J. Pain</li>
                                <li>Optics - Eugene Hecht</li>
                                <li>Problems in Physics (Optics & Waves) - A.A. Pinsky</li>
                            </ul>
                            <h4 className="mb-2 font-bold text-primary text-xs uppercase tracking-widest">Guidelines</h4>
                            <ul className="space-y-2 ml-4 text-text-muted text-sm leading-relaxed list-disc list-outside">
                                <li>Simple Harmonic Motion (SHM) is a concept that appears in almost every branch of physics. Pay huge
                                    importance to the differential equation of a harmonic oscillator.</li>
                                <li>For optics, ray tracing and Fermat's Principle of Least Time are your best tools.</li>
                                <li>Solving a lot of problems regarding interference, diffraction, and lenses is important to become
                                    skillful in this subject. Keep track of your phase differences!</li>
                            </ul>
                        </div>

                        <div
                            className="md:col-span-2 bg-[rgba(10,20,40,0.6)] hover:shadow-glow-card backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-[20px] transition duration-300">
                            <h3 className="flex items-center gap-2 mb-4 font-black text-white text-xl uppercase">
                                <i className="text-primary fas fa-flask"></i> Experimental Physics
                            </h3>
                            <ul className="space-y-2 text-text-muted text-sm list-decimal list-inside">
                                <li>ফিজিক্স অলিম্পিয়াড এক্সপেরিমেন্টের জগতে প্রবেশ – শেখ শাফায়াত</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="mb-16 w-full reveal">
                    <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">For
                        Problem Solving</h2>

                    <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mb-12">
                        <div className="bg-glass backdrop-blur-[15px] p-6 md:p-8 border border-glass-border rounded-[20px]">
                            <h3 className="mb-4 font-bold text-primary text-lg uppercase tracking-wider">Past Papers</h3>
                            <ul className="space-y-3 text-text-muted text-base list-disc list-inside">
                                <li><span className="font-semibold text-white">BdPhO past problems</span> (Past Papers)</li>
                                <li><span className="font-semibold text-white">AAPT PhysicsBowl</span> past papers (For regional)</li>
                                <li><span className="font-semibold text-white">F=ma Exam</span> past papers (For national)</li>
                                <li><span className="font-semibold text-white">USAPhO, IPhO, APhO</span> problems (For advanced problem
                                    solving and camp)</li>
                            </ul>
                        </div>

                        <div className="bg-glass backdrop-blur-[15px] p-6 md:p-8 border border-glass-border rounded-[20px]">
                            <h3 className="mb-4 font-bold text-primary text-lg uppercase tracking-wider">Problem Solving Resources</h3>
                            <ul className="space-y-2 text-text-muted text-sm md:text-base list-decimal list-inside">
                                <li>F=ma Contest</li>
                                <li>OPHO</li>
                                <li>IPHO</li>
                                <li>APHO</li>
                                <li>EUPHO</li>
                                <li>NBPHO</li>
                                <li><a href="https://smartiansofscience.org/physics-olympiad-how-to/" target="_blank"
                                    className="hover:text-white underline transition">Smartians of Science Guide</a></li>
                                <li>Advice For Introductory Physics</li>
                                <li><a href="https://physolymp.com/c/advanced/recommended-resources-advanced/" target="_blank"
                                    className="hover:text-white underline transition">PhysOlymp Advanced Resources</a></li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="bg-[rgba(15,25,50,0.8)] shadow-glow-card backdrop-blur-[15px] mb-12 p-6 md:p-10 border border-primary/50 rounded-[20px] text-text-muted">
                        <h3 className="mb-6 pb-3 border-glass-border border-b font-bold text-white text-xl uppercase tracking-widest">The
                            Problem Solving Process</h3>
                        <ol className="space-y-3 ml-2 text-slate-300 text-sm md:text-base list-decimal list-inside">
                            <li><span className="font-bold text-primary">Define</span> and understand the problem</li>
                            <li><span className="font-bold text-primary">Visualize</span> the problem's picture</li>
                            <li><span className="font-bold text-primary">Draw</span> a diagram of the problem</li>
                            <li><span className="font-bold text-primary">Break</span> the problem into smaller pieces</li>
                            <li><span className="font-bold text-primary">Collect</span> and organize information about the problem</li>
                            <li><span className="font-bold text-primary">Critical thinking:</span> Observation, Analysis and Inference</li>
                            <li><span className="font-bold text-primary">Work</span> backward</li>
                        </ol>
                    </div>

                    <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">An
                        Example Problem</h2>

                    <div
                        className="bg-[rgba(15,25,50,0.8)] shadow-glow-card backdrop-blur-[15px] p-6 md:p-10 border border-primary/50 rounded-[20px] text-text-muted leading-relaxed">
                        <h3 className="mb-4 pb-3 border-glass-border border-b font-bold text-white text-xl uppercase tracking-widest">
                            Rolling Cylinder Dynamics</h3>

                        <blockquote className="mb-6 pl-4 border-primary border-l-4 text-slate-300 italic">
                            <strong>Problem:</strong> A solid right-circular cylinder is rolling without slipping down an inclined plane
                            that makes an angle &theta; with the horizontal. What is the value of its acceleration? <br />
                            <span className="opacity-70 text-xs">(BDPHO 2025 C Category)</span>
                        </blockquote>

                        <div className="mb-6">
                            <h4 className="mb-2 font-bold text-primary text-sm uppercase tracking-wider">Given Variables:</h4>
                            <ul
                                className="inline-block space-y-1 bg-bg-dark/50 p-4 border border-glass-border rounded-lg min-w-full md:min-w-[300px] font-mono text-sm md:text-base list-none">
                                <li>Mass of the cylinder = <span className="text-white">M</span></li>
                                <li>Radius of the cylinder = <span className="text-white">R</span></li>
                                <li>Linear acceleration parallel to the plane = <span className="text-white">a</span></li>
                                <li>Angular acceleration = <span className="text-white">&alpha;</span></li>
                                <li>Frictional force = <span className="text-white">f</span></li>
                                <li>Acceleration due to gravity = <span className="text-white">g</span></li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="mb-2 font-bold text-primary text-sm uppercase tracking-wider">Solution Steps:</h4>
                            <p className="mb-3 text-sm md:text-base">
                                The moment of inertia (I) of a solid cylinder about its central axis is: <br />
                                <span className="block my-2 ml-4 font-mono text-white text-lg">I = &frac12; MR&sup2;</span>
                            </p>
                            <p className="mb-3 text-sm md:text-base">
                                Since the cylinder rolls without slipping, the relationship between linear and angular acceleration is:
                                <br />
                                <span className="block my-2 ml-4 font-mono text-white text-lg">a = &alpha;R &nbsp; &rArr; &nbsp; &alpha; =
                                    a/R</span>
                            </p>
                            <p className="mb-3 text-sm md:text-base">
                                Applying Newton's second law for linear motion down the incline: <br />
                                <span className="block my-2 ml-4 font-mono text-white text-lg">Mg sin(&theta;) - f = Ma <span
                                    className="text-text-muted text-sm">--- (Equation 1)</span></span>
                            </p>
                            <p className="mb-3 text-sm md:text-base">
                                Applying the rotational equation of motion (&tau; = I&alpha;) about the center of mass: <br />
                                <span className="block my-2 ml-4 font-mono text-white text-lg">fR = [&frac12; MR&sup2;] * [a/R]</span>
                                <span className="block my-2 ml-4 font-mono font-bold text-primary text-lg">f = &frac12; Ma <span
                                    className="font-normal text-text-muted text-sm">--- (Equation 2)</span></span>
                            </p>
                            <p className="mb-3 text-sm md:text-base">
                                Now, substitute the value of f from Equation 2 into Equation 1: <br />
                                <span className="block my-1 ml-4 font-mono text-white text-lg">Mg sin(&theta;) - &frac12; Ma = Ma</span>
                                <span className="block my-1 ml-4 font-mono text-white text-lg">Mg sin(&theta;) = Ma + &frac12; Ma</span>
                                <span className="block my-1 ml-4 font-mono text-white text-lg">Mg sin(&theta;) = &frac32; Ma</span>
                            </p>
                            <p className="mb-3 text-sm md:text-base">
                                Dividing both sides by M, we get the linear acceleration (a): <br />
                                <span className="block my-1 ml-4 font-mono text-white text-lg">g sin(&theta;) = &frac32; a</span>
                            </p>
                        </div>

                        <div className="bg-[rgba(0,210,255,0.1)] p-4 border-primary border-l-4 rounded-r-lg">
                            <h4 className="mb-1 font-bold text-primary text-sm uppercase tracking-wider">Final Answer:</h4>
                            <p className="font-mono text-white text-xl">a = &frac23; g sin(&theta;)</p>
                        </div>
                    </div>
                </div>

                <div className="mb-8 w-full max-w-[1000px] text-center reveal">
                    <h2 className="drop-shadow-glow-title mb-6 font-black text-white text-3xl uppercase">Final Words</h2>
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-8 text-left">
                        <div
                            className="bg-glass shadow-glow-card p-6 border border-glass-border hover:border-primary rounded-2xl transition">
                            <h4 className="mb-2 font-bold text-primary uppercase"><i className="fa-pen-to-square mr-2 fas"></i> Prioritize
                                Problem-Solving</h4>
                            <p className="text-text-muted text-sm">Focus on solving problems rather than just reading theory. Working
                                directly with equations is the best way to develop your "physical intuition."</p>
                        </div>
                        <div
                            className="bg-glass shadow-glow-card p-6 border border-glass-border hover:border-primary rounded-2xl transition">
                            <h4 className="mb-2 font-bold text-primary uppercase"><i className="mr-2 fas fa-eye"></i> Visualize and Progress
                            </h4>
                            <p className="text-text-muted text-sm">Draw large, clear diagrams and gradually tackle harder problems, moving
                                from basic mechanics to advanced topics.</p>
                        </div>
                        <div
                            className="bg-glass shadow-glow-card p-6 border border-glass-border hover:border-primary rounded-2xl transition">
                            <h4 className="mb-2 font-bold text-primary uppercase"><i className="mr-2 fas fa-fire-flame-curved"></i> Stay
                                Persistent</h4>
                            <p className="text-text-muted text-sm">Never give up. It is normal for tough problems to take days to solve.
                                Patience and consistent practice will sharpen your analytical skills over time.</p>
                        </div>
                    </div>

                    <div
                        className="bg-gradient-to-r from-[rgba(0,210,255,0.05)] via-[rgba(0,85,255,0.1)] to-[rgba(0,210,255,0.05)] shadow-glow-card p-8 md:p-10 border-primary/40 border-y rounded-2xl">
                        <p className="font-black text-primary text-xl md:text-3xl uppercase tracking-widest">
                            Remember: Practice makes progress!
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}