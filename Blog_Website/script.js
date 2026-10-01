
/* ================================================================
   The CodSoft Journal — data
================================================================ */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}.jpg`;
const fmtDate = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const relTime = ts => {
    const m = (Date.now() - ts) / 60000;
    if (m < 1) return 'just now';
    if (m < 60) return Math.floor(m) + 'm ago';
    if (m < 1440) return Math.floor(m / 60) + 'h ago';
    if (m < 43200) return Math.floor(m / 1440) + 'd ago';
    return fmtDate(new Date(ts).toISOString().slice(0, 10));
};
const AVC = ['#A14E2F', '#5D6B48', '#B0812A', '#2F6B63', '#7A4A5A', '#55606B'];
const avatar = (name, sz) => {
    const ini = name.split(' ').map(w => w[0]).slice(0, 2).join('');
    const c = AVC[[...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % AVC.length];
    return `<span class="avatar" style="width:${sz}px;height:${sz}px;background:${c}">${ini}</span>`;
};

const CATS = ['Career Advice', 'Web Development', 'Python', 'AI & Machine Learning', 'Data Science', 'Interview Prep'];
const POPULAR_TAGS = ['internships', 'projects', 'communication', 'portfolio', 'python', 'javascript', 'machine-learning', 'resume', 'remote-work', 'data'];
const FEATURED_IDS = [1, 2, 3], MOST_READ = [7, 15, 3, 9], PER = 6;

const BIOS = {
    'Ananya Iyer': 'Spent six months as a CodSoft frontend intern — now builds the onboarding flow she once broke.',
    'Rohan Mehta': 'Engineering mentor of twenty-odd interns. Has opinions about your commit messages.',
    'Priya Nair': 'Talent partner who has read more résumés than most people have read books.',
    'Dev Patel': 'Python developer and automation addict. Believes every boring task is a script waiting to be written.',
    'Sara Khan': 'Machine learning intern, currently losing arguments to her own datasets.',
    'Kabir Singh': 'Remote engineering intern. Works across three time zones from one kitchen table.',
    'Meera Krishnan': 'Turns spreadsheets into stories. Rebuilt this website in her head twice while writing.'
};

const ARTICLES = [
    {
        id: 1, slug: 'internship-to-offer', cat: 'Career Advice', tags: ['internships', 'first-job', 'career-growth'], author: 'Ananya Iyer', date: '2025-06-28', rt: 7, seed: 'csj-1',
        title: 'How I Turned a CodSoft Internship Into a Full-Time Offer',
        ex: 'Seven months ago I was refreshing a portal page hoping anyone would have me. Last week I signed an offer letter — and the gap between the two was made of small, boring, deliberate habits.',
        body: [
            ['p', 'Seven months ago I was a third-year student refreshing a job portal every twenty minutes, hoping somebody — anybody — would let me write code for them. Last week I signed an offer letter as a junior developer. The distance between those two moments was shorter than I expected, but it was made of very specific habits, and almost none of them were about writing clever code.'],
            ['h2', 'Treat the small tasks like auditions'],
            ['p', 'My first assigned task at CodSoft was to fix a broken link that had been sitting in the backlog for two weeks. Not glamorous. I fixed it in an hour, then wrote two lines in the ticket explaining what had actually caused it. The next task was a little bigger. By month three I owned a feature. Nobody hands interesting work to someone who shrugs at boring work — they hand it to someone who treats all of it like it matters, because to a team, all of it does.'],
            ['quote', 'The offer conversation didn’t start the day a role opened up. It started in week one, with a broken link nobody wanted to touch.'],
            ['h2', 'Make your work visible without being loud'],
            ['p', 'Every Friday, I posted a short note in our channel: what I shipped, what I learned, where I was stuck. Ten minutes, tops. My mentor forwarded that note to his manager twice — not because I asked, but because it made his life easier. In a remote-first team, your work doesn’t speak for itself. You have to give it a small, honest voice.'],
            ['ul', ['Keep a running “shipped this week” list — future-you will need it for reviews and résumés.', 'Write down what you learn while it’s fresh; today’s rough note is next month’s documentation.', 'Share blockers early, and always attach what you’ve already tried.', 'Ask for feedback before anyone offers it. Waiting for review season is waiting too long.']],
            ['h2', 'The conversation itself'],
            ['p', 'When a junior role finally opened, the discussion referenced my Friday notes, the ticket I documented, the feature I’d owned. Consistency had quietly become my résumé. If you’re interning right now, take the long view: the offer isn’t won in the final week. It accumulates, in small denominations, from day one.']
        ]
    },
    {
        id: 2, slug: 'crash-course-in-being-useful', cat: 'Career Advice', tags: ['internships', 'career-growth', 'communication'], author: 'Rohan Mehta', date: '2025-04-24', rt: 6, seed: 'csj-2',
        title: 'Your First Internship Is a Crash Course in Being Useful',
        ex: 'After mentoring twenty-odd interns, I can tell you the pattern: the ones who get hired early are rarely the smartest in the room. They’re the most useful.',
        body: [
            ['p', 'I’ve mentored something like twenty interns over the last few years, and I can tell you the single strongest predictor of who gets a return offer — and it isn’t grades, coursework, or how many languages someone lists. It’s how quickly they become useful to the people around them.'],
            ['h2', 'Useful beats brilliant'],
            ['p', 'Usefulness sounds unglamorous, so let me define it. A useful intern reduces someone’s burden: they take a ticket nobody wants, they unblock themselves before asking for help, they write down what they learn so the next person doesn’t have to relearn it. Teams forgive missing knowledge. They remember who made their week lighter.'],
            ['ul', ['Stay stuck for forty-five minutes, not three days. Then ask — with everything you’ve already tried.', 'Finish things. A small task fully done is worth three large ones half-done.', 'Write things down in shared docs, not private notebooks.', 'When you say “I’ll take that”, mean it — and when you say “it’s done”, let it be true.']],
            ['h2', 'The three sentences that build trust'],
            ['p', '“I’ll take that.” “It’s done.” “I documented it here.” Say those three sentences reliably for two months and watch how a team’s posture toward you changes. Trust on an engineering team isn’t built in presentations — it’s built in the mundane gap between claiming and completing.'],
            ['quote', 'The best intern I ever worked with wrote the dullest documentation I’ve ever read. Two years later, that same doc was still the onboarding guide for every new hire.'],
            ['p', 'The good news is that usefulness is entirely learnable. Nobody is born knowing how to unblock themselves or write a decent handoff note. If your internship feels overwhelming, start with one question each morning: what can I take off someone’s plate today? Do that for twelve weeks, and you won’t just finish the internship — you’ll be missed when it ends.']
        ]
    },
    {
        id: 3, slug: 'what-recruiters-actually-read', cat: 'Interview Prep', tags: ['resume', 'career-growth', 'portfolio'], author: 'Priya Nair', date: '2025-06-21', rt: 5, seed: 'csj-3',
        title: 'What Recruiters Actually Read on Your Résumé',
        ex: 'A recruiter spends six to ten seconds on your résumé’s first pass. Here’s exactly where those seconds go — and how to earn a second pass.',
        body: [
            ['p', 'I work in recruiting, which means I have read more résumés than most people have read books. Let me ruin a small illusion: on the first pass, your résumé gets six to ten seconds. Not because we’re cruel — because there are four hundred of them, and because experience has taught us where to look. Here is exactly where those seconds go.'],
            ['h2', 'The top third decides everything'],
            ['p', 'Eyes land on your name, the role you’re targeting, and the first one or two lines under it. If that space is occupied by an “Objective” paragraph about seeking a challenging position in a growth-oriented organization, you’ve spent your six seconds on furniture. Put your strongest material there instead: the project with real users, the internship, the thing you can defend for ten minutes without notes.'],
            ['h2', 'Numbers, not adjectives'],
            ['p', '“Improved performance” is invisible. “Cut the dashboard’s load time from 4.1s to 1.2s by caching API responses” is a conversation starter. Numbers prove two things at once: that you did something measurable, and that you understand what about it mattered. If you don’t have numbers yet, that’s your to-do list, not your disqualification.'],
            ['ul', ['One page. Under five years of experience, two pages read as padding.', 'Every project gets a link. A live URL beats a paragraph every single time.', 'Lead bullets with verbs, close them with outcomes.', 'List only the skills you can defend in an interview — the rest is a trap you set for yourself.']],
            ['quote', 'I have never once finished an “Objective” section. I have bookmarked dozens of GitHub links.'],
            ['p', 'Treat the résumé like a movie trailer, not the film. Its only job is to make someone want the next ten minutes of your time. Design it for a ten-second reader, and the thirty-minute conversation will follow.']
        ]
    },
    {
        id: 4, slug: 'python-projects-that-beat-todo', cat: 'Python', tags: ['python', 'projects', 'portfolio', 'github'], author: 'Dev Patel', date: '2025-04-15', rt: 6, seed: 'csj-4',
        title: 'Python Projects That Beat “Todo List” on a Portfolio',
        ex: 'Another todo app teaches recruiters nothing. Build the boring thing that solves a real annoyance instead — here are four projects that actually start conversations.',
        body: [
            ['p', 'Every Python tutorial ends the same way: a todo list, a calculator, maybe a snake game. You finish them, push them to GitHub, and wait for recruiters to be impressed. They won’t be — they’ve seen four hundred identical repos. Here’s the actual bar: build something with a real user, even if the only user is you.'],
            ['h2', 'Automate an annoyance you actually have'],
            ['p', 'My first portfolio-worthy script was an expense splitter that emailed my flatmates a monthly summary, passive-aggressively formatted as a table. Twenty lines of pandas and smtplib. In every interview since, that script has done more for me than any certificate — because it gives me a story: a real problem, a real solution, real users who complained about the output.'],
            ['h2', 'Serve a small audience well'],
            ['p', 'A scraper that checks internship portals each morning and sends you a digest of new openings is a genuinely useful system — scheduling, parsing and error handling in one unglamorous package. A Flask API that manages memberships for your college club, deployed and actually running, teaches you more about software than a month of tutorials, because real users break things in ways tutorials never predict.'],
            ['ul', ['It should solve an annoyance you genuinely have — the story writes itself.', 'It should produce something visible: an email, a chart, an alert, a page.', 'It deserves a README that explains why, not just how.', 'It should run on a schedule or a server, not only on your laptop.']],
            ['quote', 'A weekend script you use every morning beats a month-long clone nobody opens.'],
            ['p', 'Notice what all four rules have in common: they force your code to touch reality. Reality is messy, and that mess is precisely what makes you interesting in an interview. The todo list has no mess, no users, no story. Skip it — or build it in a weekend as a warm-up, and never show it to anyone.']
        ]
    },
    {
        id: 5, slug: 'ml-internship-expectations', cat: 'AI & Machine Learning', tags: ['machine-learning', 'internships', 'data'], author: 'Sara Khan', date: '2025-06-14', rt: 7, seed: 'csj-5',
        title: 'Machine Learning Internships: What You’re Really Signing Up For',
        ex: 'Nobody warns you that an ML internship is 20% modelling and 80% arguing with data. A field guide to the arguing.',
        body: [
            ['p', 'Let me set expectations for your machine learning internship, because nobody set mine. On day one I expected model architectures and GPU clusters. What I got was a spreadsheet of 40,000 rows and a mentor asking me to “get a feel for it.” I now understand that getting a feel for it was the job.'],
            ['h2', 'You’ll touch models less than you think'],
            ['p', 'The textbook ratio — 80% of ML work is data preparation — felt like a joke until I lived it. The data is where all the decisions live: what counts as a duplicate, what to do with missing labels, why one class has forty examples while another has forty thousand. The model is often the least interesting part, and choosing it early is usually a symptom of not having looked at the data yet.'],
            ['h2', 'Baselines before neurons'],
            ['p', 'My mentor’s rule: no deep learning until a dumb model has told you what the floor looks like. Predict the majority class. Fit a linear model. If your neural network can’t beat a three-line baseline, the problem isn’t the architecture — it’s the data, the features, or the framing. A surprising number of “hard problems” dissolve when you finally look at what the model gets wrong.'],
            ['ul', ['Log every experiment, even the failures — especially the failures.', 'Version your datasets, not just your code.', 'Read one paper a week closely; skim two more.', 'Ask “what does the data look like when it’s wrong?” before “which model should I try?”']],
            ['quote', 'My mentor’s first question was never “which model?” It was always “what does the data look like when it’s wrong?”'],
            ['p', 'If all of this sounds less glamorous than the brochure, good — now you can opt in with open eyes. And there’s a real upside: because the unglamorous work is where understanding lives, the intern who tolerates it longest ends up knowing the system best. In ML, being the person who knows the data is the deepest form of job security.']
        ]
    },
    {
        id: 6, slug: 'remote-internship-etiquette', cat: 'Career Advice', tags: ['remote-work', 'communication', 'internships'], author: 'Kabir Singh', date: '2025-04-07', rt: 5, seed: 'csj-6',
        title: 'Remote Internship Etiquette Nobody Teaches You',
        ex: 'Remote internships fail quietly — in unread messages and unsaid blockers. The etiquette that keeps you visible without being loud.',
        body: [
            ['p', 'A remote internship is a strange arrangement: nobody is watching you, and everyone notices what you do. There’s no hallway, no overheard sigh of relief when you fix something. Everything your teammates know about you arrives as text, on a schedule you control. Which means the etiquette — the boring, unwritten rules — matters twice as much.'],
            ['h2', 'Over-communicate, then over-communicate some more'],
            ['p', 'The failure mode of remote interns isn’t laziness; it’s silence. Being stuck at a desk looks like thinking. Being stuck on a remote team looks like nothing at all. Post updates even when the update is “still on the same task, found two dead ends, trying a third.” A teammate who knows your status can plan around you. A silent one forces everyone to guess.'],
            ['ul', ['If something has blocked you for more than thirty minutes, say so in the channel.', 'Confirm you’ve received instructions — a one-line “on it” closes a loop the sender forgot was open.', 'State your working hours explicitly if they differ from the team’s.', 'Keep your calendar public. Invisible free time is unschedulable free time.', 'Turn your camera on for the first minute of meetings, then read the room.']],
            ['h2', 'Write like your message will be read twice'],
            ['p', 'Remote teams run on written artifacts: tickets, docs, changelogs. Vague writing creates work for everyone else. The fix isn’t formality — it’s completeness: what you did, what broke, what you need, and by when. Four sentences that answer those save a meeting, and meetings are the most expensive text there is.'],
            ['quote', 'In an office, being stuck looks like thinking. On a remote team, being stuck looks like silence — and silence looks like a beach.'],
            ['p', 'None of this requires talent, only discipline, which is precisely why it stands out so much. When my internship ended, my mentor’s feedback came down to one line: “I always knew where you were.” On a distributed team, there may be no higher praise.']
        ]
    },
    {
        id: 7, slug: 'sql-gets-you-hired', cat: 'Data Science', tags: ['sql', 'data', 'interviews'], author: 'Ananya Iyer', date: '2025-06-05', rt: 5, seed: 'csj-7',
        title: 'SQL Is Boring. That’s Why It Gets You Hired.',
        ex: 'Every data interview asks it, every tutorial undersells it. SQL is the unglamorous skill that quietly clears the bar.',
        body: [
            ['p', 'Nobody chooses a data career because they love SQL. They choose it despite SQL — and then spend every interview of their life grateful for it. If there’s one unglamorous skill that quietly clears hiring bars across data science, analytics and backend roles alike, it’s this one.'],
            ['h2', 'The interview questions are the job'],
            ['p', 'Here’s an open secret: the same dozen question shapes cover most SQL interviews. Top-N per group. Gaps in sequences. Running totals. Self-joins for “customers who did X and later Y.” Window functions over ranks. You don’t need to memorize trivia — you need to recognize shapes, the way a chess player recognizes openings. And the only way to build that pattern library is to query real, messy data until the shapes stop surprising you.'],
            ['ul', ['Joins until they’re boring — they never fully become boring.', 'Aggregations with GROUP BY, plus the sneaky HAVING.', 'Window functions: ROW_NUMBER, RANK and running sums.', 'CTEs, which turn a monster query into a readable one.']],
            ['quote', 'Every dataset I have ever met in production was uglier than the tutorial one — and SQL didn’t care.'],
            ['p', 'Practice on data that misbehaves: government open-data portals, scraped tables, anything with NULLs in places NULLs should not be. Clean tutorial databases teach you syntax; dirty ones teach you SQL. And boring, in this field, is a synonym for reliable — which is a synonym for “always in demand.” Master the boring thing. It pays the interesting bills.']
        ]
    },
    {
        id: 8, slug: 'github-profiles-recruiters-bookmark', cat: 'Career Advice', tags: ['github', 'portfolio', 'resume'], author: 'Rohan Mehta', date: '2025-03-29', rt: 6, seed: 'csj-8',
        title: 'GitHub Profiles Recruiters Bookmark (and the Ones They Skip)',
        ex: 'I click GitHub links for a living. Twenty seconds later I’ve either bookmarked a profile or closed the tab — here’s what makes the difference.',
        body: [
            ['p', 'Part of my week is clicking the GitHub link on internship applications. I give each profile about twenty seconds, which — before you judge me — is generous. Here is what those twenty seconds actually contain, and how to earn a third visit.'],
            ['h2', 'The README is the front door'],
            ['p', 'A pinned repo with a one-line “why” beats a profile with forty repos and no context. I’m not reading code on a first visit; I’m reading your README and deciding whether code exists that might be worth a second visit. What makes me stay: a clear problem statement, a screenshot or a GIF, honest setup instructions, and a note on what you’d improve next. That last one is rarer than you’d think — and it signals something no green square can: judgment.'],
            ['ul', ['Three strong pinned repositories — curated, not accumulated.', 'READMEs written for a stranger, not for your future self.', 'At least one project with an actual user, even if that user is a club, a cousin or a campus.', 'Commit messages that read like sentences, because that’s what they are.']],
            ['h2', 'The green squares myth'],
            ['p', 'Contribution graphs are the most gamed metric in this industry. Consistency is genuinely admirable — but two thousand commits of tutorial follow-alongs add up to a well-decorated tutorial. I’d take six months of honest work on one real project over a solid wall of green any day, and so would the person interviewing you.'],
            ['quote', 'I don’t read code on the first visit. I read the README and decide whether there’s a second one.'],
            ['p', 'Think of your profile as a magazine, not an archive: curate the cover, and let the stacks live elsewhere. If the front page answers “what does this person build, and can they explain it” — you’ve already beaten most of the queue.']
        ]
    },
    {
        id: 9, slug: 'tutorial-hell-30-day-plan', cat: 'Web Development', tags: ['frontend', 'projects', 'learning', 'javascript'], author: 'Dev Patel', date: '2025-05-27', rt: 8, seed: 'csj-9',
        title: 'From Tutorial Hell to Shipped Code: A 30-Day Plan',
        ex: 'You can follow any tutorial ever written, but you can’t start anything. A four-week escape plan from tutorial hell.',
        body: [
            ['p', 'Tutorial hell has an exact definition: the state of being able to follow anything and start nothing. You finish a course, feel great for a weekend, then open a blank editor and reach for a new course. I know because I lived there for a year. Here is the escape plan that finally worked — thirty days, one project, zero new tutorials.'],
            ['h2', 'Week one — pick a wound'],
            ['p', 'Don’t pick a project; pick an irritation. Mine was that a shop I knew priced things in a notebook and totalled it wrong twice a day. That became the project: a tiny billing page. The test for your choice is simple: you should be able to finish the sentence “this annoys me because ___” without using the words “portfolio” or “impressive.”'],
            ['h2', 'Week two — build the ugly version'],
            ['p', 'No styling, no architecture, no state management library you saw in a video. One HTML file if you have to. The ugly version exists to answer a question tutorials never ask: does this actually solve the irritation? Shipping an ugly solution that works teaches you more about scope than a beautiful unfinished one ever will.'],
            ['h2', 'Week three — deploy it, broken and all'],
            ['p', 'Put it on a real URL. A deployed project changes your psychology: it exists, it can break, someone can use it. Give it to the actual person with the actual problem. Watch them use it wrong. That hour of watching is worth ten tutorials on “user-centric design,” and it costs you nothing but humility.'],
            ['h2', 'Week four — iterate on the wreckage'],
            ['p', 'Fix only what the real user tripped over. Then stop. Write the README, take a screenshot, and add it to your résumé with a number attached: “saves twenty minutes of manual totalling a day.” You now have something almost nobody coming out of tutorial hell has: a story with a user in it.'],
            ['ul', ['No new tutorial until the current project is deployed.', 'Copy code only when you can explain every line a day later.', 'Deploy early — the fear of deploying shrinks every time you do it.', 'Done is a feature. Ship v1 and let v2 be someone else’s problem — namely, future you.']],
            ['quote', 'The difference between learning and pretending to learn is a URL you can send to someone.']
        ]
    },
    {
        id: 10, slug: 'rebuilding-portfolio-five-times', cat: 'Web Development', tags: ['portfolio', 'frontend', 'design'], author: 'Meera Krishnan', date: '2025-03-21', rt: 5, seed: 'csj-10',
        title: 'What I Learned Rebuilding My Portfolio Site Five Times',
        ex: 'Five rebuilds, two domain changes, one lesson that survived all of them: nobody hires the loading animation.',
        body: [
            ['p', 'I have rebuilt my portfolio site five times in two years. Framework churn, redesign fever, a fonts phase I don’t want to discuss — I’ve been through it all. Each rebuild taught me something, but not what I expected, and the last version finally taught me the only lesson that matters.'],
            ['h2', 'V1 to V3: decoration as procrastination'],
            ['p', 'The first three versions shared a flaw: they were beautiful and said nothing. Animated hero, tasteful dark mode, a grid of project cards with lorem-ipsum-shaped gaps where proof should have been. I was decorating an empty room. Each redesign felt like progress because it produced activity — pixels moved, commits happened, nothing was communicated.'],
            ['h2', 'V4: one case study changes everything'],
            ['p', 'Version four had a single real case study: a data dashboard I’d built for a campus club, written up honestly — the brief, the wrong first idea, the rewrite, the numbers. That one page outperformed the entire decorated site combined. Three people contacted me through it. Zero have ever contacted me because of a loading animation, a statistic I keep in a small mental trophy case.'],
            ['ul', ['One deep case study beats six shallow cards.', 'Real copy — written by me, about real decisions.', 'Fast on a cheap phone, because that’s what recruiters open it on.', 'A visible, low-friction way to say hello.']],
            ['quote', 'Three people contacted me because of one case study. Zero have ever contacted me because of a loading animation.'],
            ['p', 'Version five shipped in a weekend and I have deliberately stopped touching it — that restraint is the hardest frontend skill I’ve learned. The portfolio isn’t the work; it’s the frame. Go build something worth framing, then come back and write about it properly. Your site doesn’t need to be impressive. Your work does.']
        ]
    },
    {
        id: 11, slug: 'nlp-intern-diaries', cat: 'AI & Machine Learning', tags: ['machine-learning', 'data', 'python'], author: 'Sara Khan', date: '2025-05-19', rt: 6, seed: 'csj-11',
        title: 'NLP Intern Diaries: When the Dataset Fights Back',
        ex: 'Forty thousand support tickets, three languages, one humbled intern. What production data taught me that clean tutorial tables never did.',
        body: [
            ['p', 'My dataset: forty thousand customer support tickets, three languages liberally mixed within single sentences, emojis doing grammatical work, and labels applied by tired humans at the end of long shifts. The textbooks had prepared me for none of it. This is what an NLP internship actually looks like.'],
            ['h2', 'Accuracy is the wrong question'],
            ['p', 'My first classifier reported 92% accuracy, and I was proud for exactly one afternoon. Then I looked at the class breakdown: the model was excellent at predicting the majority category and confidently wrong about every class that mattered — the ones the support team actually needed routed automatically. Overall accuracy on imbalanced data is a compliment the dataset pays itself. Per-class precision and recall were the real report card.'],
            ['h2', 'Cleaning is modelling'],
            ['p', 'Here’s the philosophical shift nobody tells you about: every preprocessing decision is a modelling decision. Lowercasing? You just erased signal from product names. Stripping emojis? In this dataset, a folded-hands emoji carried more sentiment than the words around it. Removing “stopwords”? Some of them were the entire meaning of short tickets. I stopped calling it cleaning. It’s modelling — you’re deciding what reality looks like to the algorithm, and every decision deserves the same skepticism you’d give an architecture choice.'],
            ['ul', ['Look at a hundred random examples before training anything. Then a hundred more.', 'Print the confusion matrix per class, always — especially when it hurts.', 'Track the labels’ noise, not just the model’s loss: tired annotators drift.', 'Keep a “weird examples” file. It becomes your best documentation.']],
            ['quote', 'The model was fine. My assumptions about the data were the bug.'],
            ['p', 'On the last week of the internship, my mentor asked what I’d learned. I said something I couldn’t have said before: “The dataset is the colleague you spend the most time with. Learn to get along with it before you try to be the boss of it.”']
        ]
    },
    {
        id: 12, slug: 'standup-survival-guide', cat: 'Career Advice', tags: ['communication', 'internships', 'remote-work'], author: 'Kabir Singh', date: '2025-03-12', rt: 4, seed: 'csj-12',
        title: 'The Standup Survival Guide for First-Time Interns',
        ex: 'Yesterday, today, blockers — thirty seconds, no monologues. The complete script for your first standup.',
        body: [
            ['p', 'On my first morning as an intern, a meeting called “standup” appeared on my calendar and I spent the night before rehearsing for it like a thesis defense. It lasted nine minutes. If someone had just told me the format, I could have slept. So, for every first-time intern: here is the entire game.'],
            ['h2', 'The only script you need'],
            ['p', 'A standup update has three parts: what you did yesterday, what you’re doing today, and what’s in your way. Thirty seconds, weather-report neutral. “Yesterday I finished the export bug fix; today I’m on the pagination issue; nothing blocking.” Done. If you prepared nothing else, prepare those three clauses — write them down before the call if it helps. Everyone does it. Nobody will ever know.'],
            ['ul', ['Prepare before the call, not during it — the difference is audible.', 'Mention blockers even when the blocker is you. “I’m stuck, and I’ve tried X and Y” is a perfect update.', 'Keep it under a minute. The meteorologist doesn’t explain cloud physics.', 'Don’t narrate your debugging journey step by step — offer the one-line version and follow up after.', 'Don’t apologize for being stuck. Being stuck is a status, not a crime.', 'Don’t perform busyness. Teams hear through it faster than you think.']],
            ['quote', 'A good standup update is a weather report: short, current, and useful for planning somebody else’s day.'],
            ['p', 'One last rule, the most important one: if you’ve been stuck for more than forty-five minutes to an hour, that stuck-ness is your blocker, and blockers are exactly what standup exists to surface. Saying “I haven’t solved this since yesterday” feels like failure and sounds, to a healthy team, like the system working exactly as designed.']
        ]
    },
    {
        id: 13, slug: 'dataviz-storytelling', cat: 'Data Science', tags: ['data', 'visualization', 'communication'], author: 'Meera Krishnan', date: '2025-05-10', rt: 6, seed: 'csj-13',
        title: 'Data Visualization Is Storytelling, Not Decoration',
        ex: 'If you can’t write the headline, don’t draw the chart. A field guide to visuals people actually read.',
        body: [
            ['p', 'Somewhere along the way, charts became decoration — a dash of credibility sprinkled over reports. Then everyone stops reading them, and the dashboard becomes a wallpaper with filters. The fix isn’t better tools. It’s remembering that a chart is a sentence: one subject, one verb, one point.'],
            ['h2', 'One chart, one message'],
            ['p', 'Before you draw anything, write the headline the chart should earn: “Churn doubled after the pricing change.” If you can’t write the headline, you don’t have a chart yet — you have an exploration, and explorations belong in your notebook, not in the deck. The discipline of the headline is what separates communication from decoration, and it’s the hardest rule to keep, because dashboards are judged by density and headlines require deletion.'],
            ['h2', 'Deletion is the design'],
            ['p', 'The strongest visualization skill isn’t color theory — it’s the delete key. Gridlines that don’t aid reading: gone. The third data series that dilutes the one that matters: gone. The 3D effect someone added in 2011: gone, and also apologize. Color survives with a single job: emphasis. One accent, applied to the thing the headline is about, and nothing else. When every bar is highlighted, nothing is.'],
            ['ul', ['If the axis has to be truncated to make the point, say so out loud on the chart.', 'Sort bars by meaning, not alphabet — nobody’s question is ever “what starts with A?”', 'Ditch dual axes unless the comparison truly demands them; they invite misreading.', 'Label the point directly on the data. Legends make readers do homework.']],
            ['quote', 'A good chart answers a question. A great one makes someone ask the next question.'],
            ['p', 'I keep one test for every visualization I ship: can someone glance at it mid-scroll and leave with the headline? If they need a paragraph to be persuaded, the paragraph belongs in the text — and the chart needs to be simplified until it could survive being ignored. Respect the glance; earn the stare.']
        ]
    },
    {
        id: 14, slug: 'asking-better-questions', cat: 'Career Advice', tags: ['communication', 'learning', 'internships'], author: 'Priya Nair', date: '2025-03-04', rt: 5, seed: 'csj-14',
        title: 'Asking Better Questions Is a Technical Skill',
        ex: 'Asking for help is not the weakness you think it is. Asking badly is. The anatomy of a question that gets answered in ten minutes.',
        body: [
            ['p', 'Somewhere along the way, “never be the intern who asks too many questions” became the worst advice in tech. The interns who struggle aren’t the ones who ask — they’re the ones who ask badly, or in silence, or after three days of being stuck. Asking well is a technical skill, it’s trainable, and unlike talent, it’s visible to your whole team from day one.'],
            ['h2', 'The XY problem, and how to escape it'],
            ['p', 'The classic failure: you want your script to extract a zip file (X), so you ask how to fix the specific command that’s failing (Y) — while the actual answer is “don’t unzip at all, stream the files.” When you ask about your attempted path instead of your destination, you drag the answerer into your dead end. Lead with the goal: “I’m trying to get the monthly report emailed automatically. I tried unzipping in bash but…” — now the person with experience can reroute you in one message.'],
            ['h2', 'Anatomy of a question that gets answered fast'],
            ['ul', ['Context: what you’re trying to achieve, one sentence.', 'Attempt: what you tried, with the actual command, code or click path.', 'Expectation vs reality: what you thought would happen, what happened instead, and the exact error.', 'Homework: the doc you read, and the specific sentence where you got lost.']],
            ['p', 'Notice what this buys you even before anyone replies: half the time, writing all four parts makes the answer obvious. Rubber duck debugging is real, and the duck works for free.'],
            ['quote', 'Junior developers ask how. The ones worth watching ask what, when, and — occasionally — why not.'],
            ['p', 'And please, do the forty-five-minute rule. Struggle honestly for a while; it’s how the knowledge sticks. But past that point, a good question is not an interruption to the team — it’s a signal that the team’s knowledge has a gap, and fixing gaps is literally what senior people are paid for.']
        ]
    },
    {
        id: 15, slug: 'event-loop-over-chai', cat: 'Web Development', tags: ['javascript', 'frontend', 'learning'], author: 'Dev Patel', date: '2025-05-02', rt: 6, seed: 'csj-15',
        title: 'JavaScript’s Event Loop, Explained Over Chai',
        ex: 'One chef, one counter, and a queue of hungry callbacks. The event loop, finally explained the way it deserves — with a live demo.',
        body: [
            ['p', 'The event loop is the most common interview question in JavaScript, and the most commonly misunderstood. Not because it’s hard — because the explanations are always abstract. So here is the only analogy you’ll ever need, and it involves chai.'],
            ['h2', 'One chef, one counter'],
            ['p', 'JavaScript is a single cook in a very small kitchen. Orders arrive (your code), and the chef completes each one fully before starting the next — that’s the call stack, and it’s why a long-running loop can freeze a page: nothing else gets cooked while the chef is busy. New orders don’t interrupt; they queue on the counter.'],
            ['h2', 'Why setTimeout(fn, 0) isn’t instant'],
            ['p', 'When you ask for a timer, you’re not booking the chef — you’re putting a chit on the counter with a “not before” time. setTimeout(fn, 0) means “earliest possible, after everything currently cooking and everything already on the counter’s priority rail.” While the tea boils (a timer waiting), the chef handles the quick tickets first.'],
            ['p', 'Those quick tickets are promises, and they travel on the priority rail called the microtask queue. Microtasks — promise callbacks — always cut ahead of macrotasks like timeouts. Always. The chef clears the priority rail before returning to the counter. That single sentence answers half of all event loop questions ever asked.'],
            ['demo'],
            ['p', 'Run it yourself — mind the order, and then the milliseconds, which tell the whole story. The two “script” lines are the synchronous cook. The promise arrives while the kitchen is still open. The timeout waits for everything, including the promise, despite being requested first. One chef, one counter, one priority rail. That’s the entire runtime.'],
            ['quote', 'JavaScript doesn’t multitask. It just finishes things fast enough that you never catch it queuing.'],
            ['p', 'In interviews, this maps to the classic ordering question: synchronous code, then microtasks, then macrotasks. Say it over chai, ideally. And if they ask about a nested setTimeout inside a promise… well — that’s the second interview question, and you now own the framework to answer it.']
        ]
    },
    {
        id: 16, slug: 'talk-about-your-project', cat: 'Interview Prep', tags: ['interviews', 'projects', 'communication'], author: 'Ananya Iyer', date: '2025-02-24', rt: 5, seed: 'csj-16',
        title: 'Interview Prep: Talk About Your Project Like a Story',
        ex: '“Tell me about your project” is the most wasted question in interviews — and your best chance to actually be remembered.',
        body: [
            ['p', '“Tell me about your project” — the most wasted question in the entire interview process, because almost everyone answers it with a list. “I used React and Node with MongoDB and, um, Redux.” That’s a receipt, not a story. The interviewer isn’t auditing your stack; they’re watching how you think. Here is the four-beat structure that turns a project into a narrative.'],
            ['h2', 'The four beats'],
            ['ul', ['The problem — who had it, and why it mattered. One sentence, with a human in it.', 'The decisions — what you chose, what you rejected, and the reason. Tradeoffs are the whole point.', 'The hard moment — the bug or dead end that nearly won, and how you got out. This is the beat they remember.', 'The outcome — what changed, with a number if you can. Then the finishing move: what you’d do differently now.']],
            ['p', 'Notice that the stack appears only where it earns its place: inside decisions. “I chose SQLite over Postgres because it was a single-user tool and I wanted zero setup” says something about you. “I used SQLite” says something about a tutorial you followed. Every technology in your answer should arrive attached to a reason, the way every witness arrives attached to testimony.'],
            ['quote', 'Interviewers don’t remember stacks. They remember the sentence that started with “so I deleted half my code and started over” — and the reason that followed it.'],
            ['p', 'Rehearse the story out loud, timed to about ninety seconds. Ninety is enough for four beats and short enough to leave the interviewer leaning in rather than glancing at their watch — and lean-in is where offers live. Then prepare a thirty-second version, because someone will always ask for the short one on the way out.']
        ]
    }
];

const SEED_COMMENTS = {
    1: [{ n: 'Tanvi Deshmukh', t: 'The Friday-note idea is so simple it’s annoying. Starting this week — my mentor has no idea what’s coming.', d: 3 },
    { n: 'Arjun Rao', t: 'Saving this for day one of my internship next month. The “small denominations” line is going on my wall.', d: 1 }],
    2: [{ n: 'Ishaan Verma', t: '“I’ll take that. It’s done. I documented it here.” — three sentences, career unlocked. Great read.', d: 6 }],
    3: [{ n: 'Riya Kapoor', t: 'The first résumé article that didn’t make me feel like a spreadsheet. Rewriting my top third tonight.', d: 2 },
    { n: 'Nikhil Joshi', t: 'As someone who screens CVs for my club’s tech team: the numbers point is painfully accurate.', d: 1 }],
    4: [{ n: 'Aditya Kumar', t: 'The expense splitter with the passive-aggressive table made me laugh out loud. Also, genuinely good advice.', d: 4 }],
    5: [{ n: 'Zoya Ahmed', t: 'Can confirm the 80% number. My “ML internship” is mostly Excel with extra steps so far.', d: 5 },
    { n: 'Vikram Nair', t: '“Baselines before neurons” is the best four-word summary of ML I’ve ever read.', d: 2 }],
    6: [{ n: 'Sanjana Reddy', t: 'Two weeks into my first remote internship and this felt like being seen. The beach line hurt a little.', d: 7 }],
    7: [{ n: 'Farhan Ali', t: 'Started the window-functions grind last week because of this. My brain hurts but my queries are finally readable.', d: 3 }],
    8: [{ n: 'Ishita Bose', t: 'My most-bookmarked repo is my most documented one, not my cleverest. Can confirm from the other side.', d: 2 }],
    9: [{ n: 'Arjun Rao', t: 'Escaped tutorial hell with almost exactly this plan. The “deploy early” rule does something to your brain — in a good way.', d: 8 }],
    10: [{ n: 'Riya Kapoor', t: 'Portfolio rebuild count: 3 and counting. Glad to hear the frame-not-the-work lesson eventually lands.', d: 9 }],
    11: [{ n: 'Zoya Ahmed', t: '“The model was fine. My assumptions about the data were the bug.” — printing this for my desk.', d: 4 }],
    12: [{ n: 'Ishaan Verma', t: 'Tomorrow’s standup update is going to be 40% shorter and 100% less rehearsed. Thank you.', d: 2 }],
    13: [{ n: 'Neha Gupta', t: 'Wish someone had told me “one chart, one message” before my capstone presentation. Eleven charts. ELEVEN.', d: 6 }],
    14: [{ n: 'Nikhil Joshi', t: 'Used the four-part template in my team channel today. Unblocked in ten minutes. Coincidence? Probably. But still.', d: 3 }],
    15: [{ n: 'Tanvi Deshmukh', t: 'The chai analogy finally made microtasks click. Also the demo is dangerously fun to re-run.', d: 2 },
    { n: 'Aditya Kumar', t: 'Got this exact question in an interview on Friday. Ordering: sync, micro, macro — forever engraved.', d: 1 }],
    16: [{ n: 'Sanjana Reddy', t: 'The four-beat structure reframed my entire capstone pitch. The “hard moment” beat is the one everyone skips, and the only one anyone remembers.', d: 5 }]
};

/* ================================================================
   state & shared helpers
================================================================ */
const BASE_TITLE = document.title;
const state = { view: 'home', article: null, cat: 'All', tag: null, shown: PER, homeScroll: 0 };
let prevView = 'home', prevShown = 0, sIdx = -1;

const byId = id => ARTICLES.find(a => a.id === id);
const currentList = () => ARTICLES
    .filter(a => (state.cat === 'All' || a.cat === state.cat) && (!state.tag || a.tags.includes(state.tag)))
    .sort((x, y) => y.date.localeCompare(x.date));

function toast(msg, icon = 'check') {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<svg class="ic" aria-hidden="true"><use href="#i-${icon}"/></svg><span>${msg}</span>`;
    $('#toasts').append(t);
    requestAnimationFrame(() => t.classList.add('in'));
    setTimeout(() => { t.classList.remove('in'); setTimeout(() => t.remove(), 380); }, 2600);
}

