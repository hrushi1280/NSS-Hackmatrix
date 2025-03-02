import { Lesson, Quiz, User, Match, Leaderboard } from '../types';

export const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  credits: 750,
  level: 4,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
  completedLessons: ['lesson1', 'lesson2', 'lesson3'],
  completedQuizzes: ['quiz1', 'quiz2']
};

export const lessons: Lesson[] = [
  {
    id: 'lesson1',
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations.',
    category: 'Mathematics',
    content: `
      <h2>What is Algebra?</h2>
      <p>Algebra is a branch of mathematics dealing with symbols and the rules for manipulating these symbols. In elementary algebra, those symbols represent quantities without fixed values, known as variables.</p>
      
      <h2>Basic Algebraic Expressions</h2>
      <p>An algebraic expression is a combination of variables, numbers, and operations. Examples include:</p>
      <ul>
        <li>2x + 3</li>
        <li>a² - b²</li>
        <li>3(x + y)</li>
      </ul>
      
      <h2>Solving Simple Equations</h2>
      <p>To solve an equation like x + 5 = 12, we isolate the variable:</p>
      <p>x + 5 = 12</p>
      <p>x = 12 - 5</p>
      <p>x = 7</p>
    `,
    duration: 30,
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lesson2',
    title: 'Cell Biology Fundamentals',
    description: 'Explore the basic structure and function of cells.',
    category: 'Biology',
    content: `
      <h2>What are Cells?</h2>
      <p>Cells are the basic structural and functional units of all living organisms. They are often called the "building blocks of life".</p>
      
      <h2>Cell Structure</h2>
      <p>A typical cell contains:</p>
      <ul>
        <li><strong>Cell Membrane:</strong> Controls what enters and exits the cell</li>
        <li><strong>Cytoplasm:</strong> Gel-like substance where cellular components are suspended</li>
        <li><strong>Nucleus:</strong> Contains the cell's genetic material</li>
        <li><strong>Mitochondria:</strong> Produces energy for the cell</li>
        <li><strong>Ribosomes:</strong> Responsible for protein synthesis</li>
      </ul>
      
      <h2>Types of Cells</h2>
      <p>There are two main types of cells:</p>
      <ol>
        <li><strong>Prokaryotic cells:</strong> Simple cells without a nucleus (e.g., bacteria)</li>
        <li><strong>Eukaryotic cells:</strong> Complex cells with a nucleus (e.g., plant and animal cells)</li>
      </ol>
    `,
    duration: 45,
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lesson3',
    title: 'World War II Overview',
    description: 'A comprehensive look at the causes, events, and aftermath of WWII.',
    category: 'History',
    content: `
      <h2>Causes of World War II</h2>
      <p>Several factors contributed to the outbreak of World War II:</p>
      <ul>
        <li>The harsh terms of the Treaty of Versailles</li>
        <li>The Great Depression</li>
        <li>The rise of fascism in Europe</li>
        <li>Failure of appeasement policies</li>
      </ul>
      
      <h2>Major Events</h2>
      <p>Key events during the war included:</p>
      <ul>
        <li><strong>1939:</strong> German invasion of Poland</li>
        <li><strong>1941:</strong> Attack on Pearl Harbor</li>
        <li><strong>1942-1943:</strong> Battle of Stalingrad</li>
        <li><strong>1944:</strong> D-Day invasion</li>
        <li><strong>1945:</strong> Atomic bombings of Hiroshima and Nagasaki</li>
      </ul>
      
      <h2>Aftermath</h2>
      <p>The war resulted in:</p>
      <ul>
        <li>Approximately 70-85 million casualties</li>
        <li>The formation of the United Nations</li>
        <li>The beginning of the Cold War</li>
        <li>Decolonization movements across the globe</li>
      </ul>
    `,
    duration: 60,
    difficulty: 'advanced',
    imageUrl: 'https://images.unsplash.com/photo-1526136098911-84c2402603c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lesson4',
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of programming concepts and logic.',
    category: 'Computer Science',
    content: `
      <h2>What is Programming?</h2>
      <p>Programming is the process of creating a set of instructions that tell a computer how to perform a task.</p>
      
      <h2>Basic Programming Concepts</h2>
      <ul>
        <li><strong>Variables:</strong> Containers for storing data values</li>
        <li><strong>Data Types:</strong> Different kinds of data (numbers, text, etc.)</li>
        <li><strong>Operators:</strong> Symbols that perform operations on variables and values</li>
        <li><strong>Control Structures:</strong> Instructions that determine the flow of execution</li>
      </ul>
      
      <h2>Simple Algorithm Example</h2>
      <p>Here's a simple algorithm to find the largest of three numbers:</p>
      <pre>
      1. Input three numbers: a, b, c
      2. If a > b and a > c, then largest = a
      3. Else if b > a and b > c, then largest = b
      4. Else largest = c
      5. Output largest
      </pre>
    `,
    duration: 50,
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lesson5',
    title: 'Chemical Reactions',
    description: 'Understand the basics of chemical reactions and balancing equations.',
    category: 'Chemistry',
    content: `
      <h2>What is a Chemical Reaction?</h2>
      <p>A chemical reaction is a process where one or more substances are converted into different substances.</p>
      
      <h2>Types of Chemical Reactions</h2>
      <ul>
        <li><strong>Synthesis:</strong> A + B → AB</li>
        <li><strong>Decomposition:</strong> AB → A + B</li>
        <li><strong>Single Replacement:</strong> A + BC → AC + B</li>
        <li><strong>Double Replacement:</strong> AB + CD → AD + CB</li>
        <li><strong>Combustion:</strong> Fuel + Oxygen → Carbon Dioxide + Water</li>
      </ul>
      
      <h2>Balancing Chemical Equations</h2>
      <p>To balance a chemical equation, you need to ensure that the number of atoms of each element is the same on both sides of the equation.</p>
      <p>Example: Balancing H₂ + O₂ → H₂O</p>
      <ol>
        <li>Count the atoms on both sides: 2 H, 2 O → 2 H, 1 O</li>
        <li>Add coefficients to balance: 2 H₂ + O₂ → 2 H₂O</li>
        <li>Recount: 4 H, 2 O → 4 H, 2 O (balanced)</li>
      </ol>
    `,
    duration: 40,
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'quiz1',
    title: 'Algebra Basics',
    description: 'Test your knowledge of basic algebraic concepts.',
    category: 'Mathematics',
    questions: [
      {
        id: 'q1',
        text: 'Solve for x: 2x + 5 = 15',
        options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 5.5'],
        correctAnswer: 0,
        explanation: 'To solve 2x + 5 = 15, subtract 5 from both sides: 2x = 10. Then divide both sides by 2: x = 5.'
      },
      {
        id: 'q2',
        text: 'Simplify: 3(x + 2) - 4',
        options: ['3x + 2', '3x + 6 - 4', '3x + 2 - 4', '3x + 6'],
        correctAnswer: 1,
        explanation: 'First distribute: 3(x + 2) = 3x + 6. Then subtract 4: 3x + 6 - 4 = 3x + 2.'
      },
      {
        id: 'q3',
        text: 'If a = 3 and b = 2, what is the value of 2a² - 3b?',
        options: ['12', '18', '12 - 6', '18 - 6'],
        correctAnswer: 3,
        explanation: 'Substitute the values: 2(3)² - 3(2) = 2(9) - 6 = 18 - 6 = 12.'
      }
    ],
    duration: 15,
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'quiz2',
    title: 'Cell Biology',
    description: 'Test your knowledge of cell structures and functions.',
    category: 'Biology',
    questions: [
      {
        id: 'q1',
        text: 'Which organelle is known as the "powerhouse of the cell"?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
        correctAnswer: 1,
        explanation: 'Mitochondria are called the "powerhouse of the cell" because they generate most of the cell\'s supply of ATP, which is used as a source of chemical energy.'
      },
      {
        id: 'q2',
        text: 'Which of the following is NOT a function of the cell membrane?',
        options: ['Protection', 'Selective permeability', 'Energy production', 'Cell recognition'],
        correctAnswer: 2,
        explanation: 'Energy production is primarily the function of mitochondria, not the cell membrane. The cell membrane is responsible for protection, selective permeability, and cell recognition.'
      },
      {
        id: 'q3',
        text: 'Which type of cells lack a nucleus?',
        options: ['Plant cells', 'Animal cells', 'Prokaryotic cells', 'Eukaryotic cells'],
        correctAnswer: 2,
        explanation: 'Prokaryotic cells, such as bacteria, lack a true nucleus and other membrane-bound organelles.'
      }
    ],
    duration: 15,
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'quiz3',
    title: 'World War II',
    description: 'Test your knowledge of World War II history.',
    category: 'History',
    questions: [
      {
        id: 'q1',
        text: 'When did World War II begin?',
        options: ['1914', '1939', '1941', '1945'],
        correctAnswer: 1,
        explanation: 'World War II began on September 1, 1939, when Nazi Germany invaded Poland.'
      },
      {
        id: 'q2',
        text: 'Which country was NOT part of the Allied Powers?',
        options: ['United States', 'Soviet Union', 'Japan', 'Great Britain'],
        correctAnswer: 2,
        explanation: 'Japan was part of the Axis Powers, along with Nazi Germany and Italy. The Allied Powers included the United States, Soviet Union, Great Britain, and others.'
      },
      {
        id: 'q3',
        text: 'What was the code name for the Allied invasion of Normandy in 1944?',
        options: ['Operation Barbarossa', 'Operation Market Garden', 'Operation Overlord', 'Operation Torch'],
        correctAnswer: 2,
        explanation: 'Operation Overlord was the code name for the Battle of Normandy, which began on June 6, 1944 (D-Day).'
      }
    ],
    duration: 15,
    difficulty: 'advanced',
    imageUrl: 'https://images.unsplash.com/photo-1526136098911-84c2402603c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'quiz4',
    title: 'Programming Fundamentals',
    description: 'Test your knowledge of basic programming concepts.',
    category: 'Computer Science',
    questions: [
      {
        id: 'q1',
        text: 'Which of the following is NOT a primitive data type in most programming languages?',
        options: ['Integer', 'Boolean', 'Array', 'Character'],
        correctAnswer: 2,
        explanation: 'Arrays are composite data types (data structures) that can hold multiple values, while integers, booleans, and characters are primitive data types that hold single values.'
      },
      {
        id: 'q2',
        text: 'What is the output of the following pseudocode? x = 5; y = x++; print(y)',
        options: ['5', '6', '4', 'Error'],
        correctAnswer: 0,
        explanation: 'The post-increment operator (x++) returns the value of x before incrementing it. So y gets the value 5, and then x becomes 6.'
      },
      {
        id: 'q3',
        text: 'Which control structure repeats a block of code while a condition is true?',
        options: ['If statement', 'Switch statement', 'For loop', 'While loop'],
        correctAnswer: 3,
        explanation: 'A while loop repeats a block of code as long as the specified condition is true.'
      }
    ],
    duration: 15,
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'quiz5',
    title: 'Chemical Reactions',
    description: 'Test your knowledge of chemical reactions and equations.',
    category: 'Chemistry',
    questions: [
      {
        id: 'q1',
        text: 'Which type of reaction is represented by: 2H₂ + O₂ → 2H₂O?',
        options: ['Decomposition', 'Single replacement', 'Synthesis', 'Combustion'],
        correctAnswer: 2,
        explanation: 'This is a synthesis (or combination) reaction where two or more substances combine to form a single product.'
      },
      {
        id: 'q2',
        text: 'In a balanced chemical equation, what must be equal on both sides?',
        options: ['Number of molecules', 'Number of atoms of each element', 'Number of compounds', 'Total mass'],
        correctAnswer: 1,
        explanation: 'According to the Law of Conservation of Mass, the number of atoms of each element must be equal on both sides of a balanced chemical equation.'
      },
      {
        id: 'q3',
        text: 'What is the balanced equation for the combustion of methane (CH₄)?',
        options: ['CH₄ + O₂ → CO₂ + H₂O', 'CH₄ + 2O₂ → CO₂ + 2H₂O', 'CH₄ + 3O₂ → CO₂ + 2H₂O', 'CH₄ + 4O₂ → CO₂ + 2H₂O'],
        correctAnswer: 1,
        explanation: 'The balanced equation is CH₄ + 2O₂ → CO₂ + 2H₂O. This ensures that there are equal numbers of carbon, hydrogen, and oxygen atoms on both sides.'
      }
    ],
    duration: 15,
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }
];

