// amali-gce-data.js
// Data statik Panduan Amali GCE untuk paparan interaktif amali-helper.html.
// Versi V2 menyokong common start steps, dropdown exam/lab, guided steps, dan inline copy blocks.
// Fail ini tidak mengandungi logic UI. Logic render dan clipboard diletakkan dalam amali-gce.js.

window.AMALI_GCE_DATA = {
    meta: {
        title: "Panduan Amali GCE",
        subtitle: "Panduan interaktif langkah demi langkah untuk latihan amali Google Certified Educator Level 1 dan Level 2.",
        source: "Panduan Amali GCE.pdf",
        version: "2.0.0"
    },
    commonStart: {
        title: "Persediaan Awal Semua Lab",
        description: "Langkah ini berulang untuk setiap lab. Selesaikan bahagian ini sekali sebelum meneruskan langkah khusus lab yang dipilih.",
        // ── SURGICAL EDIT START: Suntik URL video panduan untuk Persediaan Awal ──
        videoGuideUrl: "https://drive.google.com/file/d/1mqSPlc3f9Sh-gsySYsiPUe5mjz45sZs2/view?usp=drive_link",
        // ── SURGICAL EDIT END ──
        steps: [
            {
                id: "common-start-1",
                title: "Buka guest profile",
                before: "Buka guest profile baru.",
                copyBlocks: [],
                after: ""
            },
            {
                id: "common-start-2",
                title: "Layari Google",
                before: "Layari Google, kemudian klik Sign in.",
                copyBlocks: [],
                after: ""
            },
            {
                id: "common-start-3",
                title: "Login akaun lab",
                before: "Login guna Google Username dan Google Password yang diberi dalam soalan lab.",
                copyBlocks: [],
                after: ""
            },
            {
                id: "common-start-4",
                title: "Sahkan paparan awal",
                before: "Setelah berjaya login, tekan butang “I understand” jika paparan tersebut muncul.",
                copyBlocks: [],
                after: ""
            }
        ]
    },
    levels: [
        {
            id: "gce-l1",
            title: "GCE Level 1",
            shortTitle: "GCE L1",
            description: "Set latihan amali asas Google Workspace untuk persediaan Google Certified Educator Level 1.",
            labs: [
                {
                    id: "gce-l1-lab-1",
                    title: "Lab 1 - Google Classroom Lab Exam",
                    app: "Google Classroom",
                    summary: "Cipta kelas Geography, tambah tugasan Capital Cities, tetapkan topik dan tarikh akhir, kemudian pos pengumuman.",
                    // ── SURGICAL EDIT START: Suntik URL video panduan untuk GCE L1 Lab 1 ──
                    videoGuideUrl: "https://drive.google.com/file/d/1ge66P_oUEd1EdfXFjLNnXx5jXP66LPC5/view?usp=drive_link",
                    // ── SURGICAL EDIT END ──
                    guidedSteps: [
                        {
                            id: "l1-lab1-step-1",
                            title: "Masuk ke Google Classroom",
                            before: "Selepas sign in, masuk ke Google Classroom.",
                            copyBlocks: [],
                            after: "Klik continue dan pilih peranan “I’m a Teacher”."
                        },
                        {
                            id: "l1-lab1-step-2",
                            title: "Cipta kelas baharu",
                            before: "Klik butang + dan pilih create class. Pada Class name masukkan:",
                            copyBlocks: [
                                {
                                    id: "l1-lab1-class-name",
                                    label: "Class name",
                                    text: "Geography"
                                }
                            ],
                            after: "Tekan Create."
                        },
                        {
                            id: "l1-lab1-step-3",
                            title: "Buka assignment baharu",
                            before: "Klik Classwork > +Create > Assignment.",
                            copyBlocks: [],
                            after: ""
                        },
                        {
                            id: "l1-lab1-step-4",
                            title: "Masukkan tajuk assignment",
                            before: "Pada title masukkan:",
                            copyBlocks: [
                                {
                                    id: "l1-lab1-assignment-title",
                                    label: "Assignment title",
                                    text: "Capital Cities"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l1-lab1-step-5",
                            title: "Masukkan arahan assignment",
                            before: "Pada Instructions masukkan:",
                            copyBlocks: [
                                {
                                    id: "l1-lab1-instructions",
                                    label: "Assignment instructions",
                                    text: "Watch the video and write a short document about the place where you live"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l1-lab1-step-6",
                            title: "Tambah bahan daripada Drive",
                            before: "Klik Drive pada bahagian Attach dan pilih video, kemudian tekan Add.",
                            copyBlocks: [],
                            after: "Klik sekali lagi Drive pada bahagian Attach dan pilih Docs. Tukar File sharing option kepada “Make a copy for each student”."
                        },
                        {
                            id: "l1-lab1-step-7",
                            title: "Cipta topik assignment",
                            before: "Klik pada No Topic, pilih Create topic dan masukkan:",
                            copyBlocks: [
                                {
                                    id: "l1-lab1-topic",
                                    label: "Topic",
                                    text: "Cities"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l1-lab1-step-8",
                            title: "Tetapkan due date",
                            before: "Klik Due dan pilih tarikh hari esok.",
                            copyBlocks: [],
                            after: "Klik OK. Tidak perlu set masa."
                        },
                        {
                            id: "l1-lab1-step-9",
                            title: "Assign tugasan",
                            before: "Klik Assign.",
                            copyBlocks: [],
                            after: ""
                        },
                        {
                            id: "l1-lab1-step-10",
                            title: "Pos pengumuman",
                            before: "Klik pada Stream > New Announcement. Masukkan teks berikut pada ruangan kosong:",
                            copyBlocks: [
                                {
                                    id: "l1-lab1-announcement",
                                    label: "Announcement",
                                    text: "Reminder: The Capital Cities assignment is due tomorrow."
                                }
                            ],
                            after: "Klik Post."
                        },
                        {
                            id: "l1-lab1-step-11",
                            title: "Tamatkan lab",
                            before: "Semak status lab.",
                            copyBlocks: [],
                            after: "Bila cukup 100%, tamatkan Lab 1 dengan klik End Lab."
                        }
                    ]
                },
                {
                    id: "gce-l1-lab-2",
                    title: "Lab 2 - Google Docs and Google Drive Lab Exam",
                    app: "Google Docs / Google Drive",
                    summary: "Cipta folder dan dokumen Supply List, kongsi sebagai Commenter, ubah tetapan share, dan tambah komen tugasan.",
                    // ── SURGICAL EDIT START: Suntik URL video panduan untuk GCE L1 Lab 2 ──
                    videoGuideUrl: "https://drive.google.com/file/d/1l4G_T8QnlDB9BdzuxLICQII1hDZT_fPN/view?usp=drive_link",
                    // ── SURGICAL EDIT END ──
                    guidedSteps: [
                        {
                            id: "l1-lab2-step-1",
                            title: "Masuk ke Google Drive",
                            before: "Selepas sign in, masuk ke Google Drive.",
                            copyBlocks: [],
                            after: ""
                        },
                        {
                            id: "l1-lab2-step-2",
                            title: "Cipta folder baharu",
                            before: "Tekan + New > New folder dan tampal ini sebagai nama folder:",
                            copyBlocks: [
                                {
                                    id: "l1-lab2-folder-name",
                                    label: "Folder name",
                                    text: "Supply List Committee"
                                }
                            ],
                            after: "Klik Create."
                        },
                        {
                            id: "l1-lab2-step-3",
                            title: "Cipta Google Docs",
                            before: "Buka folder, tekan + New > Google Docs > Blank document. Namakan dokumen baharu sebagai:",
                            copyBlocks: [
                                {
                                    id: "l1-lab2-document-name",
                                    label: "Document name",
                                    text: "Supply List"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l1-lab2-step-4",
                            title: "Masukkan isi dokumen",
                            before: "Masukkan teks berikut pada body dokumen:",
                            copyBlocks: [
                                {
                                    id: "l1-lab2-document-body",
                                    label: "Document body",
                                    text: "The supplies needed for the project are the following: tape, scissors, pens, pencils, and paper."
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l1-lab2-step-5",
                            title: "Kongsi kepada Educator 1",
                            before: "Salin emel Educator 1 pada soalan. Tekan Share pada dokumen, masukkan emel yang disalin dan set peranan sebagai Commenter.",
                            copyBlocks: [],
                            after: ""
                        },
                        {
                            id: "l1-lab2-step-6",
                            title: "Ubah tetapan share",
                            before: "Tekan butang gear di atas kanan.",
                            copyBlocks: [],
                            after: "Pada paparan Settings for “Supply List”, kosongkan kotak checkbox Allow editors to change permissions and share dan Commenters and viewers. Kembali ke paparan sebelumnya dan klik Send."
                        },
                        {
                            id: "l1-lab2-step-7",
                            title: "Tambah komen pada pens",
                            before: "Pada teks yang ada, highlight perkataan pens, klik butang Add comment, dan masukkan teks:",
                            copyBlocks: [
                                {
                                    id: "l1-lab2-comment-pens",
                                    label: "Comment for pens",
                                    text: "Get red pens"
                                }
                            ],
                            after: "Klik pada Comment."
                        },
                        {
                            id: "l1-lab2-step-8",
                            title: "Tambah komen pada pencils",
                            before: "Seterusnya pada teks yang ada, highlight perkataan pencils, dan masukkan teks berikut. Nota: gantikan bahagian @(sila semak jadual di soalan) dengan emel/nama yang betul berdasarkan soalan lab:",
                            copyBlocks: [
                                {
                                    id: "l1-lab2-comment-pencils",
                                    label: "Comment for pencils",
                                    text: "@(sila semak jadual di soalan) Buy pencils by Tuesday"
                                }
                            ],
                            after: "Klik pada Comment."
                        },
                        {
                            id: "l1-lab2-step-9",
                            title: "Tamatkan lab",
                            before: "Semak status lab.",
                            copyBlocks: [],
                            after: "Bila cukup 100%, tamatkan Lab 2 dengan klik End Lab."
                        }
                    ]
                },
                {
                    id: "gce-l1-lab-3",
                    title: "Lab 3 - Google Forms and Google Sheets Lab Exam",
                    app: "Google Forms / Google Sheets",
                    summary: "Bina kuiz Our Solar System, tambah imej, soalan, answer key, pautkan ke Sheets, dan kongsi kepada responden serta editor.",
                    // ── SURGICAL EDIT START: Suntik URL video panduan untuk GCE L1 Lab 3 ──
                    videoGuideUrl: "https://drive.google.com/file/d/1VqbWhSQh030wbdi-uPmlO_mGmMTeY4o-/view?usp=drive_link",
                    // ── SURGICAL EDIT END ──
                    guidedSteps: [
                        {
                            id: "l1-lab3-step-1",
                            title: "Buka Google Forms",
                            before: "Selepas sign in, masuk ke Forms.",
                            copyBlocks: [],
                            after: "Klik Blank form."
                        },
                        {
                            id: "l1-lab3-step-2",
                            title: "Masukkan tajuk form",
                            before: "Masukkan teks berikut sebagai tajuk fail:",
                            copyBlocks: [
                                {
                                    id: "l1-lab3-form-title",
                                    label: "Form title",
                                    text: "Our Solar System"
                                }
                            ],
                            after: "Tajuk form akan berubah automatik kepada tajuk yang sama."
                        },
                        {
                            id: "l1-lab3-step-3",
                            title: "Tambah soalan nama murid",
                            before: "Masukkan teks berikut sebagai soalan pertama:",
                            copyBlocks: [
                                {
                                    id: "l1-lab3-question-student-name",
                                    label: "Question",
                                    text: "Student Name"
                                }
                            ],
                            after: "Pastikan jenis soalan Short answer."
                        },
                        {
                            id: "l1-lab3-step-4",
                            title: "Tetapan kuiz",
                            before: "Klik butang Settings. Cari Form defaults.",
                            copyBlocks: [],
                            after: "Ubah Do not collect pada Verified. Hidupkan Make this a quiz. Kemudian kembali ke paparan Questions."
                        },
                        {
                            id: "l1-lab3-step-5",
                            title: "Tambah imej Solar System",
                            before: "Klik butang Add image. Pilih Google Drive dan pilih gambar yang muncul. Tekan Insert. Masukkan teks berikut sebagai Image title:",
                            copyBlocks: [
                                {
                                    id: "l1-lab3-image-title",
                                    label: "Image title",
                                    text: "Solar System"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l1-lab3-step-6",
                            title: "Tambah soalan Mercury",
                            before: "Klik butang Add question. Tukar jenis soalan pada Short answer. Masukkan teks berikut sebagai soalan:",
                            copyBlocks: [
                                {
                                    id: "l1-lab3-question-mercury",
                                    label: "Short answer question",
                                    text: "How many moons does Mercury have?"
                                }
                            ],
                            after: "Klik pada Answer key."
                        },
                        {
                            id: "l1-lab3-step-7",
                            title: "Tetapkan jawapan Mercury",
                            before: "Pada Add a correct answer, masukkan:",
                            copyBlocks: [
                                {
                                    id: "l1-lab3-answer-mercury",
                                    label: "Correct answer",
                                    text: "0"
                                }
                            ],
                            after: "Klik Done."
                        },
                        {
                            id: "l1-lab3-step-8",
                            title: "Tambah soalan planet ketiga",
                            before: "Klik butang Add question. Biarkan pada Multiple choice. Masukkan teks berikut sebagai soalan:",
                            copyBlocks: [
                                {
                                    id: "l1-lab3-question-third-planet",
                                    label: "Multiple choice question",
                                    text: "What is the third planet from the sun?"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l1-lab3-step-9",
                            title: "Masukkan pilihan jawapan planet ketiga",
                            before: "Masukkan pilihan jawapan berikut:",
                            copyBlocks: [
                                {
                                    id: "l1-lab3-third-planet-options",
                                    label: "Multiple choice options",
                                    text: "Mercury\nVenus\nEarth\nMars"
                                }
                            ],
                            after: "Klik pada Answer key. Pilih Earth dan klik Done."
                        },
                        {
                            id: "l1-lab3-step-10",
                            title: "Tambah soalan planet terbesar",
                            before: "Klik butang Add question. Tukar pada Dropdown. Masukkan teks berikut sebagai soalan:",
                            copyBlocks: [
                                {
                                    id: "l1-lab3-question-largest-planet",
                                    label: "Dropdown question",
                                    text: "Which is the largest planet?"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l1-lab3-step-11",
                            title: "Masukkan pilihan planet terbesar",
                            before: "Masukkan pilihan jawapan berikut:",
                            copyBlocks: [
                                {
                                    id: "l1-lab3-largest-planet-options",
                                    label: "Dropdown options",
                                    text: "Jupiter\nSaturn\nUranus\nNeptune"
                                }
                            ],
                            after: "Klik pada Answer key. Pilih Jupiter dan klik Done."
                        },
                        {
                            id: "l1-lab3-step-12",
                            title: "Tambah soalan refleksi",
                            before: "Klik butang Add question. Tukar pada Paragraph. Masukkan teks berikut sebagai soalan:",
                            copyBlocks: [
                                {
                                    id: "l1-lab3-question-favorite-planet",
                                    label: "Paragraph question",
                                    text: "What is your favorite planet and why?"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l1-lab3-step-13",
                            title: "Pautkan responses ke Sheets",
                            before: "Klik pada Responses.",
                            copyBlocks: [],
                            after: "Klik pada Link to Sheets dan klik Create. Tutup paparan Sheet dan kembali pada Form."
                        },
                        {
                            id: "l1-lab3-step-14",
                            title: "Kongsi kepada Student 1",
                            before: "Salin emel Student 1 pada soalan. Klik pada Publish di Form. Pada Responders klik Manage.",
                            copyBlocks: [],
                            after: "Masukkan emel dan biarkan pada Responder. Klik Share. Jangan tutup paparan Share."
                        },
                        {
                            id: "l1-lab3-step-15",
                            title: "Kongsi kepada Teacher 1 dan Teacher 2",
                            before: "Buka soalan, salin emel Teacher 1 dan Teacher 2. Pada paparan Share tekan Manage.",
                            copyBlocks: [],
                            after: "Masukkan kedua-dua emel Teacher tadi. Tukar peranan pada Editor dan klik Send. Klik Publish and notify."
                        },
                        {
                            id: "l1-lab3-step-16",
                            title: "Tamatkan lab",
                            before: "Semak status lab.",
                            copyBlocks: [],
                            after: "Bila cukup 100%, tamatkan Lab 3 dengan klik End Lab."
                        }
                    ]
                }
            ]
        },
        {
            id: "gce-l2",
            title: "GCE Level 2",
            shortTitle: "GCE L2",
            description: "Set latihan amali lanjutan Google Workspace untuk persediaan Google Certified Educator Level 2.",
            labs: [
                {
                    id: "gce-l2-lab-1",
                    title: "Lab 1 - Google Classroom",
                    app: "Google Classroom",
                    summary: "Cipta kelas Flipped Class, jana pautan Meet, pos announcement, jemput pelajar dan guru, serta bina topik, assignment dan material.",
                    // ── SURGICAL EDIT START: Suntik URL video panduan untuk GCE L2 Lab 1 ──
                    videoGuideUrl: "https://drive.google.com/file/d/1v-T-tENdWymkcoMcYlTHYl3dViTGghMd/view?usp=drive_link",
                    // ── SURGICAL EDIT END ──
                    guidedSteps: [
                        {
                            id: "l2-lab1-step-1",
                            title: "Masuk ke Google Classroom",
                            before: "Selepas sign in, masuk ke Google Classroom.",
                            copyBlocks: [],
                            after: "Klik continue dan pilih peranan “I’m a Teacher”."
                        },
                        {
                            id: "l2-lab1-step-2",
                            title: "Cipta kelas Flipped Class",
                            before: "Klik butang + dan pilih create class. Pada Class name masukkan:",
                            copyBlocks: [
                                {
                                    id: "l2-lab1-class-name",
                                    label: "Class name",
                                    text: "Flipped Class"
                                }
                            ],
                            after: "Tekan Create."
                        },
                        {
                            id: "l2-lab1-step-3",
                            title: "Jana pautan Meet",
                            before: "Pada paparan Stream, klik butang Generate link pada kotak Meet.",
                            copyBlocks: [],
                            imageBlocks: [
                                {
                                    id: "l2-lab1-step-3-generate-meet-link-image",
                                    label: "Rujukan Jana Pautan Meet",
                                    alt: "Imej rujukan langkah jana pautan Meet dalam Google Classroom.",
                                    src: "https://drive.google.com/thumbnail?id=1RJfmCPxuhrxi9qXYj8CR6Wa68GBT9xLj&sz=w1600",
                                    caption: "Klik imej untuk besarkan paparan tanpa membuka tab baharu."
                                }
                            ],
                            after: "Pada paparan yang keluar klik butang Save. Klik 3 titik sebelah perkataan Meet dan klik Copy link."
                        },
                        {
                            id: "l2-lab1-step-4",
                            title: "Tambah pautan Meet dalam announcement",
                            before: "Tekan pada New announcement, cari dan klik butang Add link.",
                            copyBlocks: [],
                            imageBlocks: [
                                {
                                    id: "l2-lab1-step-4-add-meet-link-image",
                                    label: "Rujukan Tambah Pautan Meet",
                                    alt: "Imej rujukan langkah tambah pautan Meet dalam announcement Google Classroom.",
                                    src: "https://drive.google.com/thumbnail?id=12Wd7gWCZ81kcogbarA08JFD8NrxjCwEY&sz=w1600",
                                    caption: "Klik imej untuk besarkan paparan tanpa membuka tab baharu."
                                }
                            ],
                            after: "Masukkan pautan Meet tadi dan klik Add link."
                        },
                        {
                            id: "l2-lab1-step-5",
                            title: "Pos announcement kelas",
                            before: "Pada bahagian Announce something to your class, masukkan teks berikut:",
                            copyBlocks: [
                                {
                                    id: "l2-lab1-announcement",
                                    label: "Announcement",
                                    text: "Reminder: You have an upcoming online session.\nArrive on time; Keep mics muted; Raise hands to speak."
                                }
                            ],
                            after: "Klik Post."
                        },
                        {
                            id: "l2-lab1-step-6",
                            title: "Buka senarai emel dalam Drive",
                            before: "Klik butang 9 titik dan buka Google Drive.",
                            copyBlocks: [],
                            after: "Buka fail Sheets: 5th Grade List."
                        },
                        {
                            id: "l2-lab1-step-7",
                            title: "Jemput pelajar",
                            before: "Salin 2 emel Student daripada fail Sheets tadi.",
                            copyBlocks: [],
                            after: "Kembali ke Google Classroom, buka tab People dan klik Invite Students. Masukkan kedua-dua emel dan klik Invite."
                        },
                        {
                            id: "l2-lab1-step-8",
                            title: "Jemput teacher",
                            before: "Kembali semula ke Sheets: 5th Grade List dan salin emel Teacher.",
                            copyBlocks: [],
                            after: "Kembali ke Google Classroom, di tab People, klik Invite Teachers. Masukkan emel dan klik Invite."
                        },
                        {
                            id: "l2-lab1-step-9",
                            title: "Cipta topik Term 1",
                            before: "Buka tab Classwork. Tekan Create, pilih Topic. Masukkan teks:",
                            copyBlocks: [
                                {
                                    id: "l2-lab1-topic-term-1",
                                    label: "Topic",
                                    text: "Term 1"
                                }
                            ],
                            after: "Klik Add topic."
                        },
                        {
                            id: "l2-lab1-step-10",
                            title: "Cipta topik Term 2",
                            before: "Ulang tekan Create, pilih Topic. Masukkan teks:",
                            copyBlocks: [
                                {
                                    id: "l2-lab1-topic-term-2",
                                    label: "Topic",
                                    text: "Term 2"
                                }
                            ],
                            after: "Klik Add topic."
                        },
                        {
                            id: "l2-lab1-step-11",
                            title: "Cipta assignment Unit 1",
                            before: "Klik Create dan pilih Assignment. Pada Title, masukkan teks:",
                            copyBlocks: [
                                {
                                    id: "l2-lab1-assignment-title",
                                    label: "Assignment title",
                                    text: "Unit 1"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab1-step-12",
                            title: "Tetapkan markah dan tarikh",
                            before: "Ubah markah 100 kepada:",
                            copyBlocks: [
                                {
                                    id: "l2-lab1-assignment-points",
                                    label: "Assignment points",
                                    text: "10"
                                }
                            ],
                            after: "Ubah Due kepada tarikh minggu hadapan. Ubah Topic pada Term 1."
                        },
                        {
                            id: "l2-lab1-step-13",
                            title: "Lampirkan Google Slides",
                            before: "Tekan butang Drive pada Attach.",
                            copyBlocks: [],
                            after: "Pilih fail Google Slide: 5th Grade Poetic Devices, dan klik Add. Tekan butang Assign."
                        },
                        {
                            id: "l2-lab1-step-14",
                            title: "Cipta material Unit 1 Readings",
                            before: "Tekan Create, pilih Material. Pada Title masukkan teks:",
                            copyBlocks: [
                                {
                                    id: "l2-lab1-material-title",
                                    label: "Material title",
                                    text: "Unit 1 Readings"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab1-step-15",
                            title: "Lampirkan Google Doc reading list",
                            before: "Tekan butang Drive pada Attach.",
                            copyBlocks: [],
                            after: "Pilih fail Google Doc: 5th Grade Poetry: Unit 1 Reading List, dan klik Add. Tekan butang Post."
                        },
                        {
                            id: "l2-lab1-step-16",
                            title: "Tamatkan lab",
                            before: "Semak status lab.",
                            copyBlocks: [],
                            after: "Bila cukup 100%, tamatkan Lab 1 dengan klik End Lab."
                        }
                    ]
                },
                {
                    id: "gce-l2-lab-2",
                    title: "Lab 2 - Google Calendar",
                    app: "Google Calendar",
                    summary: "Cipta event Community Fair, jemput tetamu, tambah live stream, lokasi, notifikasi email dan lampiran Drive.",
                    // ── SURGICAL EDIT START: Suntik URL video panduan untuk GCE L2 Lab 2 ──
                    videoGuideUrl: "https://drive.google.com/file/d/1pkjUdJiKNCx0rUt-h-23CCmXU1_E8xl5/view?usp=drive_link",
                    // ── SURGICAL EDIT END ──
                    guidedSteps: [
                        {
                            id: "l2-lab2-step-1",
                            title: "Buka Google Calendar",
                            before: "Selepas sign in, masuk ke Google Calendar.",
                            copyBlocks: [],
                            after: "Tekan +Create dan pilih Event. Tekan More options."
                        },
                        {
                            id: "l2-lab2-step-2",
                            title: "Masukkan tajuk event",
                            before: "Pada Add title masukkan teks:",
                            copyBlocks: [
                                {
                                    id: "l2-lab2-event-title",
                                    label: "Event title",
                                    text: "Community Fair"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab2-step-3",
                            title: "Tetapkan tarikh dan masa",
                            before: "Pilih tarikh Jumaat minggu hadapan, dan tetapkan masa pada:",
                            copyBlocks: [
                                {
                                    id: "l2-lab2-event-time",
                                    label: "Event time",
                                    text: "3.00pm"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab2-step-4",
                            title: "Semak Guest permissions",
                            before: "Pastikan pada bahagian Guest permissions semua pilihan berikut tidak ditanda:",
                            copyBlocks: [],
                            imageBlocks: [
                                {
                                    id: "l2-lab2-step-4-guest-permissions-unchecked-image",
                                    label: "Guest Permissions Unchecked",
                                    alt: "Imej rujukan Guest permissions yang tidak ditanda dalam Google Calendar.",
                                    src: "https://drive.google.com/thumbnail?id=1j53FSG3HJDQs2GJDuPd8-y7cjHrhJ25c&sz=w1600",
                                    caption: "Klik imej untuk besarkan paparan tanpa membuka tab baharu."
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab2-step-5",
                            title: "Ambil senarai emel tetamu",
                            before: "Klik butang 9 titik dan buka Google Drive. Buka fail Sheets: Community Fair Invite List.",
                            copyBlocks: [],
                            after: "Salin ketiga-tiga emel pada kolum C."
                        },
                        {
                            id: "l2-lab2-step-6",
                            title: "Tambah guests",
                            before: "Kembali ke paparan Google Calendar.",
                            copyBlocks: [],
                            after: "Masukkan ketiga-tiga emel ke bahagian Add guest dan klik Enter."
                        },
                        {
                            id: "l2-lab2-step-7",
                            title: "Tambah live stream",
                            before: "Klik pada butang View conference details di sebelah pautan Google Meet.",
                            copyBlocks: [],
                            after: "Tekan butang Add live stream."
                        },
                        {
                            id: "l2-lab2-step-8",
                            title: "Masukkan lokasi",
                            before: "Pada bahagian Add location, masukkan teks:",
                            copyBlocks: [
                                {
                                    id: "l2-lab2-location",
                                    label: "Location",
                                    text: "123 Main Street"
                                }
                            ],
                            after: "Nota: jika keluar pilihan lokasi, tidak perlu klik apa-apa."
                        },
                        {
                            id: "l2-lab2-step-9",
                            title: "Tetapkan notification",
                            before: "Tukar Notification mengikut nilai berikut:",
                            copyBlocks: [],
                            imageBlocks: [
                                {
                                    id: "l2-lab2-step-9-notification-setting-image",
                                    label: "Notification Setting",
                                    alt: "Imej rujukan tetapan notification kepada Email 1 hours dalam Google Calendar.",
                                    src: "https://drive.google.com/thumbnail?id=1dhZeVjZ5XrO5AKw4gfal0jZZIxrFoy1R&sz=w1600",
                                    caption: "Klik imej untuk besarkan paparan tanpa membuka tab baharu."
                                }
                            ],
                            after: "Maksudnya: tukar Notification kepada Email, tukar 10 kepada 1, dan tukar minutes kepada hours."
                        },
                        {
                            id: "l2-lab2-step-10",
                            title: "Tambah lampiran Drive",
                            before: "Klik pada butang Add a Google Drive attachment. Pilih fail Google Docs:",
                            copyBlocks: [
                                {
                                    id: "l2-lab2-attachment",
                                    label: "Drive attachment",
                                    text: "Community Fair Agenda"
                                }
                            ],
                            after: "Klik Insert."
                        },
                        {
                            id: "l2-lab2-step-11",
                            title: "Simpan dan hantar jemputan",
                            before: "Tekan butang Save.",
                            copyBlocks: [],
                            after: "Tekan butang Send. Tekan butang Invite all guests. Tekan butang Save anyway."
                        },
                        {
                            id: "l2-lab2-step-12",
                            title: "Tamatkan lab",
                            before: "Semak status lab.",
                            copyBlocks: [],
                            after: "Bila cukup 100%, tamatkan Lab 2 dengan klik End Lab."
                        }
                    ]
                },
                {
                    id: "gce-l2-lab-3",
                    title: "Lab 3 - Google Slides",
                    app: "Google Slides",
                    summary: "Bina presentation Welcome to Our Team, cipta layout Image Placeholder, tambah slide guru, kongsi akses, dan assign comment kepada guru.",
                    // ── SURGICAL EDIT START: Suntik URL video panduan untuk GCE L2 Lab 3 ──
                    videoGuideUrl: "https://drive.google.com/file/d/1wzAwlxdko_VQNLs55J6q3v_0W4JZiXa-/view?usp=drive_link",
                    // ── SURGICAL EDIT END ──
                    guidedSteps: [
                        {
                            id: "l2-lab3-step-1",
                            title: "Buka Google Slides",
                            before: "Selepas sign in, masuk ke Google Slides.",
                            copyBlocks: [],
                            after: "Klik pada Blank presentation."
                        },
                        {
                            id: "l2-lab3-step-2",
                            title: "Namakan presentation",
                            before: "Ubah tajuk fail kepada:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-presentation-title",
                                    label: "Presentation title",
                                    text: "Welcome to Our Team"
                                }
                            ],
                            after: "Pada ruang Click to add title, masukkan teks yang sama."
                        },
                        {
                            id: "l2-lab3-step-3",
                            title: "Tambah imej daripada Drive & Photos",
                            before: "Klik tab Insert, pilih Image, kemudian Drive & Photos.",
                            copyBlocks: [],
                            after: "Klik pada gambar yang muncul untuk menambahnya ke slide."
                        },
                        {
                            id: "l2-lab3-step-4",
                            title: "Buka Edit theme",
                            before: "Klik tab Slide, pilih Edit theme.",
                            copyBlocks: [],
                            after: "Cari dan pilih slide terakhir (Blank). Tekan butang New layout."
                        },
                        {
                            id: "l2-lab3-step-5",
                            title: "Namakan layout baharu",
                            before: "Klik Rename dan masukkan teks:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-layout-name",
                                    label: "Custom layout name",
                                    text: "Image Placeholder"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab3-step-6",
                            title: "Tambah Image placeholder",
                            before: "Klik tab Insert, cari Placeholder, kemudian Image placeholder, dan pilih salah satu dari 3 pilihan yang ada.",
                            copyBlocks: [],
                            imageBlocks: [
                                {
                                    id: "l2-lab3-step-6-image-placeholder-image",
                                    label: "Rujukan Image Placeholder",
                                    alt: "Imej rujukan pilihan Image placeholder dalam Google Slides.",
                                    src: "https://drive.google.com/thumbnail?id=1xosjA6I82ShT5nKi3p1AwhLoSxh93YkO&sz=w1600",
                                    caption: "Klik imej untuk besarkan paparan tanpa membuka tab baharu."
                                }
                            ],
                            after: "Klik mana-mana dalam ruangan slide untuk aktifkan pilihan. Tutup Edit theme."
                        },
                        {
                            id: "l2-lab3-step-7",
                            title: "Cipta slide Teacher 1",
                            before: "Tekan butang New slide. Pada Click to add title masukkan teks:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-teacher-1-title",
                                    label: "Slide title",
                                    text: "Teacher 1"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab3-step-8",
                            title: "Masukkan medan profil guru",
                            before: "Pada Click to add text masukkan teks berikut:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-teacher-profile-fields",
                                    label: "Teacher profile fields",
                                    text: "Name\nRoom #\nOffice Phone Number\nEmail Address\nFavorite Quote"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab3-step-9",
                            title: "Duplicate slide Teacher 2 dan Teacher 3",
                            before: "Duplicate Slide Teacher 1 dan tukar Teacher 1 kepada:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-teacher-2-title",
                                    label: "Slide title",
                                    text: "Teacher 2"
                                }
                            ],
                            after: "Duplicate sekali lagi dan tukar Teacher 2 kepada Teacher 3."
                        },
                        {
                            id: "l2-lab3-step-10",
                            title: "Teks untuk Teacher 3",
                            before: "Gunakan teks berikut untuk slide Teacher 3:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-teacher-3-title",
                                    label: "Slide title",
                                    text: "Teacher 3"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab3-step-11",
                            title: "Kongsi kepada teachers dan leader",
                            before: "Semak pada soalan Lab 3, salin 4 emel iaitu Teacher 1, Teacher 2, Teacher 3 dan Education Leader.",
                            copyBlocks: [],
                            after: "Tekan Share. Masukkan emel Teacher 1, Teacher 2 dan Teacher 3. Set sebagai Editor dan klik Send. Tekan Share semula. Masukkan emel Education Leader. Set sebagai Commenter dan klik Send."
                        },
                        {
                            id: "l2-lab3-step-12",
                            title: "Tambah slide dengan layout Image Placeholder",
                            before: "Tekan butang New slide sekali lagi. Tekan butang Layout.",
                            copyBlocks: [],
                            after: "Klik pilihan layout Image Placeholder yang dicipta tadi."
                        },
                        {
                            id: "l2-lab3-step-13",
                            title: "Cipta slide Schedule",
                            before: "Tekan butang New slide. Tekan butang Layout dan ubah layout slide 6 kepada Title and body. Pada Click to add title, masukkan teks:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-slide-6-title",
                                    label: "Slide 6 title",
                                    text: "Schedule"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab3-step-14",
                            title: "Duplicate kepada Classroom Expectations",
                            before: "Duplicate slide 6 dan tukar Schedule kepada:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-slide-7-title",
                                    label: "Slide 7 title",
                                    text: "Classroom Expectations"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab3-step-15",
                            title: "Duplicate kepada Field Trips",
                            before: "Duplicate slide 7 dan tukar Classroom Expectations kepada:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-slide-8-title",
                                    label: "Slide 8 title",
                                    text: "Field Trips"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab3-step-16",
                            title: "Duplicate kepada Academic Support",
                            before: "Duplicate slide 8 dan tukar Field Trips kepada:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-slide-9-title",
                                    label: "Slide 9 title",
                                    text: "Academic Support"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab3-step-17",
                            title: "Duplicate kepada Important Documents",
                            before: "Duplicate slide 9 dan tukar Academic Support kepada:",
                            copyBlocks: [
                                {
                                    id: "l2-lab3-slide-10-title",
                                    label: "Slide 10 title",
                                    text: "Important Documents"
                                }
                            ],
                            after: ""
                        },
                        {
                            id: "l2-lab3-step-18",
                            title: "Tambah video pada slide akhir",
                            before: "Tekan butang New slide. Pada slide akhir (slide 11), tukar layout pada Blank.",
                            copyBlocks: [],
                            after: "Klik tab Insert dan pilih Video. Pilih Google Drive dan klik pada video yang muncul. Klik Insert. Kemudian klik Share pada paparan yang muncul."
                        },
                        {
                            id: "l2-lab3-step-19",
                            title: "Assign comment kepada Teacher 1",
                            before: "Salin emel Teacher 1. Klik kanan pada slide 6 dan pilih Comment.",
                            copyBlocks: [],
                            imageBlocks: [
                                {
                                    id: "l2-lab3-step-19-assign-comment-teacher-1-image",
                                    label: "Rujukan Assign Comment",
                                    alt: "Imej rujukan assign comment kepada Teacher 1 dalam Google Slides.",
                                    src: "https://drive.google.com/thumbnail?id=1lEuNyOcILtwFQQwYnFMtjaqRueY9lep_&sz=w1600",
                                    caption: "Klik imej untuk besarkan paparan tanpa membuka tab baharu."
                                }
                            ],
                            after: "Pastikan checkbox Assign ditanda dan klik Assign. Ulang perbuatan yang sama di slide 7."
                        },
                        {
                            id: "l2-lab3-step-20",
                            title: "Assign comment kepada Teacher 2",
                            before: "Salin emel Teacher 2. Klik kanan pada slide 8 dan pilih Comment.",
                            copyBlocks: [],
                            after: "Ulang perbuatan sama menggunakan emel Teacher 2. Ulang comment yang sama di slide 9."
                        },
                        {
                            id: "l2-lab3-step-21",
                            title: "Assign comment kepada Teacher 3",
                            before: "Salin emel Teacher 3. Klik kanan pada slide 10 dan pilih Comment.",
                            copyBlocks: [],
                            after: "Ulang perbuatan sama menggunakan emel Teacher 3."
                        },
                        {
                            id: "l2-lab3-step-22",
                            title: "Tamatkan lab",
                            before: "Semak status lab.",
                            copyBlocks: [],
                            after: "Bila cukup 100%, tamatkan Lab 3 dengan klik End Lab."
                        }
                    ]
                }
            ]
        }
    ]
};