/* ================================================================
   home renderers
================================================================ */
function renderTicker() {
    const items = ['Web Development', 'Python', 'AI & Machine Learning', 'Data Science', 'Career Advice', 'Interview Prep', 'Remote Internships', 'Open Source', 'First Jobs', 'Portfolios', 'Résumés', 'Standups'];
    const half = items.map(t => `<span class="tk">${t}</span><svg class="ic tk-star" aria-hidden="true"><use href="#i-star"/></svg>`).join('');
    $('#tickerTrack').innerHTML = half + half;
}

function miniHTML(a) {
    return `<article class="mini" data-story="${a.slug}" tabindex="0" role="link" aria-label="${esc(a.title)}">
    <div class="mini-text">
      <div class="kicker"><span class="cat">${a.cat}</span><span class="dot"></span><span>${fmtDate(a.date)}</span></div>
      <h3 class="mini-title">${a.title}</h3>
      <p class="mini-ex">${a.ex}</p>
      <div class="mini-foot">${a.rt} min read · by ${a.author}</div>
    </div>
    <div class="mini-media"><img src="${img(a.seed, 320, 240)}" alt="" loading="lazy" decoding="async"></div>
  </article>`;
}

function renderFeatured() {
    const lead = byId(1), s = [byId(2), byId(3)];
    $('#featuredGrid').innerHTML = `
    <article class="lead rise" data-story="${lead.slug}" tabindex="0" role="link" aria-label="${esc(lead.title)}">
      <div class="lead-media"><img src="${img(lead.seed, 1100, 730)}" alt="" decoding="async"></div>
      <div class="lead-body">
        <div class="kicker" style="margin-top:4px"><span class="cat">${lead.cat}</span><span class="dot"></span><span>${fmtDate(lead.date)}</span><span class="dot"></span><span>${lead.rt} min read</span></div>
        <h2 class="lead-title">${lead.title}</h2>
        <p class="lead-ex">${lead.ex}</p>
        <div class="lead-foot">
          ${avatar(lead.author, 30)}<span><strong>${lead.author}</strong></span>
          <span class="lead-read">Read the story <svg class="ic" aria-hidden="true"><use href="#i-arrow"/></svg></span>
        </div>
      </div>
    </article>
    <div class="feat-side">
      ${s.map((a, i) => `<div class="rise" style="animation-delay:${.12 + i * .12}s">${miniHTML(a)}</div>`).join('')}
      <div class="mostread rise" style="animation-delay:.38s">
        <p class="d-label">Most read this week</p>
        <ul class="mr-list">
          ${MOST_READ.map((id, i) => { const a = byId(id); return `<li><button data-story="${a.slug}"><span class="mr-num">${String(i + 1).padStart(2, '0')}</span><span class="mr-title">${a.title}</span></button></li>`; }).join('')}
        </ul>
      </div>
    </div>`;
}

