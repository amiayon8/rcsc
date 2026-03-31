export default function Page() {
    return (
        <div>
            <section className="relative flex flex-col items-center px-5 pt-37.5 pb-15 min-h-screen font-bangla">
                <div className="relative flex flex-col items-center mx-auto w-full max-w-300">

                    <div className="opacity-0 mb-12 text-center animate-[slideUp_0.8s_ease_forwards_0.2s]">
                        <h1
                            className="drop-shadow-glow-title mb-4 font-black text-[clamp(2.2rem,5vw,4rem)] text-white uppercase leading-tight">
                            BDJSO Guidelines
                        </h1>
                        <p className="font-bold text-[1rem] text-primary md:text-[1.2rem] uppercase tracking-[1px] md:tracking-[2px]">
                            কী পড়বে, কীভাবে পড়বে
                        </p>
                    </div>

                    <div className="mb-12 w-full reveal">
                        <div
                            className="bg-glass shadow-glow-card backdrop-blur-[15px] mb-8 px-6 md:px-8 py-5 md:py-6 border border-glass-border rounded-4xl">
                            <div className="flex flex-col items-center text-center">
                                <h3 className="mb-3 font-black text-primary text-lg uppercase tracking-wider"><i
                                    className="mr-2 fas fa-pen-nib"></i> Written by</h3>
                                <ul className="space-y-1.5 text-text-muted text-sm md:text-base leading-relaxed list-none">
                                    <li><span className="font-semibold text-white">Abdul Majid</span></li>
                                    <li>BDJSO National Camper, International Physics Olympiad TST-1 Winner, HSC27, RUMC</li>
                                </ul>
                            </div>
                        </div>

                        <div
                            className="bg-[rgba(15,25,50,0.6)] shadow-glow-card backdrop-blur-[15px] p-6 md:p-8 border border-primary/30 rounded-4xl text-center">
                            <p className="text-text-muted text-base md:text-lg leading-relaxed">
                                তোমাদের অনেকের মনেই প্রশ্ন আছে—বিডিজেএসও-র জন্য কী কী পড়বে, কীভাবে প্রস্তুতি নিবে। এই লেখা থেকে তুমি
                                মোটামুটি একটি ধারণা পেতে পারো। বিডিজেএসও-তে যেহেতু মুখস্থ করে কোনো লাভ হবে না, কাজেই যখন পড়বে তখন বুঝে পড়ার
                                চেষ্টা করবে। বিডিজেএসও-র জন্য নিজেকে প্রস্তুত করতে চাইলে তুমি নিচের ধাপগুলো অনুসরণ করতে পারো।
                            </p>
                        </div>
                    </div>

                    <div className="mb-16 w-full reveal">
                        <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">
                            প্রস্তুতির ধাপসমূহ</h2>

                        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mb-8">
                            <div
                                className="bg-glass backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-4xl transition duration-300">
                                <h3 className="mb-4 font-bold text-primary text-lg uppercase tracking-wider">১ম ধাপ (ছোটোদের জন্য)</h3>
                                <p className="mb-4 text-text-muted text-sm md:text-base leading-relaxed">
                                    প্রথমে নিজেদের ক্লাসের বিজ্ঞান বই শেষ করতে হবে। বোঝার ক্ষেত্রে সমস্যা হলে আশেপাশের বড়দের কাছে কিংবা তোমার
                                    শিক্ষকদের থেকে সাহায্য নিতে পারো। ইন্টারনেটে ঘেঁটেও বোঝার চেষ্টা করতে পারো।
                                </p>
                                <div className="bg-bg-dark/50 p-4 border border-glass-border rounded-lg">
                                    <h4 className="mb-2 font-semibold text-white text-sm"><i className="mr-2 text-primary fas fa-book-open"></i>
                                        প্রস্তাবিত বই:</h4>
                                    <p className="text-text-muted text-sm italic">"দেখা আলো না দেখা রূপ" - মুহম্মদ জাফর ইকবাল</p>
                                    <p className="mt-1 text-text-muted text-xs">(এই বই প্রবলেম সলভিং-এর জন্য নয়, কিন্তু আলো নিয়ে বিস্তারিত জানতে
                                        সাহায্য করবে)</p>
                                </div>
                            </div>

                            <div
                                className="bg-glass backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-4xl transition duration-300">
                                <h3 className="mb-4 font-bold text-primary text-lg uppercase tracking-wider">২য় ধাপ (৯ম-১০ম শ্রেণির জন্য)</h3>
                                <p className="mb-4 text-text-muted text-sm md:text-base leading-relaxed">
                                    যাদের নিজেদের ক্লাসের বিজ্ঞান বই ভালোভাবে শেষ হয়ে গিয়েছে, তারা একটু ওপরের ক্লাসের বই পড়া শুরু করতে পারো।
                                    নবম-দশম শ্রেণির পদার্থবিজ্ঞান, রসায়ন আর জীববিজ্ঞান বইটা বেশ ভালো।
                                </p>
                                <div className="bg-bg-dark/50 p-4 border border-glass-border rounded-lg">
                                    <h4 className="mb-2 font-semibold text-white text-sm"><i className="mr-2 text-primary fas fa-book-open"></i>
                                        প্রস্তাবিত বই:</h4>
                                    <p className="text-text-muted text-sm italic">"একটু খানি বিজ্ঞান" - মুহম্মদ জাফর ইকবাল</p>
                                    <p className="mt-1 text-text-muted text-xs">(প্রবলেম সলভিং-এর জন্য নয়, বেসিক ক্লিয়ার করার জন্য)</p>
                                </div>
                            </div>

                            <div
                                className="bg-glass backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-4xl transition duration-300">
                                <h3 className="mb-4 font-bold text-primary text-lg uppercase tracking-wider">৩য় ধাপ (একাদশ-দ্বাদশ শ্রেণির জন্য)
                                </h3>
                                <p className="mb-4 text-text-muted text-sm md:text-base leading-relaxed">
                                    যাদের নবম-দশম শ্রেণির বিজ্ঞান ভালোভাবে শেষ, তারা একাদশ-দ্বাদশ শ্রেণির বই পড়া শুরু করতে পারো।
                                </p>
                                <ul className="space-y-2 text-text-muted text-sm list-disc list-inside">
                                    <li><span className="font-semibold text-white">পদার্থবিজ্ঞান:</span> আমির হোসেন স্যার ও ইসহাক স্যারের বই।</li>
                                    <li><span className="font-semibold text-white">রসায়ন:</span> হাজারী ও নাগ স্যারের বই।</li>
                                    <li><span className="font-semibold text-white">জীববিজ্ঞান:</span> হাসান স্যারের বই (১ম পত্র) ও আজমল স্যারের বই
                                        (২য় পত্র)।</li>
                                </ul>
                            </div>

                            <div
                                className="bg-glass backdrop-blur-[15px] p-6 md:p-8 border border-glass-border hover:border-primary rounded-4xl transition duration-300">
                                <h3 className="mb-4 font-bold text-primary text-lg uppercase tracking-wider">৪র্থ ধাপ (ক্যাম্প ও আন্তর্জাতিক
                                    পর্যায়)</h3>
                                <p className="mb-4 text-text-muted text-sm md:text-base leading-relaxed">
                                    এই ধাপে আন্তর্জাতিক বই পড়া শুরু করতে হবে। (বইয়ের তালিকা নিচে দেওয়া হলো)।
                                </p>
                                <div className="bg-bg-dark/50 p-4 border border-glass-border rounded-lg">
                                    <p className="text-white text-sm"><i className="mr-2 text-primary fas fa-exclamation-triangle"></i> মনে রাখবে:</p>
                                    <p className="mt-1 text-text-muted text-sm">ক্যাম্পের জন্য পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ৩টা বিষয়ই ভালো
                                        পারা আবশ্যক।</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-16 w-full reveal">
                        <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">ক্যাম্প
                            ও আন্তর্জাতিক পর্যায়ের বই</h2>

                        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">

                            <div
                                className="bg-[rgba(10,20,40,0.6)] backdrop-blur-[15px] p-6 border border-glass-border hover:border-primary rounded-4xl transition duration-300">
                                <h3 className="flex items-center gap-2 mb-4 font-black text-white text-xl uppercase">
                                    <i className="text-primary fas fa-atom"></i> Physics
                                </h3>
                                <ul className="space-y-3 text-text-muted text-sm list-decimal list-inside">
                                    <li>Conceptual Physics (Paul G. Hewitt)</li>
                                    <li>College Physics (Resnick, Halliday, Krane)</li>
                                    <li>Sears and Zemansky's University Physics</li>
                                </ul>
                            </div>

                            <div
                                className="bg-[rgba(10,20,40,0.6)] backdrop-blur-[15px] p-6 border border-glass-border hover:border-primary rounded-4xl transition duration-300">
                                <h3 className="flex items-center gap-2 mb-4 font-black text-white text-xl uppercase">
                                    <i className="text-primary fas fa-flask"></i> Chemistry
                                </h3>
                                <ul className="space-y-3 text-text-muted text-sm list-decimal list-inside">
                                    <li>General Chemistry (Raymond Chang)</li>
                                    <li>Chemistry (Zumdahl)</li>
                                    <li>Chemistry: The Central Science (Zumdahl)</li>
                                </ul>
                            </div>

                            <div
                                className="bg-[rgba(10,20,40,0.6)] backdrop-blur-[15px] p-6 border border-glass-border hover:border-primary rounded-4xl transition duration-300">
                                <h3 className="flex items-center gap-2 mb-4 font-black text-white text-xl uppercase">
                                    <i className="text-primary fas fa-dna"></i> Biology
                                </h3>
                                <ul className="space-y-3 text-text-muted text-sm list-decimal list-inside">
                                    <li>Campbell Biology (Reece, Urry)</li>
                                    <li>Biology (Raven, Johnson)</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div className="mb-16 w-full reveal">
                        <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">প্রশ্ন
                            সমাধান (Problem Solving)</h2>

                        <div
                            className="bg-[rgba(15,25,50,0.8)] shadow-glow-card backdrop-blur-[15px] mb-12 p-6 md:p-10 border border-primary/50 rounded-4xl text-text-muted">
                            <ul className="space-y-4 mb-6 text-base md:text-lg list-disc list-inside">
                                <li>বিডিজেএসও-র ওয়েবসাইটে দেওয়া <a href="https://bdjso.org/past-papers" target="_blank"
                                    className="text-primary hover:text-white decoration-primary/50 underline underline-offset-4 transition">আগের
                                    বছরের প্রশ্নগুলো</a> সমাধান করবে।</li>
                                <li>সবচেয়ে গুরুত্বপূর্ণ হলো <span className="font-semibold text-white">আন্তর্জাতিক জুনিয়র সায়েন্স অলিম্পিয়াডের
                                    পুরোনো প্রশ্ন</span> সমাধান করা।</li>
                            </ul>
                        </div>

                        <h2 className="drop-shadow-glow-title mb-8 font-black text-white text-2xl md:text-3xl text-center uppercase">An
                            Example Problem (BDJSO 2023 National)</h2>

                        <div
                            className="bg-[rgba(15,25,50,0.8)] shadow-glow-card backdrop-blur-[15px] p-6 md:p-10 border border-primary/50 rounded-4xl text-text-muted leading-relaxed">

                            <blockquote className="mb-6 pl-4 border-primary border-l-4 text-slate-300 italic">
                                <strong>Problem:</strong> আনাম একটি ঘরের মধ্যে আছে যার দেওয়ালগুলো উপবৃত্তাকার আকৃতির আদর্শ প্রতিফলক দ্বারা
                                তৈরি। এই উপবৃত্তাকার দেওয়ালের বৃহদাক্ষ 200 মিটার ও ক্ষুদ্রাক্ষ 100 মিটার। আনাম উপবৃত্তাকার ঘরটির একটি
                                ফোকাসে দাঁড়িয়ে একটি শব্দ করলো। শব্দের বেগ 300 মিটার/সেকেন্ড হলে শব্দ করার 10 সেকেন্ডের মধ্যে সে কয়টি
                                প্রতিধ্বনি শুনতে পারবে?
                            </blockquote>

                            <div className="mb-6">
                                <h4 className="mb-2 font-bold text-primary text-sm uppercase tracking-wider">Solution:</h4>
                                <p className="mb-4 text-sm md:text-base">
                                    উপবৃত্তের জ্যামিতিক ধর্ম অনুসারে, এর একটি ফোকাস থেকে উৎপন্ন হওয়া শব্দ বা আলো প্রতিফলিত হয়ে অপর ফোকাসে
                                    গিয়ে মিলিত হয় এবং পুনরায় সেখান থেকে প্রতিফলিত হয়ে প্রথম ফোকাসে ফিরে আসে।
                                </p>
                                <ol className="space-y-3 mb-4 ml-5 text-white/90 text-sm md:text-base list-decimal list-outside">
                                    <li>আনাম প্রথম ফোকাস (F1) থেকে শব্দ করলে, সেটি দেওয়ালে প্রতিফলিত হয়ে দ্বিতীয় ফোকাসে (F2) পৌঁছাতে মোট যে
                                        দূরত্ব অতিক্রম করবে, তা উপবৃত্তের বৃহদাক্ষের (2a) সমান।</li>
                                    <li>এরপর শব্দটি দ্বিতীয় ফোকাস (F2) থেকে পুনরায় দেওয়ালে প্রতিফলিত হয়ে আনামের কাছে অর্থাৎ প্রথম ফোকাসে (F1)
                                        ফিরে আসতে আরও 2a দূরত্ব অতিক্রম করবে।</li>
                                </ol>
                                <p className="mb-4 text-sm md:text-base">
                                    সুতরাং, আনামের কাছে একবার প্রতিধ্বনি ফিরে আসতে শব্দের মোট অতিক্রান্ত দূরত্ব = <span
                                        className="font-mono font-bold text-primary">2a + 2a = 4a</span>
                                </p>
                            </div>

                            <div className="bg-bg-dark/50 mb-6 p-4 border border-glass-border rounded-lg">
                                <h4 className="mb-2 font-bold text-primary text-sm uppercase tracking-wider">দেওয়া আছে:</h4>
                                <ul className="space-y-1 font-mono text-sm md:text-base list-none">
                                    <li>উপবৃত্তের বৃহদাক্ষ, <span className="text-white">2a = 200 মিটার</span></li>
                                    <li>শব্দের বেগ, <span className="text-white">v = 300 মিটার/সেকেন্ড</span></li>
                                    <li>মোট সময়, <span className="text-white">t = 10 সেকেন্ড</span></li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <p className="mb-2 text-sm md:text-base">
                                    একবার প্রতিধ্বনি শুনতে শব্দকে অতিক্রম করতে হবে 4a দূরত্ব।<br />
                                    অতএব, একবার প্রতিধ্বনির জন্য অতিক্রান্ত দূরত্ব = <span className="font-mono text-white">2 × 200 = 400
                                        মিটার।</span>
                                </p>
                                <p className="mb-2 text-sm md:text-base">
                                    10 সেকেন্ডে শব্দ মোট দূরত্ব অতিক্রম করে = <span className="font-mono text-white">v × t = 300 × 10 = 3000
                                        মিটার।</span>
                                </p>
                                <p className="text-sm md:text-base">
                                    সুতরাং, 10 সেকেন্ডে আনাম যে কয়টি প্রতিধ্বনি শুনতে পাবে = <span className="font-mono text-white">3000 / 400 =
                                        7.5</span>
                                </p>
                            </div>

                            <div className="bg-[rgba(0,210,255,0.1)] mt-6 p-4 border-primary border-l-4 rounded-r-lg">
                                <h4 className="mb-1 font-bold text-primary text-sm uppercase tracking-wider">Final Answer:</h4>
                                <p className="font-mono text-white text-xl">সে পূর্ণাঙ্গ প্রতিধ্বনি শুনতে পাবে 7 টি।</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}