export const activeMatches: Match[] = [
  {
    id: 'match1',
    quizId: 'quiz1',
    participants: [
      {
        userId: 'user1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 0
      },
      {
        userId: 'user2',
        name: 'Jamie Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 0
      }
    ],
    status: 'waiting',
    startTime: new Date(Date.now() + 60000).toISOString(),
    endTime: null
  },
  {
    id: 'match2',
    quizId: 'quiz3',
    participants: [
      {
        userId: 'user1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 2
      },
      {
        userId: 'user3',
        name: 'Taylor Wilson',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 1
      }
    ],
    status: 'in-progress',
    startTime: new Date(Date.now() - 300000).toISOString(),
    endTime: null
  }
];

export const completedMatches: Match[] = [
  {
    id: 'match3',
    quizId: 'quiz2',
    participants: [
      {
        userId: 'user1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 3
      },
      {
        userId: 'user4',
        name: 'Jordan Lee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 2
      }
    ],
    status: 'completed',
    startTime: new Date(Date.now() - 86400000).toISOString(),
    endTime: new Date(Date.now() - 85500000).toISOString()
  }
];

export const leaderboard: Leaderboard = {
  global: [
    {
      userId: 'user5',
      name: 'Riley Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      score: 1250,
      level: 8
    },
    {
      userId: 'user6',
      name: 'Casey Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      score: 1120,
      level: 7
    },
    {
      userId: 'user1',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      score: 980,
      level: 6
    },
    {
      userId: 'user7',
      name: 'Morgan Taylor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      score: 850,
      level: 5
    },
    {
      userId: 'user8',
      name: 'Sam Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      score: 720,
      level: 4
    }
  ],
  weekly: [
    {
      userId: 'user1',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      score: 320,
      level: 6
    },
    {
      userId: 'user6',
      name: 'Casey Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      score: 280,
      level: 7
    },
    {
      userId: 'user5',
      name: 'Riley Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      score: 250,
      level: 8
    },
    {
      userId: 'user8',
      name: 'Sam Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      score: 220,
      level: 4
    },
    {
      userId: 'user7',
      name: 'Morgan Taylor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      score: 180,
      level: 5
    }
  ],
  byCategory: {
    'Mathematics': [
      {
        userId: 'user6',
        name: 'Casey Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 450,
        level: 7
      },
      {
        userId: 'user1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 380,
        level: 6
      },
      {
        userId: 'user5',
        name: 'Riley Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 320,
        level: 8
      }
    ],
    'Biology': [
      {
        userId: 'user5',
        name: 'Riley Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 410,
        level: 8
      },
      {
        userId: 'user7',
        name: 'Morgan Taylor',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 350,
        level: 5
      },
      {
        userId: 'user1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 290,
        level: 6
      }
    ],
    'History': [
      {
        userId: 'user8',
        name: 'Sam Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 380,
        level: 4
      },
      {
        userId: 'user6',
        name: 'Casey Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 340,
        level: 7
      },
      {
        userId: 'user1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
        score: 310,
        level: 6
      }
    ]
  }
};