function renderChips() {
    const counts = {};
    ARTICLES.forEach(a => counts[a.cat] = (counts[a.cat] || 0) + 1);
    $('#chips').innerHTML = ['All', ...CATS].map(c => {
        const n = c === 'All' ? ARTICLES.length : counts[c] || 0;
        return `<button class="chip ${state.cat === c ? 'on' : ''}" data-cat="${c}">${c}<span class="n">${n}</span></button>`;
    }).join('');
}

function renderTags() {
    $('#tagRow').innerHTML = `<span style="font-weight:700;color:var(--ink-2)">Popular tags</span><svg class="ic" style="width:13px;height:13px;color:var(--accent)" aria-hidden="true"><use href="#i-tag"/></svg>` +
        POPULAR_TAGS.map(t => `<button class="tag-btn ${state.tag === t ? 'on' : ''}" data-tag="${t}">#${t}</button>`).join('');
}

function cardHTML(a, i) {
    const anim = i >= prevShown ? 'rise' : '';
    const d = i >= prevShown ? `style="animation-delay:${Math.min(i - prevShown, 7) * 70}ms"` : '';
    return `<article class="card ${anim}" ${d} data-story="${a.slug}" tabindex="0" role="link" aria-label="${esc(a.title)}">
    <div class="card-media"><img src="${img(a.seed, 800, 500)}" alt="" loading="lazy" decoding="async"></div>
    <div class="card-body">
      <div class="kicker"><span class="cat">${a.cat}</span><span class="dot"></span><span>${fmtDate(a.date)}</span></div>
      <h3 class="card-title">${a.title}</h3>
      <p class="card-ex">${a.ex}</p>
      <div class="card-foot">
        <span class="who">${avatar(a.author, 26)}<span>${a.author}</span></span>
        <span class="rt"><svg class="ic" aria-hidden="true"><use href="#i-clock"/></svg>${a.rt} min</span>
      </div>
    </div>
  </article>`;
}

