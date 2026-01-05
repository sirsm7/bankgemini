// --- DATA SOURCE (Parsed from Source Report) ---
const rawData = [
    { id: 1, category: "NotebookLM", question: "A teacher would like help creating a mind map on a topic, which they have a number of existing resources for. Which tool could they use?", answer: "NotebookLM", note: "NotebookLM direka khusus untuk memproses dan mengaitkan maklumat daripada sumber sedia ada yang dimuat naik." },
    { id: 2, category: "NotebookLM", question: "An English teacher wants to help students with different reading abilities understand a story the teacher has written. After uploading the story to NotebookLM, what is the best way to support all learners?", answer: "Ask NotebookLM to generate multiple summaries of the story, each tailored to a different reading level.", note: "Ini adalah contoh pembezaan (differentiation) yang berkesan menggunakan AI." },
    { id: 3, category: "NotebookLM", question: "When NotebookLM answers a question based on the sources you've uploaded, how does it help you verify the information?", answer: "It provides inline citations that link directly to the relevant passages in your sources.", note: "Ciri ini penting untuk memastikan ketepatan fakta dan mengelakkan halusinasi." },
    { id: 4, category: "NotebookLM", question: "Which of the following data sources can be used in NotebookLM? (Select all which apply)", answer: "Web Pages, Google Docs, Copied Text, PDF", note: "NotebookLM menerima pelbagai format input termasuk slaid dan teks yang disalin." },
    { id: 5, category: "NotebookLM", question: "Audio Overviews in NotebookLM can be downloaded for use outside of the notebook.", answer: "True", note: "Audio Overview boleh dimuat turun sebagai fail audio (WAV/MP3) untuk didengar secara offline." },
    { id: 6, category: "NotebookLM", question: "You can upload an MP3 file to NotebookLM.", answer: "True", note: "NotebookLM kini menyokong input audio untuk dianalisis." },
    { id: 7, category: "NotebookLM", question: "An educator is starting a large research project with dozens of articles and notes. How would NotebookLM be most beneficial in the initial stages?", answer: "By synthesizing information across all uploaded documents to help them find connections and draft an outline.", note: "Kekuatan utama NotebookLM adalah 'grounding' atau mengikat jawapan kepada sumber yang dimuat naik sahaja." },
    { id: 8, category: "NotebookLM", question: "A teacher uploads a one-page article on the lifecycle of a butterfly to NotebookLM. To help their class understand the key terms, what is the most effective use of the tool?", answer: "Ask NotebookLM to 'Generate a list of 5 key vocabulary words from the article and provide their definitions in simple terms'", note: "Menghasilkan bahan bantu mengajar (BBM) khusus daripada sumber tertentu." },
    { id: 9, category: "NotebookLM", question: "An educator wants to get a quick, audible summary of a lengthy research paper they've uploaded to NotebookLM while they are multitasking. Which feature should they use?", answer: "Audio Overview", note: "Menukar teks kompleks kepada perbualan audio yang mudah difahami." },
    { id: 10, category: "Etika & Keselamatan AI", question: "A science teacher integrates Gemini into their lesson planning process by having it generate quiz questions... The teacher then uses these materials directly with students without thoroughly reviewing the AI's output. What risks does this cause?", answer: "The AI-generated content could be written at an inappropriate level for the students (either too simple or too complex).", note: "AI memerlukan 'Human in the Loop' (pengawasan manusia) untuk memastikan kesesuaian konteks." },
    { id: 11, category: "Etika & Keselamatan AI", question: "An English teacher uses Gemini to generate a list of essay topics... The AI provides a list that includes some potentially controversial topics, what should they do?", answer: "Critically review each topic for its age-appropriateness, potential to foster respectful debate, factual neutrality, and any inherent biases.", note: "Guru bertanggungjawab menyaring kandungan sensitif sebelum diberikan kepada pelajar." },
    { id: 12, category: "Etika & Keselamatan AI", question: "A history teacher wants to implement a strategy to help students develop AI literacy... Which strategy would be most effective?", answer: "Engaging students in an activity where they compare and contrast AI-generated summaries... actively identifying discrepancies, biases.", note: "Aktiviti ini mengajar kemahiran berfikir kritis dan literasi AI." },
    { id: 13, category: "Etika & Keselamatan AI", question: "When AI chatbots generate false, nonsensical, or misleading outputs that seem believable, these errors are referred to as what?", answer: "Hallucinations", note: "Istilah teknikal apabila AI mereka-reka fakta dengan yakin." },
    { id: 14, category: "Etika & Keselamatan AI", question: "When an AI system shows a tendency to produce results that are systematically prejudiced due to the data it was trained on, this is known as:", answer: "Bias", note: "Bias berlaku apabila data latihan AI tidak seimbang atau mengandungi prasangka." },
    { id: 15, category: "Etika & Keselamatan AI", question: "Gemini on a Google Workspace for Education account doesn't use your data to train the model.", answer: "True", note: "Google menjamin privasi data untuk akaun pendidikan (Workspace for Education)." },
    { id: 16, category: "Etika & Keselamatan AI", question: "Which of the following would be appropriate content for simple classroom guidelines on the responsible and ethical use of generative AI?", answer: "A guideline requiring students to explicitly cite AI tools when used for brainstorming or drafting.", note: "Ketelusan penggunaan AI adalah asas integriti akademik." },
    { id: 17, category: "Etika & Keselamatan AI", question: "A teacher asks a generative AI to summarize a historical event... implies a specific date is incorrect. What is the best way to handle this situation?", answer: "Treat the incorrect date as a likely hallucination and fact-check the information using reliable, primary sources.", note: "Sentiasa sahkan fakta AI dengan sumber primer." },
    { id: 18, category: "Prompting (Arahan)", question: "What are the four main areas to consider when writing an effective prompt?", answer: "Persona, Task, Context, and Format", note: "Ini adalah kerangka standard untuk menghasilkan prompt yang berkualiti." },
    { id: 19, category: "Prompting (Arahan)", question: "An administrator at a school needs help drafting a job description for a new teaching position. Which approach using Gemini is most likely to streamline this task?", answer: "Enter a prompt in Gemini, acting as an Education HR specialist, requesting a job description... including required skills.", note: "Menggunakan teknik 'Persona' (Education HR Specialist) memberikan hasil yang lebih profesional." },
    { id: 20, category: "Prompting (Arahan)", question: "An educator wants to explore different teaching techniques for differentiation... Which of these Gemini prompts would be most appropriate?", answer: "I am an experienced middle school teacher, help me create a list of strategies to help support me to meet the needs of all of my students in my mixed ability classroom.", note: "Prompt ini lengkap dengan Persona, Konteks, dan Tugasan yang jelas." },
    { id: 21, category: "Ciri Gemini", question: "After generating an output, what does the 'Sources' button in Gemini do?", answer: "Shows the websites used to create the content.", note: "Membantu pengguna melihat dari mana maklumat diambil (jika ia bukan janaan kreatif sepenuhnya)." },
    { id: 22, category: "Ciri Gemini", question: "What does the 'Double Check Response' feature in Gemini allow you to do?", answer: "Explore the data sources for the answer from the web.", note: "Butang 'G' ini akan menyemak silang jawapan AI dengan carian Google untuk mengesahkan fakta." },
    { id: 23, category: "Ciri Gemini", question: "You can create an image using Gemini.", answer: "True", note: "Gemini mempunyai keupayaan penjanaan imej (text-to-image)." },
    { id: 24, category: "Ciri Gemini", question: "Which of the following describes how Create images works within Gemini?", answer: "It generates images from text prompts.", note: "Pengguna menaip deskripsi, dan AI menghasilkan visual." },
    { id: 25, category: "Ciri Gemini", question: "Which of the following tools are available in Gemini?", answer: "Canvas - Create Docs and Apps (Note: Also Create Image)", note: "Canvas adalah antaramuka baru untuk menulis dan mengekod projek yang lebih besar." },
    { id: 26, category: "Ciri Gemini", question: "You can share your Notebooks from NotebookLM with other users in your organisation.", answer: "True", note: "Kolaborasi dibenarkan seperti dalam Google Docs." },
    { id: 27, category: "Ciri Gemini", question: "An educator is using Google Workspace with the Google AI Pro for Education... wants to create a new video for their students based on slides. Which method could be used?", answer: "Open a new Google Vids and select 'Import Slides'", note: "Google Vids (Video) adalah alat baru yang boleh menjana video daripada slaid/dokumen." },
    { id: 28, category: "Ciri Baru (Gems & Deep Research)", question: "Which of the following features is primarily designed to help create multi-page reports?", answer: "Deep Research", note: "Deep Research membolehkan Gemini melakukan carian mendalam dan menyusun laporan panjang, bukan sekadar jawapan ringkas." },
    { id: 29, category: "Ciri Baru (Gems & Deep Research)", question: "Which of the following describes a Gem?", answer: "Gems help you research topics in detail...", note: "Deep Research adalah untuk laporan, Gems adalah untuk persona tersuai (Custom Version)." },
    { id: 30, category: "Ciri Baru (Gems & Deep Research)", question: "You can upload your own files to a Gem.", answer: "True", note: "Gem boleh diberi pengetahuan khusus melalui fail yang dimuat naik." },
    { id: 31, category: "Integrasi Workspace", question: "Which Google tools offer an integration with Gemini?", answer: "Google Docs, Google Drive, Google Slides, Gmail", note: "Gemini diintegrasikan ke dalam ekosistem Workspace." },
    { id: 32, category: "Integrasi Workspace", question: "An educator is using Google Docs with Google AI Pro... allows them to generate new content without leaving Docs.", answer: "True", note: "Ciri 'Help me write' berada terus di dalam Docs." },
    { id: 33, category: "Integrasi Workspace", question: "An educator is using Gmail with Google AI Pro... generate responses to emails without leaving Gmail.", answer: "True", note: "Ciri 'Help me reply' dalam Gmail." },
    { id: 34, category: "Integrasi Workspace", question: "To make it easier to share into Google Classroom you can share a link with students in Classroom to direct them to Gemini's Guided Learning Mode.", answer: "True", note: "Pautan boleh dikongsi terus untuk tugasan pelajar." },
    { id: 35, category: "Konsep Asas AI", question: "What specific type of AI refers to a system which can create new types of content, such as text, images, or video?", answer: "Generative AI", note: "Definisi asas AI Generatif (berbeza dengan AI Analitik)." },
    { id: 36, category: "Strategi Pengajaran", question: "A teacher wants their students to use Guided Learning mode in Gemini... which would be the most suitable method?", answer: "Share a direct Guided Learning link into Google Classroom.", note: "Cara paling efisien untuk memastikan pelajar sampai ke modul yang betul." },
    { id: 37, category: "Strategi Pengajaran", question: "A history teacher has uploaded several primary source documents... wants to find additional related information from the web. Which NotebookLM feature would help?", answer: "The Discover Tool (atau 'Web Sources' integration)", note: "NotebookLM kini membenarkan carian web tambahan selain dokumen yang dimuat naik." },
    { id: 38, category: "NotebookLM", question: "The school's administrative assistant is responsible for organizing the logistics for three different end-of-year field trips... What is the most effective way for them to create a master schedule?", answer: "Ask NotebookLM to 'Create a master timeline in a table format, extracting the departure times, arrival times, and venue contact numbers...'", note: "Teknik pengekstrakan data berstruktur (jadual) daripada dokumen tidak berstruktur adalah kekuatan utama NotebookLM." },
    { id: 39, category: "Canvas & Coding", question: "A science teacher wants to create an interactive activity to help their students understand density. Which of the following approaches would be the best?", answer: "Ask Gemini to create a web-based application with Canvas that allows students to adjust the mass and volume of an object...", note: "Gemini Canvas boleh menulis dan menjalankan kod (HTML/JS) untuk simulasi sains ringkas." },
    { id: 40, category: "Integrasi Workspace", question: "A school administrator would like to create an email newsletter for parents. Which tool(s) could they use?", answer: "Gemini for Education, Google Docs (with Gemini in Google Docs)", note: "Menggunakan Gemini dalam Docs untuk merangka kandungan surat berita." },
    { id: 41, category: "Ciri Gemini", question: "What does the 'Share and Export' button in Gemini allow you to do?", answer: "Export to Docs, Draft in Gmail", note: "Cara pantas memindahkan hasil kerja AI ke dalam aplikasi produktiviti." },
    { id: 42, category: "Guided Learning", question: "Which of these statements best describes Guided Learning in Gemini?", answer: "Guided Learning allows you to dive deeper into a topic, using open-ended questions to create a learning discussion.", note: "Mod ini bersifat 'Socratic', membimbing pelajar berfikir dan bukan sekadar memberi jawapan." },
    { id: 43, category: "Strategi Pengajaran", question: "An educator wants to generate a vocabulary list for their next topic. Which option below would NOT help with this task?", answer: "Use audio overviews in Gemini to create a podcast...", note: "Soalan bentuk negatif. Audio Overview adalah untuk mendengar, bukan untuk menjana senarai kosa kata bertulis." },
    { id: 44, category: "Prompting (Arahan)", question: "A teacher is planning a new unit on renewable energy... How could they use Gemini as a thought partner?", answer: "Enter a prompt in Gemini describing the unit topic and grade level, and ask it to generate lesson ideas and activities", note: "Teknik 'Brainstorming' yang efektif dengan memberikan konteks (topik & gred)." },
    { id: 45, category: "Strategi Pengajaran", question: "An educator is looking for practical strategies to increase student leadership... How can they use Gemini to suggest relevant ideas?", answer: "Ask Gemini to create a list of strategies for student leadership opportunities.", note: "Permintaan langsung untuk idea/strategi." },
    { id: 46, category: "Prompting (Arahan)", question: "A teacher wants to create a unique, imaginative, or thought-provoking poetry prompt...", answer: "Input a prompt in Gemini requesting a unique... poetry prompt, specifying the grade level and desired theme.", note: "Memberi spesifikasi 'tema' dan 'tahap umur' menghasilkan output kreatif yang lebih relevan." },
    { id: 47, category: "Ciri Baru (Gems & Deep Research)", question: "A teacher regularly differentiates lesson plans... How can they use Gemini's 'Gems' feature to save time on this?", answer: "Create a custom 'Gem' in Gemini with pre-set instructions and context for generating lesson plan variations...", note: "Gems adalah untuk menyimpan 'Persona' atau 'Arahan Tetap' bagi tugasan berulang." },
    { id: 48, category: "NotebookLM", question: "An educator has uploaded a collection of articles... They want to explore various ways students could demonstrate their understanding (project formats).", answer: "Use NotebookLM's chat feature to ask it for different potential project formats (like essays, presentations...) based on the content...", note: "Menggunakan AI sebagai rakan pemikir untuk mencadangkan bentuk penilaian." },
    { id: 49, category: "Janaan Imej", question: "The students in class have been completing some creative writing on helpful monsters. You want to generate an image...", answer: "'Create a drawing of a monster who likes to eat...' (pilih prompt yang paling deskriptif)", note: "Prompt imej yang baik memerlukan deskripsi visual yang jelas." },
    { id: 50, category: "Strategi Pengajaran", question: "An educator is looking to adapt some text for use by students with a lower reading level. Which method could they use?", answer: "Start a new chat in Gemini. Paste the text and add a prompt, asking Gemini to reduce the reading level of the text.", note: "Tugas klasik LLM: 'Text Simplification' atau 'Rewriting'." },
    { id: 51, category: "Prompting (Arahan)", question: "To help geometry students overcome common misconceptions about finding the area of triangles... how can an educator best prompt Gemini?", answer: "Act as a highly skilled high school math teacher... provide 3-4 model responses addressing common student errors...", note: "Menggunakan persona pakar (Math Teacher) dan meminta output spesifik (model responses)." },
    { id: 52, category: "Etika & Keselamatan AI", question: "A teacher is concerned a student may have used Generative AI to complete their work. What tools within Google Workspace could they use?", answer: "Use Version History to see the creation process over time.", note: "Version History dalam Docs menunjukkan jika teks ditaip secara manual atau ditampal (paste) sekaligus." },
    { id: 53, category: "Akses Gemini", question: "Which of the following methods can be used to open Gemini for Education? (Select all)", answer: "Gemini Icon in Apps Launcher, gemini.google.com in Omnibox, In Google Drive Select New -> Gemini", note: "Pelbagai cara akses untuk kemudahan pengguna." }
];

