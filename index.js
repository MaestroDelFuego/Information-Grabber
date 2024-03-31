const axios = require('axios');
const fs = require('fs');

const startTime = Date.now();


const topics = [
    "physics", "history", "geography", "literature", "technology", 
    "biology", "philosophy", "art", "music", "politics", 
    "mathematics", "astronomy", "chemistry", "economics", "psychology",
    "sociology", "anthropology", "linguistics", "medicine", "environment",
    "architecture", "engineering", "business", "nutrition", "sports",
    "computer science", "education", "law", "fashion", "film",
    "religion", "mythology", "cryptocurrency", "space exploration",
    "nutrition", "health", "fitness", "cooking", "travel",
    "wildlife", "agriculture", "climate change", "energy", "gaming",
    "entertainment", "social media", "history of art", "robotics",
    "virtual reality", "augmented reality", "blockchain", "internet",
    "cybersecurity", "data science", "machine learning", "virtual currency",
    "philanthropy", "diplomacy", "geopolitics", "sustainability",
    "renewable energy", "neuroscience", "bioinformatics", "nanotechnology",
    "urban planning", "transportation", "space technology", "oceanography",
    "ancient civilizations", "folklore", "urban legends", "urban myths",
    "zoology", "botany", "ecology", "meteorology",
    "paleontology", "ornithology", "marine biology", "entomology",
    "genetics", "behavioral science", "criminology", "forensic science",
    "political science", "demography", "archaeology", "cultural studies",
    "ethics", "epistemology", "ontology",
    "aesthetics", "logic", "rhetoric", "sociolinguistics", "psychoanalysis",
    "albert einstein", "marie curie", "leonardo da vinci", "isaac newton", "charles darwin",
    "socrates", "plato", "aristotle", "confucius", "galileo galilei",
    "william shakespeare", "michelangelo", "vincent van gogh", "picasso", "mozart",
    "beethoven", "bach", "johannes kepler", "sigmund freud", "friedrich nietzsche",
    "karl marx", "adam smith", "voltaire", "rene descartes", "immanuel kant",
    "emily dickinson", "mark twain", "ernest hemingway", "charles dickens", "jane austen",
    "george orwell", "leo tolstoy", "franz kafka", "f scott fitzgerald", "vladimir nabokov",
    "stephen hawking", "richard feynman", "neil degrasse tyson", "carl sagan", "stephen jay gould",
    "noam chomsky", "terry pratchett", "neil gaiman", "jrr tolkien", "cs lewis",
    "albert camus", "william faulkner", "ernest hemingway", "toni morrison", "gabriel garcia marquez",
    "kurt vonnegut", "george bernard shaw", "maya angelou", "harper lee", "oscar wilde",
    "walt whitman", "victor hugo", "margaret atwood", "james joyce", "agatha christie",
    "herman melville", "vonnegut", "dostoevsky", "proust",
    "homer", "dante", "virgil", "chaucer", "moliere",
    "goethe", "dickens", "hugo", "chekhov", "ibsen",
    "raymond chandler", "saramago", "poe", "asimov",
    "bradbury", "heinlein", "douglas adams", "neuromancer",
    "hitchhiker's guide", "verne", "burroughs", "wells",
    "lem", "philip k dick", "king", "herbert",
    "rowling", "carroll", "pd james", "michael crichton",
    "stephen king", "george rr martin", "jk rowling", "cs lewis",
    "tolkien", "lewis carroll", "isaac asimov",    "Albert Einstein", "Marie Curie", "Stephen Hawking", "Jane Goodall", 
    "Neil deGrasse Tyson", "Richard Feynman", "Carl Sagan", "Ada Lovelace", 
    "Alan Turing", "Nikola Tesla", "Isaac Newton", "Galileo Galilei", 
    "Charles Darwin", "Max Planck", "Erwin Schrödinger", "Louis Pasteur", 
    "James Clerk Maxwell", "Rosalia Franklin", "Edwin Hubble", "Enrico Fermi", 
    
    // Inventors and Innovators
    "Thomas Edison", "Steve Jobs", "Elon Musk", "Bill Gates", 
    "Tim Berners-Lee", "Jeff Bezos", "Mark Zuckerberg", "Walt Disney",
    "Alexander Graham Bell", "Guglielmo Marconi", "Leonardo da Vinci", "Henry Ford",
    
    // Leaders and Politicians
    "Nelson Mandela", "Mahatma Gandhi", "Martin Luther King Jr.", "Barack Obama", 
    "Winston Churchill", "Margaret Thatcher", "Angela Merkel", "Emmeline Pankhurst",
    "Abraham Lincoln", "Franklin D. Roosevelt", "Winston Churchill", "Vladimir Putin",
    "Xi Jinping", "Kim Jong-un", "Donald Trump", "Joe Biden",
    
    // Writers and Authors
    "William Shakespeare", "Jane Austen", "George Orwell", "J.K. Rowling", 
    "Maya Angelou", "Harper Lee", "Gabriel García Márquez", "Agatha Christie",
    "Fyodor Dostoevsky", "Leo Tolstoy", "Ernest Hemingway", "Virginia Woolf",
    "Mark Twain", "J.R.R. Tolkien", "C.S. Lewis", "Homer",
    
    // Artists and Musicians
    "Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Ludwig van Beethoven", 
    "Frida Kahlo", "David Bowie", "Michael Jackson", "Beyoncé",
    "Mozart", "Beethoven", "Elvis Presley", "The Beatles",
    
    // Entertainers
    "Charlie Chaplin", "Marilyn Monroe", "Audrey Hepburn", "Elvis Presley", 
    "Oprah Winfrey", "Ellen DeGeneres", "Tom Hanks", "Johnny Depp",
    "Denzel Washington", "Meryl Streep", "Robert De Niro", "Angelina Jolie",
    
    // Athletes
    "Muhammad Ali", "Serena Williams", "Cristiano Ronaldo", "Usain Bolt", 
    "Michael Jordan", "LeBron James", "Simone Biles", "Pelé",
    "Roger Federer", "Tiger Woods", "Usain Bolt", "Michael Phelps",
    
    // Activists and Humanitarians
    "Malala Yousafzai", "Rosa Parks", "Harriet Tubman", "Susan B. Anthony", 
    "Desmond Tutu", "Cesar Chavez", "Emma Watson", "Princess Diana",
    "Greta Thunberg", "Ellen Johnson Sirleaf", "Aung San Suu Kyi", "Oscar Romero",
    
    // Entrepreneurs and Business Leaders
    "Henry Ford", "Andrew Carnegie", "Warren Buffett", "Richard Branson", 
    "Oprah Winfrey", "Mark Cuban", "Indra Nooyi", "Larry Page",
    "Elon Musk", "Jack Ma", "Satya Nadella", "Jeff Bezos",
    
    // Film Directors and Producers
    "Steven Spielberg", "Alfred Hitchcock", "Stanley Kubrick", "Martin Scorsese", 
    "Quentin Tarantino", "Christopher Nolan", "James Cameron", "Spike Lee",
    "George Lucas", "Francis Ford Coppola", "Peter Jackson", "Hayao Miyazaki",
    
    // Innovators in Technology
    "Steve Jobs", "Elon Musk", "Bill Gates", "Tim Berners-Lee", 
    "Jeff Bezos", "Mark Zuckerberg", "Larry Page", "Sergey Brin",
    "Linus Torvalds", "Guido van Rossum", "Richard Stallman", "Bram Cohen",
    
    // Nobel Laureates
    "Malala Yousafzai", "Albert Schweitzer", "Desmond Tutu", "Mother Teresa", 
    "Martin Luther King Jr.", "Nelson Mandela", "Elie Wiesel", "Jody Williams",
    "Marie Curie", "Kofi Annan", "Wangari Maathai", "Aung San Suu Kyi",
    
    // Notable Figures in Recent History (last 60 years)
    "John F. Kennedy", "Ronald Reagan", "Margaret Thatcher", "Princess Diana", 
    "Pope John Paul II", "Bill Clinton", "George W. Bush", "Barack Obama",
    "Donald Trump", "Vladimir Putin", "Angela Merkel", "Nelson Mandela",
    "Aung San Suu Kyi", "Dalai Lama", "Kofi Annan", "Benazir Bhutto",
    "Yasser Arafat", "Tony Blair", "Deng Xiaoping", "Kim Jong-il",
    "Kim Jong-un", "Kim Il-sung", "Xi Jinping", "Emperor Akihito",
    "Elizabeth II", "Pope Francis", "Theresa May", "Emmanuel Macron",
    "Justin Trudeau", "Jacinda Ardern", "Narendra Modi", "Joko Widodo",
    "Lee Kuan Yew", "Mahathir Mohamad", "Dilma Rousseff", "Luiz Inácio Lula da Silva",
    "Nelson Mandela", "Desmond Tutu", "Robert Mugabe", "Muammar Gaddafi",
    "Benjamin Netanyahu", "Ehud Barak", "Shimon Peres", "Ariel Sharon",
    "Yitzhak Rabin", "Ehud Olmert", "Golda Meir", "Menachem Begin",
    "David Ben-Gurion", "Yasser Arafat", "Mahmoud Abbas", "Hosni Mubarak",
    "Anwar Sadat", "Gamal Abdel Nasser", "Abdel Fattah el-Sisi", "Hafez al-Assad",
    "Bashar al-Assad", "King Abdullah II", "King Hussein", "Muhammad bin Salman",
    "Mohammed bin Rashid Al Maktoum", "Sheikh Hasina", "Khaleda Zia", "Pervez Musharraf",
    "Imran Khan", "Recep Tayyip Erdoğan", "Ahmet Davutoğlu", "Binali Yıldırım",
    "İsmet İnönü", "Mustafa Kemal Atatürk", "Abdel Fattah al-Sisi", "Muhammad Morsi",
    "Abdullah Öcalan", "Aung San Suu Kyi", "Than Shwe", "Win Myint",
    "Thakin Soe", "Ne Win", "Tin Oo", "Thein Sein",
    "Saddam Hussein", "Tariq Aziz", "Saddam Kamel", "Ali Hassan al-Majid",
    "Qusay Hussein", "Uday Hussein", "Muammar Gaddafi", "Abu Bakr al-Baghdadi",
    "Abdul Salam Arif", "Abdul Rahman Arif", "Adnan al-Dulaimi", "Rafic Hariri",
    "Saad Hariri", "Michel Aoun", "Hassan Nasrallah", "Fouad Siniora",
    "Émile Lahoud", "Nabih Berri", "Walid Jumblatt", "Bashir Gemayel",
    "Amin Gemayel", "Rene Mouawad", "Elias Hrawi", "Elias al-Murr",
    "Najib Mikati", "Najib Razak", "Mahathir Mohamad", "Abdullah Ahmad Badawi",
    "Ahmed Yassin", "Abdel Aziz al-Rantisi", "Mahmoud Abbas", "Yasser Arafat",
    "Ismail Haniyeh", "Khaled Mashal", "Salah Shehade", "Abdel Fattah el-Sisi",
    "Mohamed Morsi", "Hosni Mubarak", "Anwar Sadat", "Gamal Abdel Nasser",
    "King Abdullah", "King Hussein", "Queen Rania", "Benjamin Netanyahu",
    "Shimon Peres", "Ehud Barak", "Ariel Sharon", "Ehud Olmert",
    "Golda Meir", "Yitzhak Rabin", "Menachem Begin", "David Ben-Gurion",
    "Abdullah II", "Hafez al-Assad", "Bashar al-Assad", "Mahmoud Ahmadinejad",
    "Hassan Rouhani", "Ali Khamenei", "Mohammad Khatami", "Ali Larijani",
    "Akbar Hashemi Rafsanjani", "Mir-Hossein Mousavi", "Ayatollah Khomeini",
    "Ayatollah Khamenei", "Saddam Hussein", "Uday Hussein", "Qusay Hussein",
    "Muhammad al-Badr", "Mohammed bin Salman", "Abdullah of Saudi Arabia",
    "Faisal of Saudi Arabia", "Ibn Saud", "Mohammad bin Salman", "King Abdullah",
    "Nasser al-Mohammed al-Ahmed al-Sabah", "Jaber al-Ahmad al-Sabah", "Sabah al-Ahmad al-Jaber al-Sabah",
    "Fahad al-Ahmed al-Jaber al-Sabah", "Khaled al-Attiyah"
];

