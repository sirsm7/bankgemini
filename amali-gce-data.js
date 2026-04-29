// amali-gce-data.js
// Data statik Panduan Amali GCE untuk paparan interaktif amali-helper.html.
// Fail ini tidak mengandungi logic UI. Logic render dan clipboard diletakkan dalam amali-gce.js.

window.AMALI_GCE_DATA = {
    meta: {
        title: "Panduan Amali GCE",
        subtitle: "Panduan interaktif latihan amali Google Certified Educator Level 1 dan Level 2",
        source: "Panduan Amali GCE.pdf",
        version: "1.0.0"
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
                    steps: [
                        "Buka guest profile baru.",
                        "Layari Google, klik Sign in.",
                        "Login guna Google Username dan Google Password diberi.",
                        "Setelah berjaya, tekan butang “I understand”.",
                        "Selepas sign in, masuk ke Google Classroom.",
                        "Klik continue dan pilih peranan “I’m a Teacher”.",
                        "Klik butang + dan pilih create class.",
                        "Pada Class name masukkan teks yang disediakan dalam kotak salin.",
                        "Tekan Create.",
                        "Klik Classwork > +Create > Assignment.",
                        "Pada title masukkan teks yang disediakan dalam kotak salin.",
                        "Pada Instructions masukkan teks yang disediakan dalam kotak salin.",
                        "Klik Drive pada bahagian Attach dan pilih video, kemudian tekan Add.",
                        "Klik sekali lagi Drive pada bahagian Attach dan pilih Docs, kemudian tukar File sharing option kepada “Make a copy for each student”.",
                        "Klik pada No Topic, pilih Create topic dan masukkan teks yang disediakan dalam kotak salin.",
                        "Klik Due dan pilih tarikh hari esok, kemudian klik OK. Tidak perlu set masa.",
                        "Klik Assign.",
                        "Klik pada Stream > New Announcement.",
                        "Masukkan teks pengumuman yang disediakan dalam kotak salin pada ruangan kosong.",
                        "Klik Post.",
                        "Semak, bila cukup 100% tamatkan Lab 1 dengan klik End Lab."
                    ],
                    copyBlocks: [
                        {
                            id: "l1-lab1-class-name",
                            label: "Class Name",
                            text: "Geography"
                        },
                        {
                            id: "l1-lab1-assignment-title",
                            label: "Assignment Title",
                            text: "Capital Cities"
                        },
                        {
                            id: "l1-lab1-instructions",
                            label: "Assignment Instructions",
                            text: "Watch the video and write a short document about the place where you live"
                        },
                        {
                            id: "l1-lab1-topic",
                            label: "Topic",
                            text: "Cities"
                        },
                        {
                            id: "l1-lab1-announcement",
                            label: "Announcement",
                            text: "Reminder: The Capital Cities assignment is due tomorrow."
                        }
                    ]
                },
                {
                    id: "gce-l1-lab-2",
                    title: "Lab 2 - Google Docs and Google Drive Lab Exam",
                    app: "Google Docs / Google Drive",
                    summary: "Cipta folder dan dokumen Supply List, kongsi sebagai Commenter, ubah tetapan share, dan tambah komen tugasan.",
                    steps: [
                        "Buka guest profile baru.",
                        "Layari Google, klik Sign in.",
                        "Login guna Google Username dan Google Password diberi.",
                        "Setelah berjaya, tekan butang “I understand”.",
                        "Selepas sign in, masuk ke Google Drive.",
                        "Tekan + New > New folder dan tampal nama folder yang disediakan dalam kotak salin.",
                        "Klik Create.",
                        "Buka folder, tekan + New > Google Docs > Blank document.",
                        "Namakan dokumen baharu menggunakan teks yang disediakan dalam kotak salin.",
                        "Masukkan teks body dokumen yang disediakan dalam kotak salin.",
                        "Salin emel Educator 1 pada soalan.",
                        "Tekan Share pada dokumen, masukkan emel yang disalin dan set peranan sebagai Commenter.",
                        "Tekan butang gear di atas kanan.",
                        "Pada paparan Settings for “Supply List”, kosongkan kotak checkbox Allow editors to change permissions and share dan Commenters and viewers.",
                        "Kembali ke paparan sebelumnya dan klik Send.",
                        "Pada teks yang ada, highlight perkataan pens, klik pada butang Add comment, dan masukkan komen yang disediakan dalam kotak salin.",
                        "Klik pada Comment.",
                        "Seterusnya pada teks yang ada, highlight perkataan pencils, dan masukkan komen mention yang disediakan dalam kotak salin.",
                        "Klik pada Comment.",
                        "Semak, bila cukup 100% tamatkan Lab 2 dengan klik End Lab."
                    ],
                    copyBlocks: [
                        {
                            id: "l1-lab2-folder-name",
                            label: "Folder Name",
                            text: "Supply List Committee"
                        },
                        {
                            id: "l1-lab2-document-name",
                            label: "Document Name",
                            text: "Supply List"
                        },
                        {
                            id: "l1-lab2-document-body",
                            label: "Document Body",
                            text: "The supplies needed for the project are the following: tape, scissors, pens, pencils, and paper."
                        },
                        {
                            id: "l1-lab2-comment-pens",
                            label: "Comment for “pens”",
                            text: "Get red pens"
                        },
                        {
                            id: "l1-lab2-comment-pencils",
                            label: "Comment for “pencils”",
                            text: "@(sila semak jadual di soalan) Buy pencils by Tuesday"
                        }
                    ]
                },
                {
                    id: "gce-l1-lab-3",
                    title: "Lab 3 - Google Forms and Google Sheets Lab Exam",
                    app: "Google Forms / Google Sheets",
                    summary: "Bina kuiz Our Solar System, tambah imej, soalan, answer key, pautkan ke Sheets, dan kongsi kepada responden serta editor.",
                    steps: [
                        "Buka guest profile baru.",
                        "Layari Google, klik Sign in.",
                        "Login guna Google Username dan Google Password diberi.",
                        "Setelah berjaya, tekan butang “I understand”.",
                        "Selepas sign in, masuk ke Forms.",
                        "Klik Blank form.",
                        "Masukkan teks tajuk fail yang disediakan dalam kotak salin.",
                        "Tajuk form akan berubah automatik kepada tajuk yang sama.",
                        "Masukkan teks soalan pertama yang disediakan dalam kotak salin.",
                        "Pastikan jenis soalan Short answer.",
                        "Klik butang Settings.",
                        "Cari Form defaults.",
                        "Ubah Do not collect pada Verified.",
                        "Hidupkan Make this a quiz.",
                        "Kembali ke paparan Questions.",
                        "Klik butang Add image.",
                        "Pilih Google Drive dan pilih gambar yang muncul.",
                        "Tekan Insert.",
                        "Masukkan teks Image title yang disediakan dalam kotak salin.",
                        "Klik butang Add question.",
                        "Tukar jenis soalan pada Short answer.",
                        "Masukkan teks soalan Mercury yang disediakan dalam kotak salin.",
                        "Klik pada Answer key.",
                        "Masukkan jawapan betul yang disediakan dalam kotak salin pada Add a correct answer.",
                        "Klik Done.",
                        "Klik butang Add question.",
                        "Biarkan pada Multiple choice.",
                        "Masukkan teks soalan planet ketiga yang disediakan dalam kotak salin.",
                        "Masukkan pilihan jawapan Multiple choice yang disediakan dalam kotak salin.",
                        "Klik pada Answer key.",
                        "Pilih Earth dan klik Done.",
                        "Klik butang Add question.",
                        "Tukar pada Dropdown.",
                        "Masukkan teks soalan planet terbesar yang disediakan dalam kotak salin.",
                        "Masukkan pilihan jawapan Dropdown yang disediakan dalam kotak salin.",
                        "Klik pada Answer key.",
                        "Pilih Jupiter dan klik Done.",
                        "Klik butang Add question.",
                        "Tukar pada Paragraph.",
                        "Masukkan teks soalan refleksi yang disediakan dalam kotak salin.",
                        "Klik pada Responses.",
                        "Klik pada Link to Sheets dan klik Create.",
                        "Tutup paparan Sheet dan kembali pada Form.",
                        "Salin emel Student 1 pada soalan.",
                        "Klik pada Publish di Form.",
                        "Pada Responders klik Manage.",
                        "Masukkan emel dan biarkan pada Responder.",
                        "Klik Share.",
                        "Jangan tutup paparan Share.",
                        "Buka soalan, salin emel Teacher 1 dan Teacher 2.",
                        "Pada paparan Share tekan Manage.",
                        "Masukkan kedua-dua emel Teacher tadi.",
                        "Tukar peranan pada Editor dan klik Send.",
                        "Klik Publish and notify.",
                        "Semak, bila cukup 100% tamatkan Lab 3 dengan klik End Lab."
                    ],
                    copyBlocks: [
                        {
                            id: "l1-lab3-form-title",
                            label: "Form Title",
                            text: "Our Solar System"
                        },
                        {
                            id: "l1-lab3-question-student-name",
                            label: "Question 1",
                            text: "Student Name"
                        },
                        {
                            id: "l1-lab3-image-title",
                            label: "Image Title",
                            text: "Solar System"
                        },
                        {
                            id: "l1-lab3-question-mercury",
                            label: "Short Answer Question",
                            text: "How many moons does Mercury have?"
                        },
                        {
                            id: "l1-lab3-answer-mercury",
                            label: "Correct Answer",
                            text: "0"
                        },
                        {
                            id: "l1-lab3-question-third-planet",
                            label: "Multiple Choice Question",
                            text: "What is the third planet from the sun?"
                        },
                        {
                            id: "l1-lab3-third-planet-options",
                            label: "Multiple Choice Options",
                            text: "Mercury\nVenus\nEarth\nMars"
                        },
                        {
                            id: "l1-lab3-question-largest-planet",
                            label: "Dropdown Question",
                            text: "Which is the largest planet?"
                        },
                        {
                            id: "l1-lab3-largest-planet-options",
                            label: "Dropdown Options",
                            text: "Jupiter\nSaturn\nUranus\nNeptune"
                        },
                        {
                            id: "l1-lab3-question-favorite-planet",
                            label: "Paragraph Question",
                            text: "What is your favorite planet and why?"
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
                    steps: [
                        "Buka guest profile baru.",
                        "Layari Google, klik Sign in.",
                        "Login guna Google Username dan Google Password diberi.",
                        "Setelah berjaya, tekan butang “I understand”.",
                        "Selepas sign in, masuk ke Google Classroom.",
                        "Klik continue dan pilih peranan “I’m a Teacher”.",
                        "Klik butang + dan pilih create class.",
                        "Pada Class name masukkan teks yang disediakan dalam kotak salin.",
                        "Tekan Create.",
                        "Pada paparan Stream, klik butang Generate link pada kotak Meet.",
                        "Pada paparan yang keluar, klik butang Save.",
                        "Klik 3 titik sebelah perkataan Meet dan klik Copy link.",
                        "Tekan pada New announcement, cari dan klik butang Add link.",
                        "Masukkan pautan Meet tadi dan klik Add link.",
                        "Pada bahagian Announce something to your class, masukkan teks announcement yang disediakan dalam kotak salin.",
                        "Klik Post.",
                        "Klik butang 9 titik dan buka Google Drive.",
                        "Buka fail Sheets: 5th Grade List.",
                        "Salin 2 emel Student, kembali ke Google Classroom, buka tab People dan klik Invite Students.",
                        "Masukkan kedua-dua emel dan klik Invite.",
                        "Kembali semula ke Sheets: 5th Grade List.",
                        "Salin emel Teacher, kembali ke Google Classroom, di tab People, klik Invite Teachers.",
                        "Masukkan emel dan klik Invite.",
                        "Buka tab Classwork.",
                        "Tekan Create, pilih Topic.",
                        "Masukkan teks topik Term 1 yang disediakan dalam kotak salin.",
                        "Klik Add topic.",
                        "Ulang tekan Create, pilih Topic.",
                        "Masukkan teks topik Term 2 yang disediakan dalam kotak salin.",
                        "Klik Add topic.",
                        "Klik Create dan pilih Assignment.",
                        "Pada Title, masukkan teks assignment yang disediakan dalam kotak salin.",
                        "Ubah markah 100 kepada markah yang disediakan dalam kotak salin.",
                        "Ubah Due kepada tarikh minggu hadapan.",
                        "Ubah Topic pada Term 1.",
                        "Tekan butang Drive pada Attach.",
                        "Pilih fail Google Slide: 5th Grade Poetic Devices, dan klik Add.",
                        "Tekan butang Assign.",
                        "Tekan Create, pilih Material.",
                        "Pada Title masukkan teks material yang disediakan dalam kotak salin.",
                        "Tekan butang Drive pada Attach.",
                        "Pilih fail Google Doc: 5th Grade Poetry: Unit 1 Reading List, dan klik Add.",
                        "Tekan butang Post.",
                        "Semak, bila cukup 100% tamatkan Lab 1 dengan klik End Lab."
                    ],
                    copyBlocks: [
                        {
                            id: "l2-lab1-class-name",
                            label: "Class Name",
                            text: "Flipped Class"
                        },
                        {
                            id: "l2-lab1-announcement",
                            label: "Announcement",
                            text: "Reminder: You have an upcoming online session.\nArrive on time; Keep mics muted; Raise hands to speak."
                        },
                        {
                            id: "l2-lab1-topic-term-1",
                            label: "Topic 1",
                            text: "Term 1"
                        },
                        {
                            id: "l2-lab1-topic-term-2",
                            label: "Topic 2",
                            text: "Term 2"
                        },
                        {
                            id: "l2-lab1-assignment-title",
                            label: "Assignment Title",
                            text: "Unit 1"
                        },
                        {
                            id: "l2-lab1-assignment-points",
                            label: "Assignment Points",
                            text: "10"
                        },
                        {
                            id: "l2-lab1-material-title",
                            label: "Material Title",
                            text: "Unit 1 Readings"
                        }
                    ]
                },
                {
                    id: "gce-l2-lab-2",
                    title: "Lab 2 - Google Calendar",
                    app: "Google Calendar",
                    summary: "Cipta event Community Fair, jemput tetamu, tambah live stream, lokasi, notifikasi email dan lampiran Drive.",
                    steps: [
                        "Buka guest profile baru.",
                        "Layari Google, klik Sign in.",
                        "Login guna Google Username dan Google Password diberi.",
                        "Setelah berjaya, tekan butang “I understand”.",
                        "Selepas sign in, masuk ke Google Calendar.",
                        "Tekan +Create dan pilih Event.",
                        "Tekan More options.",
                        "Pada Add title masukkan teks yang disediakan dalam kotak salin.",
                        "Pilih tarikh Jumaat minggu hadapan, dan tetapkan masa pada 3.00pm.",
                        "Pastikan pada bahagian Guest permissions semua pilihan berikut tidak ditanda: Modify event, Invite others, See guest list.",
                        "Klik butang 9 titik dan buka Google Drive.",
                        "Buka fail Sheets: Community Fair Invite List.",
                        "Salin ketiga-tiga emel pada kolum C.",
                        "Kembali ke paparan Google Calendar, masukkan ketiga-tiga emel ke bahagian Add guest dan klik Enter.",
                        "Klik pada butang View conference details di sebelah pautan Google Meet.",
                        "Tekan butang Add live stream.",
                        "Pada bahagian Add location, masukkan teks lokasi yang disediakan dalam kotak salin.",
                        "Nota: jika keluar pilihan lokasi, tidak perlu klik apa-apa.",
                        "Tukar Notification pada Email.",
                        "Tukar 10 pada 1.",
                        "Tukar minutes pada hours.",
                        "Klik pada butang Add a Google Drive attachment.",
                        "Pilih fail Google Docs: Community Fair Agenda, dan klik Insert.",
                        "Tekan butang Save.",
                        "Tekan butang Send.",
                        "Tekan butang Invite all guests.",
                        "Tekan butang Save anyway.",
                        "Semak, bila cukup 100% tamatkan Lab 2 dengan klik End Lab."
                    ],
                    copyBlocks: [
                        {
                            id: "l2-lab2-event-title",
                            label: "Event Title",
                            text: "Community Fair"
                        },
                        {
                            id: "l2-lab2-event-time",
                            label: "Event Time",
                            text: "3.00pm"
                        },
                        {
                            id: "l2-lab2-location",
                            label: "Location",
                            text: "123 Main Street"
                        },
                        {
                            id: "l2-lab2-notification",
                            label: "Notification Setting",
                            text: "Email\n1\nhours"
                        },
                        {
                            id: "l2-lab2-attachment",
                            label: "Drive Attachment",
                            text: "Community Fair Agenda"
                        }
                    ]
                },
                {
                    id: "gce-l2-lab-3",
                    title: "Lab 3 - Google Slides",
                    app: "Google Slides",
                    summary: "Bina presentation Welcome to Our Team, cipta layout Image Placeholder, tambah slide guru, kongsi akses, dan assign comment kepada guru.",
                    steps: [
                        "Buka guest profile baru.",
                        "Layari Google, klik Sign in.",
                        "Login guna Google Username dan Google Password diberi.",
                        "Setelah berjaya, tekan butang “I understand”.",
                        "Selepas sign in, masuk ke Google Slides.",
                        "Klik pada Blank presentation.",
                        "Ubah tajuk fail kepada teks yang disediakan dalam kotak salin.",
                        "Pada ruang Click to add title, masukkan teks yang sama seperti tajuk fail.",
                        "Klik tab Insert, pilih Image, kemudian Drive & Photos.",
                        "Klik pada gambar yang muncul untuk menambahnya ke slide.",
                        "Klik tab Slide, pilih Edit theme.",
                        "Cari dan pilih slide terakhir (Blank).",
                        "Tekan butang New layout.",
                        "Klik Rename dan masukkan teks layout yang disediakan dalam kotak salin.",
                        "Klik tab Insert, cari Placeholder, kemudian Image placeholder, dan pilih salah satu dari 3 pilihan yang ada.",
                        "Klik mana-mana dalam ruangan slide untuk aktifkan pilihan.",
                        "Tutup Edit theme.",
                        "Tekan butang New slide.",
                        "Pada Click to add title masukkan teks Teacher 1 yang disediakan dalam kotak salin.",
                        "Pada Click to add text masukkan teks profil guru yang disediakan dalam kotak salin.",
                        "Duplicate slide ini dan tukar Teacher 1 kepada Teacher 2.",
                        "Duplicate sekali lagi dan tukar Teacher 2 kepada Teacher 3.",
                        "Semak pada soalan Lab 3, salin 4 emel iaitu Teacher 1, Teacher 2, Teacher 3 dan Education Leader.",
                        "Tekan butang Share.",
                        "Masukkan emel Teacher 1, Teacher 2 dan Teacher 3.",
                        "Set sebagai Editor dan klik Send.",
                        "Tekan butang Share semula.",
                        "Masukkan emel Education Leader.",
                        "Set sebagai Commenter dan klik Send.",
                        "Tekan butang New slide sekali lagi.",
                        "Tekan butang Layout.",
                        "Klik pilihan layout Image Placeholder yang dicipta tadi.",
                        "Tekan butang New slide.",
                        "Tekan butang Layout.",
                        "Ubah layout slide 6 kepada Title and body.",
                        "Pada Click to add title, masukkan teks Schedule untuk slide 6.",
                        "Duplicate slide 6 dan tukar Schedule kepada Classroom Expectations.",
                        "Duplicate slide 7 dan tukar Classroom Expectations kepada Field Trips.",
                        "Duplicate slide 8 dan tukar Field Trips kepada Academic Support.",
                        "Duplicate slide 9 dan tukar Academic Support kepada Important Documents.",
                        "Tekan butang New slide.",
                        "Pada slide akhir (slide 11), tukar layout pada Blank.",
                        "Klik tab Insert dan pilih Video.",
                        "Pilih Google Drive dan klik pada video yang muncul.",
                        "Klik Insert.",
                        "Kemudian klik Share pada paparan yang muncul.",
                        "Salin emel Teacher 1.",
                        "Klik kanan pada slide 6 dan pilih Comment.",
                        "Pastikan checkbox Assign ditanda dan klik Assign.",
                        "Ulang perbuatan yang sama di slide 7.",
                        "Salin emel Teacher 2.",
                        "Klik kanan pada slide 8 dan pilih Comment.",
                        "Ulang perbuatan sama menggunakan emel Teacher 2.",
                        "Ulang comment yang sama di slide 9.",
                        "Salin emel Teacher 3.",
                        "Klik kanan pada slide 10 dan pilih Comment.",
                        "Ulang perbuatan sama menggunakan emel Teacher 3.",
                        "Semak, bila cukup 100% tamatkan Lab 3 dengan klik End Lab."
                    ],
                    copyBlocks: [
                        {
                            id: "l2-lab3-presentation-title",
                            label: "Presentation Title",
                            text: "Welcome to Our Team"
                        },
                        {
                            id: "l2-lab3-layout-name",
                            label: "Custom Layout Name",
                            text: "Image Placeholder"
                        },
                        {
                            id: "l2-lab3-teacher-1-title",
                            label: "Slide Title",
                            text: "Teacher 1"
                        },
                        {
                            id: "l2-lab3-teacher-profile-fields",
                            label: "Teacher Profile Fields",
                            text: "Name\nRoom #\nOffice Phone Number\nEmail Address\nFavorite Quote"
                        },
                        {
                            id: "l2-lab3-teacher-2-title",
                            label: "Slide Title",
                            text: "Teacher 2"
                        },
                        {
                            id: "l2-lab3-teacher-3-title",
                            label: "Slide Title",
                            text: "Teacher 3"
                        },
                        {
                            id: "l2-lab3-slide-6-title",
                            label: "Slide 6 Title",
                            text: "Schedule"
                        },
                        {
                            id: "l2-lab3-slide-7-title",
                            label: "Slide 7 Title",
                            text: "Classroom Expectations"
                        },
                        {
                            id: "l2-lab3-slide-8-title",
                            label: "Slide 8 Title",
                            text: "Field Trips"
                        },
                        {
                            id: "l2-lab3-slide-9-title",
                            label: "Slide 9 Title",
                            text: "Academic Support"
                        },
                        {
                            id: "l2-lab3-slide-10-title",
                            label: "Slide 10 Title",
                            text: "Important Documents"
                        }
                    ]
                }
            ]
        }
    ]
};