// State
let currentView = 'dashboard';
let currentCategoryFilter = 'all';
let flashcardIndex = 0;
let shuffledFlashcards = [];
let flashcardRevealed = false;

// --- INIT & NAVIGATION ---
function init() {
    renderChart();
    renderCategories();
    renderQuestions();
    // Do not auto-setup flashcards until view is switched to save resources,
    // or setup immediately if desired.
}

function switchView(viewName) {
    // Hide all
    ['dashboard', 'study', 'flashcards'].forEach(v => {
        document.getElementById(`view-${v}`).classList.add('hidden');
        document.getElementById(`nav-${v}`).classList.remove('bg-blue-50', 'text-blue-600');
        document.getElementById(`nav-${v}`).classList.add('text-slate-600');
    });

    // Show selected
    document.getElementById(`view-${viewName}`).classList.remove('hidden');
    document.getElementById(`nav-${viewName}`).classList.add('bg-blue-50', 'text-blue-600');
    document.getElementById(`nav-${viewName}`).classList.remove('text-slate-600');
    
    currentView = viewName;
    
    if(viewName === 'flashcards' && shuffledFlashcards.length === 0) {
        setupFlashcards();
    }
}

// --- DASHBOARD CHARTS ---
function renderChart() {
    const ctx = document.getElementById('topicChart').getContext('2d');
    
    // Aggregation
    const categoryCounts = {};
    rawData.forEach(q => {
        const cleanCat = q.category.replace(/\(.*\)/, '').trim(); // Simplify names for chart
        categoryCounts[cleanCat] = (categoryCounts[cleanCat] || 0) + 1;
    });

    const labels = Object.keys(categoryCounts);
    const data = Object.values(categoryCounts);
    
    // Soft Google Colors
    const colors = [
        '#4285F4', '#34A853', '#FBBC05', '#EA4335', 
        '#8AB4F8', '#81C995', '#FDE293', '#F28B82',
        '#C58AF9', '#F6AEA9', '#D2E3FC'
    ];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 }, padding: 15 } },
                tooltip: { 
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${context.raw} soalan`;
                        }
                    },
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', // Slate-900
                    padding: 12,
                    cornerRadius: 8
                }
            },
            layout: { padding: 10 }
        }
    });
}

// --- STUDY LIST LOGIC ---
function renderCategories() {
    const categories = [...new Set(rawData.map(q => q.category))].sort();
    const container = document.getElementById('category-filters');
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm`;
        btn.textContent = cat;
        btn.onclick = () => filterQuestions(cat, btn);
        container.appendChild(btn);
    });
}

