import {
    MapPinned,
    Flag,
    Microscope,
    Globe,
    SquarePen,
    Sprout,
    TreePine,
    Link,
    Youtube,
    Book,
    ChevronRight
} from 'lucide-react';

export default function BiologyOlympiadGuidelines() {
    return (
        <section className="relative flex flex-col items-center px-5 pt-37.5 pb-15 min-h-screen">
            <div className="relative flex flex-col items-center mx-auto w-full max-w-300">

                <div className="opacity-0 mb-12 text-center animate-[slideUp_0.8s_ease_forwards_0.2s]">
                    <h1
                        className="drop-shadow-glow-title mb-4 font-black text-[clamp(2.2rem,5vw,4rem)] text-white uppercase leading-tight">
                        Biology Olympiad Guidelines
                    </h1>
                    <p className="font-bold text-[1rem] text-primary md:text-[1.2rem] italic tracking-[1px] md:tracking-[2px]">
                        “Biology is the study of complicated things that have the appearance of having been designed for a purpose.”
                        <br className="md:hidden" /> <span className="text-[#8899ac]">- Richard Dawkins</span>
                    </p>
                </div>

                <div className="mb-16 w-full reveal">
                    <div
                        className="bg-[rgba(15,25,50,0.6)] shadow-glow-card backdrop-blur-[15px] p-6 md:p-10 border border-primary/30 rounded-4xl">
                        <h2 className="drop-shadow-glow-title mb-6 font-black text-white text-2xl md:text-3xl text-center uppercase">The
                            Roadmap to IBO & Selection Funnel</h2>
                        <p className="mx-auto mb-8 max-w-200 text-text-muted text-base md:text-lg text-center">
                            The path to the International stage is a rigorous filter. The competition typically flows through these
                            stages:
                        </p>

                        <div className="relative gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

                            <div
                                className="bg-glass p-6 border border-glass-border hover:border-primary rounded-4xl text-center transition duration-300">
                                <div
                                    className="flex justify-center items-center bg-primary/20 shadow-glow-icon mx-auto mb-4 rounded-full w-16 h-16">
                                    <MapPinned className="text-primary text-2xl" />
                                </div>
                                <h4 className="mb-2 font-bold text-white uppercase tracking-wide">1. Regional (RBO)</h4>
                                <p className="text-text-muted text-xs">Held in 10-12 regions. Thousands participate; only the top few
                                    (Champions and Runners-up) move to Nationals.</p>
                            </div>

                            <div
                                className="bg-glass p-6 border border-glass-border hover:border-primary rounded-4xl text-center transition duration-300">
                                <div
                                    className="flex justify-center items-center bg-primary/20 shadow-glow-icon mx-auto mb-4 rounded-full w-16 h-16">
                                    <Flag className="text-primary text-2xl" />
                                </div>
                                <h4 className="mb-2 font-bold text-white uppercase tracking-wide">2. National (NBO)</h4>
                                <p className="text-text-muted text-xs">The "BioFest" in Dhaka. Includes the main exam, a colorful rally, and
                                    "BioTalk" sessions with top scientists.</p>
                            </div>

                            <div
                                className="bg-glass p-6 border border-glass-border hover:border-primary rounded-4xl text-center transition duration-300">
                                <div
                                    className="flex justify-center items-center bg-primary/20 shadow-glow-icon mx-auto mb-4 rounded-full w-16 h-16">
                                    <Microscope className="text-primary text-2xl" />
                                </div>
                                <h4 className="mb-2 font-bold text-white uppercase tracking-wide">3. Bio-Camp</h4>
                                <p className="text-text-muted text-xs">Top 20–30 scorers are invited to a residential camp for hands-on
                                    training (biostatistics, lab techniques, etc.).</p>
                            </div>

                            <div
                                className="bg-[rgba(0,210,255,0.1)] hover:shadow-glow-card p-6 border border-primary rounded-4xl text-center transition hover:-translate-y-2 duration-300 transform">
                                <div
                                    className="flex justify-center items-center bg-primary shadow-[0_0_20px_#00d2ff] mx-auto mb-4 rounded-full w-16 h-16">
                                    <Globe className="text-[#050510] text-3xl" />
                                </div>
                                <h4 className="mb-2 font-black text-primary uppercase tracking-wide">4. IBO Team</h4>
                                <p className="text-text-muted text-xs">Through multiple exams at the camp, the final "Bangladesh Team" of 4
                                    students is selected globally.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-16 w-full reveal">
                    <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">Core
                        Syllabus & Topics</h2>
                    <p className="mx-auto mb-10 max-w-200 text-text-muted text-center">
                        The Olympiad doesn't just ask you to memorize facts; it asks you to apply them. You should focus on these
                        major areas:
                    </p>

                    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        <div
                            className="flex items-center gap-4 bg-glass p-5 border border-glass-border hover:border-primary rounded-xl transition">
                            <div className="w-16 font-black text-primary text-3xl text-center">20%</div>
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase">Cell Biology</h4>
                                <p className="mt-1 text-text-muted text-xs">Structure and function of cells, organelles, and membrane
                                    transport.</p>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-4 bg-glass p-5 border border-glass-border hover:border-primary rounded-xl transition">
                            <div className="w-16 font-black text-primary text-3xl text-center">25%</div>
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase">Animal Anatomy</h4>
                                <p className="mt-1 text-text-muted text-xs">Focus on homeostasis, breathing, circulation, and nervous system.
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-4 bg-glass p-5 border border-glass-border hover:border-primary rounded-xl transition">
                            <div className="w-16 font-black text-primary text-3xl text-center">20%</div>
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase">Genetics & Evol.</h4>
                                <p className="mt-1 text-text-muted text-xs">Mendelian genetics, molecular biology, and natural selection.</p>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-4 bg-glass p-5 border border-glass-border hover:border-primary rounded-xl transition">
                            <div className="w-16 font-black text-primary text-3xl text-center">15%</div>
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase">Plant Anatomy</h4>
                                <p className="mt-1 text-text-muted text-xs">Photosynthesis, transport, and reproduction.</p>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-4 bg-glass p-5 border border-glass-border hover:border-primary rounded-xl transition">
                            <div className="w-16 font-black text-primary text-3xl text-center">10%</div>
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase">Ecology</h4>
                                <p className="mt-1 text-text-muted text-xs">Ecosystems, energy flow, and environmental issues.</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-6">
                            <div
                                className="flex items-center gap-4 bg-glass p-4 border border-glass-border hover:border-primary rounded-xl transition">
                                <div className="w-12 font-black text-primary text-2xl text-center">5%</div>
                                <div>
                                    <h4 className="font-bold text-white text-sm uppercase">Ethology</h4>
                                    <p className="text-text-muted text-xs">Animal behavior.</p>
                                </div>
                            </div>
                            <div
                                className="flex items-center gap-4 bg-glass p-4 border border-glass-border hover:border-primary rounded-xl transition">
                                <div className="w-12 font-black text-primary text-2xl text-center">5%</div>
                                <div>
                                    <h4 className="font-bold text-white text-sm uppercase">Biosystematics</h4>
                                    <p className="text-text-muted text-xs">Classification and phylogeny.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-16 w-full reveal">
                    <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">The
                        "True/False" Logic (Question Format)</h2>

                    <div
                        className="bg-[rgba(15,25,50,0.8)] shadow-glow-card backdrop-blur-[15px] p-6 md:p-10 border border-primary/50 rounded-4xl">
                        <p className="mb-6 text-text-muted text-sm md:text-base">
                            The BDBO follows the International Biology Olympiad (IBO) style for its National and often Regional rounds.
                            You won't just pick "A, B, C, or D."
                        </p>
                        <div className="mb-6 pl-4 border-primary border-l-4">
                            <h4 className="mb-2 font-bold text-white uppercase tracking-wider">Multiple Response Items</h4>
                            <p className="text-text-muted text-sm">Each question consists of a Stem (a description, graph, or diagram)
                                followed by four statements.</p>
                        </div>

                        <h4 className="mb-4 pb-2 border-glass-border border-b font-bold text-primary uppercase tracking-wider">Scoring
                            Mechanics</h4>
                        <div className="gap-4 grid grid-cols-2 md:grid-cols-4 mb-6 text-center">
                            <div className="bg-glass p-4 border border-glass-border rounded-xl">
                                <div className="mb-1 font-black text-green-400 text-2xl">4/4</div>
                                <p className="font-semibold text-white text-sm">Correct</p>
                                <p className="mt-1 text-text-muted text-xs">Full points (1 or 2)</p>
                            </div>
                            <div className="bg-glass p-4 border border-glass-border rounded-xl">
                                <div className="mb-1 font-black text-yellow-400 text-2xl">3/4</div>
                                <p className="font-semibold text-white text-sm">Correct</p>
                                <p className="mt-1 text-text-muted text-xs">Partial points (e.g., 0.5)</p>
                            </div>
                            <div className="bg-glass p-4 border border-glass-border rounded-xl">
                                <div className="mb-1 font-black text-orange-400 text-2xl">2/4</div>
                                <p className="font-semibold text-white text-sm">Correct</p>
                                <p className="mt-1 text-text-muted text-xs">Minimal/No points</p>
                            </div>
                            <div className="bg-glass p-4 border border-glass-border rounded-xl">
                                <div className="mb-1 font-black text-red-500 text-2xl">0-1/4</div>
                                <p className="font-semibold text-white text-sm">Correct</p>
                                <p className="mt-1 text-text-muted text-xs">0 points</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-primary/10 p-4 rounded-lg">
                            <SquarePen className="mt-1 text-primary text-2xl" />
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase tracking-wide">OMR Sheet Details</h4>
                                <p className="mt-1 text-text-muted text-sm">You will have two circles for every statement: one for True (T)
                                    and one for False (F). You must fill one for every single statement.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-16 w-full reveal">
                    <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">

                        <div className="bg-glass backdrop-blur-[15px] p-6 md:p-8 border border-glass-border rounded-4xl">
                            <h2 className="mb-6 pb-3 border-glass-border border-b font-black text-white text-2xl uppercase">Study Strategy
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="mb-2 font-bold text-primary text-sm uppercase tracking-widest">Step 1: Master the Basics</h4>
                                    <p className="text-text-muted text-sm">Start with your school textbooks (NCTB or Edexcel/Cambridge). Ensure
                                        you understand every diagram and cycle. For the Higher Secondary level, <em>Campbell Biology</em> is
                                        considered the "Bible" of Biology Olympiads.</p>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-bold text-primary text-sm uppercase tracking-widest">Step 2: Visualize Concepts
                                    </h4>
                                    <p className="text-text-muted text-sm">Biology is visual. If you can’t see how a protein is synthesized or
                                        how an action potential travels, you won’t remember it. Use high-quality animations to bridge the gap
                                        between text and reality.</p>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-bold text-primary text-sm uppercase tracking-widest">Step 3: Practice Pattern
                                        Recognition</h4>
                                    <p className="text-text-muted text-sm">Olympiad questions are often logic puzzles disguised as biology. Use
                                        past papers and question banks to understand how "data-based" questions work. You will often be given
                                        a graph or a table and asked to draw a conclusion.</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-[rgba(10,20,40,0.6)] shadow-glow-card backdrop-blur-[15px] p-6 md:p-8 border border-primary/30 rounded-4xl">
                            <h2 className="mb-6 pb-3 border-glass-border border-b font-black text-white text-2xl uppercase">Advanced Prep
                                Guide</h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="flex items-center gap-2 mb-3 font-bold text-white text-base uppercase">
                                        <Sprout className="text-primary" /> Junior & Secondary (Class 6–10)
                                    </h4>
                                    <ul className="space-y-2 text-text-muted text-sm list-disc list-inside">
                                        <li><span className="font-semibold text-primary">NCTB Mastery:</span> You must know the 2018+ version of
                                            the Class 9-10 Biology book inside out. Focus on "Chapter 4: Bioenergetics" and "Chapter 12:
                                            Heredity."</li>
                                        <li><span className="font-semibold text-primary">Logic over Memory:</span> Don't just memorize the names
                                            of enzymes; understand what happens if one enzyme is missing in a pathway.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="flex items-center gap-2 mb-3 font-bold text-white text-base uppercase">
                                        <TreePine className="text-primary" /> Higher Secondary (Class 11–12)
                                    </h4>
                                    <ul className="space-y-2 text-text-muted text-sm list-disc list-inside">
                                        <li><span className="font-semibold text-primary">Campbell Biology:</span> This is the standard. Read the
                                            chapters on Cell Signaling (Ch 11), Genetics (Ch 13-21), and Animal Physiology.</li>
                                        <li><span className="font-semibold text-primary">Biostatistics:</span> Start learning the basics of the
                                            Chi-square tests, and standard deviation. BDBO often includes data analysis questions that require
                                            these.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mb-8 w-full reveal">
                    <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">
                        Resource Library</h2>

                    <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-8">

                        <div
                            className="bg-glass backdrop-blur-[15px] p-6 border border-glass-border hover:border-primary rounded-4xl transition">
                            <h3 className="flex items-center gap-2 mb-4 font-bold text-primary uppercase tracking-wider">
                                <Link /> Official Links</h3>
                            <a href="https://facebook.com/bdbo.org" target="_blank"
                                className="block bg-bg-dark mb-3 p-3 border border-glass-border hover:border-primary rounded-lg transition">
                                <h4 className="font-bold text-white text-sm">BDBO Facebook Page</h4>
                                <p className="mt-1 text-text-muted text-xs">Follow for registration dates and official news.</p>
                            </a>
                        </div>

                        <div
                            className="bg-glass backdrop-blur-[15px] p-6 border border-glass-border hover:border-primary rounded-4xl transition">
                            <h3 className="flex items-center gap-2 mb-4 font-bold text-primary uppercase tracking-wider">
                                <Youtube /> Visual Learning</h3>
                            <div className="space-y-3">
                                <a href="https://youtube.com/@ProfessorDaveExplains?si=0NDGBgdFghL2jPho" target="_blank"
                                    className="block bg-bg-dark p-3 border border-glass-border hover:border-primary rounded-lg transition">
                                    <h4 className="font-bold text-white text-sm">Professor Dave Explains</h4>
                                    <p className="mt-1 text-text-muted text-xs">Great for complex biochemical pathways.</p>
                                </a>
                                <a href="https://youtube.com/@Bozemanscience1?si=3d-gZNtdvDdFYxc7" target="_blank"
                                    className="block bg-bg-dark p-3 border border-glass-border hover:border-primary rounded-lg transition">
                                    <h4 className="font-bold text-white text-sm">Bozeman Science</h4>
                                    <p className="mt-1 text-text-muted text-xs">Excellent for AP-level biology & big-picture concepts.</p>
                                </a>
                                <a href="https://youtube.com/@AmoebaSisters?si=7XN8k3WHRerv7P9o" target="_blank"
                                    className="block bg-bg-dark p-3 border border-glass-border hover:border-primary rounded-lg transition">
                                    <h4 className="font-bold text-white text-sm">Amoeba Sisters</h4>
                                    <p className="mt-1 text-text-muted text-xs">Clear, illustrated introductions to core topics.</p>
                                </a>
                            </div>
                        </div>

                        <div
                            className="bg-glass backdrop-blur-[15px] p-6 border border-glass-border hover:border-primary rounded-4xl transition">
                            <h3 className="flex items-center gap-2 mb-4 font-bold text-primary uppercase tracking-wider">
                                <Book /> Books & Q-Banks</h3>
                            <p className="mb-3 text-text-muted text-xs">Available on Rokomari to sharpen your skills:</p>
                            <div className="space-y-2 text-sm">
                                <a href="https://www.rokomari.com/book/370443/biology-olympiad-question-bank-1" target="_blank"
                                    className="block text-text-muted hover:text-white hover:underline">
                                    <ChevronRight className="mr-1 text-primary" /> Question Bank 1</a>
                                <a href="https://www.rokomari.com/book/224770/biology-olympiad-question-bank-2" target="_blank"
                                    className="block text-text-muted hover:text-white hover:underline">
                                    <ChevronRight className="mr-1 text-primary" /> Question Bank 2</a>
                                <a href="https://www.rokomari.com/book/381364/biology-olympiad-proshnobank-2-secondary" target="_blank"
                                    className="block text-text-muted hover:text-white hover:underline">
                                    <ChevronRight className="mr-1 text-primary" /> Proshnobank 2 (Secondary)</a>
                                <a href="https://www.rokomari.com/book/224777/biology-olympiad-question-bank-3" target="_blank"
                                    className="block text-text-muted hover:text-white hover:underline">
                                    <ChevronRight className="mr-1 text-primary" /> Question Bank 3 (Option A)</a>
                                <a href="https://www.rokomari.com/book/370533/biology-olympiad-question-bank-3" target="_blank"
                                    className="block text-text-muted hover:text-white hover:underline">
                                    <ChevronRight className="mr-1 text-primary" /> Question Bank 3 (Option B)</a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}