function renderFeed(reset) {
    if (reset) { state.shown = PER; prevShown = 0; }
    const list = currentList();
    const show = list.slice(0, state.shown);
    const empty = list.length === 0;
    $('#grid').innerHTML = show.map((a, i) => cardHTML(a, i)).join('');
    $('#grid').hidden = empty;
    $('#feedEmpty').hidden = !empty;
    if (empty) $('#feedEmpty').innerHTML = `No stories under this combination yet — try a different mix. <button data-clear>Clear filters</button>`;
    const done = !empty && state.shown >= list.length;
    $('#moreWrap').hidden = done || empty;
    $('#feedEnd').hidden = !done;
    let t = `${list.length} ${list.length === 1 ? 'story' : 'stories'}`;
    if (state.cat !== 'All') t += ` · ${state.cat}`;
    if (state.tag) t += ` · tagged “${state.tag}”`;
    t += ` · showing ${show.length}`;
    const filtered = state.cat !== 'All' || state.tag;
    $('#feedCount').innerHTML = esc(t) + (filtered ? ` <button class="clearf" data-clear>clear <svg class="ic" aria-hidden="true"><use href="#i-x"/></svg></button>` : '');
    prevShown = show.length;
}

/* ================================================================
   article view
================================================================ */
function bodyHTML(a) {
    return a.body.map(b => {
        if (b[0] === 'p') return `<p>${b[1]}</p>`;
        if (b[0] === 'h2') return `<h2>${b[1]}</h2>`;
        if (b[0] === 'quote') return `<aside class="pull"><svg class="ic pull-star" aria-hidden="true"><use href="#i-star"/></svg><p>“${b[1]}”</p></aside>`;
        if (b[0] === 'ul') return `<ul>${b[1].map(li => `<li>${li}</li>`).join('')}</ul>`;
        if (b[0] === 'demo') return `
      <div class="demo">
        <div class="demo-head"><span>console — the kitchen</span><button class="run-btn" data-run><svg class="ic" aria-hidden="true"><use href="#i-play"/></svg>Run it</button></div>
        <pre>console.log("1 · script starts (synchronous)");

setTimeout(() =&gt; console.log("4 · setTimeout fires (macrotask)"), 0);

Promise.resolve().then(() =&gt; console.log("3 · promise runs (microtask)"));

console.log("2 · script ends (synchronous)");</pre>
        <div class="demo-out" id="demoOut"><span style="color:var(--ink-3)">// output appears here — mind the order, then the milliseconds</span></div>
      </div>`;
        return '';
    }).join('');
}