const fetchData = async (topic) => {    try {
    const existingData = fs.readFileSync('general_knowledge.json', 'utf8');
    const existingTopics = JSON.parse(existingData);
    if (existingTopics.hasOwnProperty(topic)) {
        console.log(`\x1b[33mData already exists for ${topic}\x1b[0m`);
        return {
            topic,
            summary: existingTopics[topic]
        };
    }
} catch (error) {
    console.error(`Error reading JSON file: ${error.message}`);
}

try {
    const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`);
    console.log(`\x1b[32mData found for ${topic}\x1b[0m`);
    return {
        topic,
        summary: response.data.extract
    };
} catch (error) {
    console.error(`\x1b[31mError fetching data for ${topic}: ${error.message}\x1b[0m`);
    return {
        topic,
        summary: "Data not available"
    };
}
};

const fetchAllData = async () => {
    const responses = await Promise.all(topics.map(topic => fetchData(topic)));
    const responseData = {};
    responses.forEach(response => {
        responseData[response.topic] = response.summary;
    });
    return responseData;
};

fetchAllData().then(data => {
    fs.writeFileSync('general_knowledge.json', JSON.stringify(data, null, 4));
    console.log('\x1b[36mData saved to general_knowledge.json\x1b[0m');
    const elapsedTime = Date.now() - startTime;
    console.log(`Time taken: ${elapsedTime} milliseconds`);

    // Count lines in this file
    const countLines = (filePath) => {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const lines = data.split('\n');
            return lines.length;
        } catch (err) {
            console.error('Error reading file:', err);
            return 0;
        }
    };
    
    const filePath = "./general_knowledge.json"; // Using __filename to refer to this file
    const numLines = countLines(filePath);
    console.log(`Number of lines in general_knowledge.json: ${numLines}`);
}).catch(error => {
    console.error('An error occurred:', error);
});