function filterQuestions(category, btnElement) {
    currentCategoryFilter = category;
    
    // Update UI buttons
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-slate-800', 'text-white', 'border-transparent');
        b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
    });
    
    if (category === 'all') {
        document.querySelector('button[onclick="filterQuestions(\'all\')"]').classList.add('bg-slate-800', 'text-white', 'border-transparent');
        document.querySelector('button[onclick="filterQuestions(\'all\')"]').classList.remove('bg-white', 'text-slate-600');
    } else if (btnElement) {
        btnElement.classList.add('bg-slate-800', 'text-white', 'border-transparent');
        btnElement.classList.remove('bg-white', 'text-slate-600');
    }

    renderQuestions();
}

function renderQuestions() {
    const list = document.getElementById('questions-list');
    list.innerHTML = '';
    
    const filtered = currentCategoryFilter === 'all' 
        ? rawData 
        : rawData.filter(q => q.category === currentCategoryFilter);

    filtered.forEach(q => {
        const item = document.createElement('div');
        item.className = 'bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300';
        item.innerHTML = `
            <button onclick="toggleAccordion(${q.id})" class="w-full text-left p-5 flex justify-between items-start gap-4 focus:outline-none group">
                <div class="flex-grow">
                    <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 mb-2 border border-slate-200">${q.category}</span>
                    <h3 class="font-medium text-slate-800 text-lg group-hover:text-blue-700 transition-colors">${q.question}</h3>
                </div>
                <span id="icon-${q.id}" class="text-slate-400 text-2xl transform transition-transform duration-300 flex-shrink-0 bg-slate-50 w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-blue-50 group-hover:text-blue-500">+</span>
            </button>
            <div id="content-${q.id}" class="hidden bg-slate-50 border-t border-slate-100 p-5 pl-6 animate-fadeIn">
                <div class="mb-4">
                    <span class="flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Jawapan Betul
                    </span>
                    <p class="text-slate-900 font-semibold pl-6 border-l-2 border-green-200">${q.answer}</p>
                </div>
                <div>
                    <span class="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Nota Pakar
                    </span>
                    <p class="text-slate-600 text-sm mt-1 italic leading-relaxed pl-6 border-l-2 border-blue-200">"${q.note}"</p>
                </div>
            </div>
        `;
        list.appendChild(item);
    });
    
    if (filtered.length === 0) {
        list.innerHTML = '<div class="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300"><p class="text-slate-400">Tiada soalan ditemui dalam kategori ini.</p></div>';
    }
}