function relatedOf(a) {
    return ARTICLES.filter(b => b.id !== a.id)
        .map(b => ({ b, s: (b.cat === a.cat ? 3 : 0) + b.tags.filter(t => a.tags.includes(t)).length * 2 + (b.author === a.author ? 1 : 0) }))
        .sort((x, y) => y.s - x.s || y.b.date.localeCompare(x.b.date))
        .slice(0, 3).map(x => x.b);
}

function commentsFor(a) {
    let user = [];
    try { user = JSON.parse(localStorage.getItem('cs-c-' + a.id) || '[]'); } catch (e) { }
    const seeds = (SEED_COMMENTS[a.id] || []).map(c => ({ name: c.n, text: c.t, ts: Date.now() - c.d * 864e5 }));
    return [...seeds, ...user];
}

function renderComments(a) {
    const list = commentsFor(a);
    $('#cCount').textContent = `${list.length} ${list.length === 1 ? 'comment' : 'comments'}`;
    $('#cList').innerHTML = list.length
        ? list.map(c => `<div class="comment">${avatar(c.name, 40)}<div class="c-body"><div class="c-head"><span class="c-name">${esc(c.name)}</span><span class="c-time">${relTime(c.ts)}</span></div><p>${esc(c.text)}</p></div></div>`).join('')
        : `<p class="c-empty">No comments yet — be the first to add yours.</p>`;
}