function toggleAccordion(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    
    // Simple logic: if hidden, show it. If shown, hide it.
    if (content.classList.contains('hidden')) {
        // Optional: close others? keeping it multi-open for comparison
        content.classList.remove('hidden');
        icon.classList.add('rotate-45');
        icon.innerHTML = '&times;'; // Change to X
        content.classList.add('fade-in');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-45');
        icon.innerHTML = '+';
        content.classList.remove('fade-in');
    }
}

// --- FLASHCARD LOGIC ---
function setupFlashcards() {
    // Shuffle array
    shuffledFlashcards = [...rawData].sort(() => Math.random() - 0.5);
    flashcardIndex = 0;
    document.getElementById('fc-total').textContent = shuffledFlashcards.length;
    loadCard();
}

function loadCard() {
    if (flashcardIndex >= shuffledFlashcards.length) {
        // End of deck
        document.getElementById('fc-question').textContent = "Sesi Tamat! Tahniah!";
        document.getElementById('fc-category').textContent = "SELESAI";
        document.getElementById('fc-controls').classList.add('opacity-0');
        
        // Reset card visually
        const flashcardEl = document.querySelector('.flashcard');
        if (flashcardEl) flashcardEl.classList.remove('flipped');
        flashcardRevealed = false;
        return;
    }

    const card = shuffledFlashcards[flashcardIndex];
    
    // Reset UI
    const flashcardEl = document.querySelector('.flashcard');
    if (flashcardEl) {
        flashcardEl.classList.remove('flipped');
    }
    flashcardRevealed = false;
    document.getElementById('fc-controls').classList.remove('opacity-100');
    document.getElementById('fc-controls').classList.add('opacity-0');

    // Populate Data with slight delay to hide transition
    setTimeout(() => { 
        document.getElementById('fc-category').textContent = card.category;
        document.getElementById('fc-question').textContent = card.question;
        document.getElementById('fc-answer').textContent = card.answer;
        document.getElementById('fc-note').textContent = card.note;
        document.getElementById('fc-counter').textContent = flashcardIndex + 1;
    }, 300); // Wait for card to flip back to front before changing text
}

function flipCard() {
    if (flashcardRevealed) return; // Prevent double flip logic issues
    
    const flashcardEl = document.querySelector('.flashcard');
    if (flashcardEl) {
        flashcardEl.classList.add('flipped');
        flashcardRevealed = true;
        
        // Show controls after flip animation completes
        setTimeout(() => {
            document.getElementById('fc-controls').classList.remove('opacity-0');
            document.getElementById('fc-controls').classList.add('opacity-100');
        }, 600);
    }
}

function nextCard(known, event) {
    event.stopPropagation(); // Prevent card flip click bubbling
    
    // Logic for "I know" vs "Review" could go here (e.g. store in localStorage)
    if (known) {
        // Animation for success?
    }
    
    flashcardIndex++;
    loadCard();
}

// Run Init
window.addEventListener('DOMContentLoaded', init);