function renderArticle(a) {
    state.article = a;
    const rel = relatedOf(a);
    $('#view-article').innerHTML = `
  <div class="wrap art-wrap">
    <button class="backlink" id="backHome"><svg class="ic" aria-hidden="true"><use href="#i-back"/></svg>All stories</button>
    <header class="art-head rise">
      <div class="kicker"><button class="cat-link" data-cat="${a.cat}">${a.cat}</button><span class="dot"></span><span>${fmtDate(a.date)}</span><span class="dot"></span><span>${a.rt} min read</span></div>
      <h1 class="art-title">${a.title}</h1>
      <p class="standfirst">${a.ex}</p>
      <div class="art-meta">
        <div class="byline">${avatar(a.author, 46)}<span class="who">${a.author}<small>${a.cat} · writes about early careers</small></span></div>
        <div class="share-inline">
          <button class="s-btn" data-share="x" aria-label="Share on X" title="Share on X"><svg class="ic" aria-hidden="true"><use href="#i-x-soc"/></svg></button>
          <button class="s-btn" data-share="li" aria-label="Share on LinkedIn" title="Share on LinkedIn"><svg class="ic" aria-hidden="true"><use href="#i-li"/></svg></button>
          <button class="s-btn" data-share="fb" aria-label="Share on Facebook" title="Share on Facebook"><svg class="ic" aria-hidden="true"><use href="#i-fb"/></svg></button>
          <button class="s-btn" data-copy aria-label="Copy link" title="Copy link"><svg class="ic" aria-hidden="true"><use href="#i-link"/></svg></button>
        </div>
      </div>
    </header>
    <div class="art-layout rise" style="animation-delay:.1s">
      <aside class="rail"><div class="rail-sticky">
        <span class="rail-label">Share</span>
        <button class="s-btn" data-share="x" aria-label="Share on X" title="Share on X"><svg class="ic" aria-hidden="true"><use href="#i-x-soc"/></svg></button>
        <button class="s-btn" data-share="li" aria-label="Share on LinkedIn" title="Share on LinkedIn"><svg class="ic" aria-hidden="true"><use href="#i-li"/></svg></button>
        <button class="s-btn" data-share="fb" aria-label="Share on Facebook" title="Share on Facebook"><svg class="ic" aria-hidden="true"><use href="#i-fb"/></svg></button>
        <button class="s-btn" data-copy aria-label="Copy link" title="Copy link"><svg class="ic" aria-hidden="true"><use href="#i-link"/></svg></button>
        <span class="rail-sep"></span>
        <button class="s-btn" id="jumpComments" aria-label="Jump to comments" title="Comments"><svg class="ic" aria-hidden="true"><use href="#i-chat"/></svg></button>
      </div></aside>
      <div class="art-main">
        <figure class="cover"><img src="${img(a.seed, 1400, 700)}" alt=""><figcaption>Cover illustration — The CodSoft Journal</figcaption></figure>
        <div class="art-body">${bodyHTML(a)}</div>
        <div class="art-tags">${a.tags.map(t => `<button class="tag-chip" data-tagsel="${t}"><svg class="ic" aria-hidden="true"><use href="#i-tag"/></svg>#${t}</button>`).join('')}</div>
        <div class="author-box">${avatar(a.author, 54)}<div><h3>${a.author}</h3><small>${a.cat}</small><p>${BIOS[a.author]}</p></div></div>
        <section class="related">
          <div class="sec-head"><svg class="ic sec-star" aria-hidden="true"><use href="#i-star"/></svg><h2 class="sec-title">Keep reading</h2><span class="sec-note">Because you read this</span></div>
          ${rel.map(miniHTML).join('')}
        </section>
        <section class="comments" id="comments">
          <div class="sec-head"><svg class="ic sec-star" aria-hidden="true"><use href="#i-star"/></svg><h2 class="sec-title">Discussion</h2><span class="sec-note" id="cCount"></span></div>
          <form class="cform" id="cForm" novalidate>
            <div class="field" id="fText"><label for="cText">Join the discussion</label><textarea id="cText" maxlength="600" placeholder="Share your experience — what did your first month feel like?"></textarea><span class="f-err">Write at least a few words.</span></div>
            <div class="row">
              <div class="field" id="fName" style="max-width:260px"><label for="cName">Name</label><input id="cName" maxlength="40" placeholder="Your name"><span class="f-err">Please add your name.</span></div>
              <button class="btn-solid" type="submit">Post comment <svg class="ic" aria-hidden="true"><use href="#i-send"/></svg></button>
            </div>
          </form>
          <div id="cList"></div>
          <p class="c-local"><svg class="ic" aria-hidden="true"><use href="#i-link"/></svg>Your comments are stored locally in this browser — no account needed.</p>
        </section>
      </div>
    </div>
  </div>`;
    renderComments(a);
}

/* ================================================================
   routing & views
================================================================ */
function setView(v) {
    state.view = v;
    $('#view-home').hidden = v !== 'home';
    $('#view-article').hidden = v !== 'article';
    $('#progress').style.opacity = v === 'article' ? 1 : 0;
}

function openArticle(a) {
    if (prevView === 'home') state.homeScroll = window.scrollY;
    prevView = 'article';
    renderArticle(a);
    setView('article');
    document.title = a.title + ' — The CodSoft Journal';
    window.scrollTo({ top: 0, behavior: 'auto' });
}

function route() {
    const m = location.hash.match(/^#\/story\/([\w-]+)$/);
    const a = m && ARTICLES.find(x => x.slug === m[1]);
    if (a) { openArticle(a); return; }
    const restore = prevView === 'article';
    prevView = 'home';
    setView('home');
    document.title = BASE_TITLE;
    requestAnimationFrame(() => window.scrollTo({ top: restore ? state.homeScroll : 0, behavior: 'auto' }));
}

function goStory(slug) {
    if (state.view === 'article' && state.article && state.article.slug === slug) return;
    closeSearch(); closeDrawer();
    location.hash = '#/story/' + slug;
}

function scrollToSec(id) {
    if (state.view !== 'home') { setView('home'); prevView = 'home'; document.title = BASE_TITLE; }
    setTimeout(() => { const t = document.getElementById(id); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
}

/* ================================================================
   search
================================================================ */
function openSearch() {
    $('#searchOverlay').classList.add('open');
    document.body.classList.add('lock');
    const inp = $('#searchInput');
    inp.value = ''; sIdx = -1;
    renderSearch('');
    setTimeout(() => inp.focus(), 60);
}
function closeSearch() {
    $('#searchOverlay').classList.remove('open');
    document.body.classList.remove('lock');
}
function hi(text, q) {
    const t = esc(text);
    if (!q) return t;
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return t.replace(re, '<mark>$1</mark>');
}
function renderSearch(q) {
    const box = $('#searchResults');
    q = q.trim();
    if (!q) {
        box.innerHTML = `<div class="s-suggest"><p class="s-label">Jump to a topic</p><div class="s-tags">${POPULAR_TAGS.slice(0, 8).map(t => `<button class="tag-btn" data-tagsel="${t}">#${t}</button>`).join('')}</div></div><p class="s-label">Or start typing — search covers titles, topics, authors and excerpts.</p>`;
        return;
    }
    const ql = q.toLowerCase();
    const res = ARTICLES.filter(a => [a.title, a.ex, a.cat, a.author, a.tags.join(' ')].join(' ').toLowerCase().includes(ql)).slice(0, 8);
    if (!res.length) {
        box.innerHTML = `<div class="s-none"><p>Nothing matched “${esc(q)}”.</p><p>Try “python”, “resume”, “remote” or “interview”.</p></div>`;
        return;
    }
    box.innerHTML = res.map((a, i) => `<button class="s-res" data-story="${a.slug}" data-idx="${i}">
    <span class="s-main"><span class="s-cat">${a.cat} · ${a.author}</span><span class="s-title">${hi(a.title, q)}</span></span>
    <span class="s-date">${fmtDate(a.date)}</span></button>`).join('');
}

/* ================================================================
   filters / theme / misc actions
================================================================ */
function selectCat(c) {
    state.cat = c; state.tag = null;
    renderChips(); renderTags(); renderFeed(true);
    scrollToSec('feed');
}
function applyTag(t) {
    state.tag = state.tag === t ? null : t;
    renderChips(); renderTags(); renderFeed(true);
    scrollToSec('feed');
}
function clearFilters() {
    state.cat = 'All'; state.tag = null;
    renderChips(); renderTags(); renderFeed(true);
}
function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    localStorage.setItem('cs-theme', t);
}
function share(type) {
    const a = state.article; if (!a) return;
    const u = encodeURIComponent(location.href), t = encodeURIComponent(a.title + ' — The CodSoft Journal');
    const map = {
        x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
        li: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
        fb: `https://www.facebook.com/sharer/sharer.php?u=${u}`
    };
    window.open(map[type], '_blank', 'noopener,width=640,height=540');
}
function copyLink() {
    const done = () => toast('Link copied to clipboard', 'link');
    if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done).catch(done);
    else done();
}
function runDemo() {
    const out = $('#demoOut'); if (!out) return;
    out.innerHTML = '';
    const t0 = performance.now();
    const line = m => {
        const d = document.createElement('div');
        d.className = 'out-line';
        d.innerHTML = `<span class="out-t">@ ${(performance.now() - t0).toFixed(1)}ms</span>${esc(m)}`;
        out.append(d);
    };
    line('1 · script starts (synchronous)');
    setTimeout(() => line('4 · setTimeout fires (macrotask)'), 0);
    Promise.resolve().then(() => line('3 · promise runs (microtask)'));
    line('2 · script ends (synchronous)');
    setTimeout(() => {
        const n = document.createElement('div');
        n.className = 'out-note';
        n.textContent = '— microtasks always cut ahead of macrotasks, even at delay 0';
        out.append(n);
    }, 60);
}
function closeDrawer() {
    $('#drawer').classList.remove('open');
    $('#scrim').classList.remove('open');
    document.body.classList.remove('lock');
}

/* ================================================================
   global event delegation
================================================================ */
document.addEventListener('click', e => {
    const t = e.target;
    const cl = s => t.closest(s);

    if (cl('[data-close]') && cl('#searchOverlay')) { closeSearch(); return; }
    if (cl('#searchOpen')) { openSearch(); return; }
    if (cl('#menuBtn')) { $('#drawer').classList.add('open'); $('#scrim').classList.add('open'); document.body.classList.add('lock'); return; }
    if (cl('#menuClose') || cl('#scrim')) { closeDrawer(); return; }
    if (cl('#themeBtn')) { applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); return; }
    if (cl('#toTop')) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (cl('#loadMore')) { state.shown += PER; renderFeed(false); toast('More stories loaded'); return; }
    if (cl('[data-run]')) { runDemo(); return; }
    if (cl('[data-copy]')) { copyLink(); return; }
    if (cl('[data-share]')) { share(cl('[data-share]').dataset.share); return; }

    const sh = cl('[data-story]');
    if (sh) { goStory(sh.dataset.story); return; }

    const cat = cl('[data-cat]');
    if (cat) { closeDrawer(); selectCat(cat.dataset.cat); return; }

    const tag = cl('[data-tag]');
    if (tag) { applyTag(tag.dataset.tag); return; }

    const tsel = cl('[data-tagsel]');
    if (tsel) { closeSearch(); applyTag(tsel.dataset.tagsel); return; }

    if (cl('[data-clear]')) { clearFilters(); return; }
    if (cl('[data-scroll]')) { closeDrawer(); scrollToSec(cl('[data-scroll]').dataset.scroll); return; }
    if (cl('#backHome')) { location.hash = '#/'; return; }
    if (cl('#brandLink')) {
        if (state.view !== 'home') location.hash = '#/';
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    if (cl('#jumpComments')) { const c = $('#comments'); if (c) c.scrollIntoView({ behavior: 'smooth' }); return; }
});

document.addEventListener('submit', e => {
    if (e.target.id === 'nlForm') {
        e.preventDefault();
        const inp = $('#nlEmail'), note = $('#nlNote');
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inp.value.trim());
        if (!ok) { inp.classList.add('err'); note.textContent = 'That doesn’t look like an email — try again.'; note.classList.add('bad'); inp.focus(); return; }
        localStorage.setItem('cs-nl', '1');
        e.target.outerHTML = '<p class="nl-done"><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg>You’re on the list — see you Friday.</p>';
        note.textContent = 'One email a week. No spam, unsubscribe anytime.';
        toast('Subscribed to the weekly dispatch', 'mail');
        return;
    }
    if (e.target.id === 'cForm') {
        e.preventDefault();
        const a = state.article; if (!a) return;
        const name = $('#cName'), text = $('#cText');
        let ok = true;
        $('#fName').classList.toggle('err', !(name.value.trim().length >= 2)); if (name.value.trim().length < 2) ok = false;
        $('#fText').classList.toggle('err', !(text.value.trim().length >= 4)); if (text.value.trim().length < 4) ok = false;
        if (!ok) return;
        let arr = [];
        try { arr = JSON.parse(localStorage.getItem('cs-c-' + a.id) || '[]'); } catch (err) { }
        arr.push({ name: name.value.trim(), text: text.value.trim(), ts: Date.now() });
        localStorage.setItem('cs-c-' + a.id, JSON.stringify(arr));
        e.target.reset();
        renderComments(a);
        toast('Comment posted — thanks for joining in', 'chat');
        const c = $('#comments'); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSearch(); closeDrawer(); return; }
    const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing) { e.preventDefault(); openSearch(); return; }
    if (e.key === 'Enter' && document.activeElement.matches?.('[data-story]')) { goStory(document.activeElement.dataset.story); return; }
    if (document.activeElement === $('#searchInput')) {
        const rows = $$('#searchResults .s-res');
        if (!rows.length) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            sIdx = e.key === 'ArrowDown' ? (sIdx + 1) % rows.length : (sIdx - 1 + rows.length) % rows.length;
            rows.forEach((r, i) => r.classList.toggle('cur', i === sIdx));
            rows[sIdx].scrollIntoView({ block: 'nearest' });
        }
        if (e.key === 'Enter') {
            const r = rows[sIdx] || rows[0];
            if (r) goStory(r.dataset.story);
        }
    }
});

$('#searchInput').addEventListener('input', e => { sIdx = -1; renderSearch(e.target.value); });
window.addEventListener('hashchange', route);

/* ================================================================
   scroll: header state + reading progress
================================================================ */
const headerEl = $('#siteHeader');
window.addEventListener('scroll', () => {
    headerEl.classList.toggle('scrolled', window.scrollY > 8);
    if (state.view === 'article') {
        const h = document.documentElement;
        const p = Math.min(1, window.scrollY / Math.max(1, h.scrollHeight - innerHeight));
        $('#progress').style.width = (p * 100) + '%';
    }
}, { passive: true });

/* ================================================================
   reveal on scroll
================================================================ */
const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));

/* ================================================================
   init
================================================================ */
(function init() {
    const saved = localStorage.getItem('cs-theme');
    const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(dark ? 'dark' : 'light');

    $('#heroDate').textContent = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    $('#heroMeta').textContent = `${ARTICLES.length} stories · ${CATS.length} topics · updated weekly`;
    $('#year').textContent = new Date().getFullYear();

    renderTicker();
    renderFeatured();
    renderChips();
    renderTags();
    renderFeed(true);

    const counts = {};
    ARTICLES.forEach(a => counts[a.cat] = (counts[a.cat] || 0) + 1);
    const catsHtml = ['All', ...CATS].map(c => `<li><button class="ft-link" data-cat="${c}">${c}<span>${c === 'All' ? ARTICLES.length : counts[c] || 0}</span></button></li>`).join('');
    $('#footCats').innerHTML = catsHtml;
    $('#footTags').innerHTML = POPULAR_TAGS.slice(0, 7).map(t => `<li><button class="ft-link" data-tagsel="${t}">#${t}</button></li>`).join('');
    $('#drawerCats').innerHTML = ['All', ...CATS].map(c => `<button class="dcat" data-cat="${c}">${c}<span>${c === 'All' ? ARTICLES.length : counts[c] || 0}</span></button>`).join('');

    if (localStorage.getItem('cs-nl')) {
        const f = $('#nlForm');
        if (f) f.outerHTML = '<p class="nl-done"><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg>You’re on the list — see you Friday.</p>';
    }

    route();
})();
