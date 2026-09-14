import { Lesson } from '../types';

export const CURRICULUM_LESSONS: Lesson[] = [
  // ==========================================
  // 1. MATHEMATICS (Maharashtra State Board Std 8)
  // ==========================================
  {
    id: 'math-rational-numbers',
    chapterNumber: 1,
    subject: 'Mathematics',
    title: 'Rational and Irrational Numbers',
    shortDesc: 'Number line representation, terminating & recurring decimals, and constructing √2 & √3 with Pythagoras.',
    difficulty: 'Easy',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'Divide',
    colorTheme: 'blue',
    step1_concept: {
      overview: 'Any number that can be expressed in the form m/n (where m and n are integers and n ≠ 0) is a Rational Number. Numbers that cannot be expressed as m/n (like √2, √3, π) are Irrational Numbers.',
      slides: [
        {
          title: 'What is a Rational Number?',
          subtitle: 'The fundamental form m/n',
          content: 'Numbers like 7/3, -2/5, 0, and 4 are all rational numbers! 0 is rational because it can be written as 0/1. Between any two distinct rational numbers, there are infinitely many rational numbers.',
          formulaOrRule: 'm / n (where m, n ∈ ℤ and n ≠ 0)',
          highlightFact: 'Every positive number has two square roots: one positive (+√16 = 4) and one negative (-√16 = -4).',
          points: [
            'Terminating decimals: e.g. 7/4 = 1.75 (division ends with remainder 0).',
            'Non-terminating recurring decimals: e.g. 22/7 = 3.142857... or 23/99 = 0.2323...',
            'Comparing rule: if a/b and c/d have b, d > 0, then a×d > b×c implies a/b > c/d.'
          ],
          mnemonic: 'Rational = Ratio of integers (denominator never zero)!'
        },
        {
          title: 'Showing Irrational Numbers (√2 & √3) on Number Line',
          subtitle: 'Pythagorean construction',
          content: 'On a number line, mark OA = 1 unit. Draw perpendicular AP = 1 unit at A. By Pythagoras theorem in right ΔOAP: OP² = OA² + AP² = 1² + 1² = 2, so OP = √2. Drawing an arc with radius OP intersects the number line at √2!',
          formulaOrRule: 'OP = √(1² + 1²) = √2 | OR = √( (√2)² + 1² ) = √3',
          highlightFact: 'The number π is irrational; 22/7 and 3.14 are rational approximations used for practical calculations.',
          points: [
            'All rational and irrational numbers together form the set of Real Numbers.',
            'Numbers like 3√2, 7 + √2, 3 - √2 are also irrational numbers.',
            'Decimal form of an irrational number is non-terminating and non-recurring.'
          ],
          mnemonic: 'Square root of non-perfect square = Irrational Real Number!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match each rational or irrational number concept with its mathematical property!',
      instruction: 'Tap a concept on the left, then connect it to its exact textbook definition on the right.',
      pairs: [
        { id: 'm1', left: 'Additive Identity for rational numbers', right: '0 (a + 0 = a)' },
        { id: 'm2', left: 'Multiplicative Inverse (reciprocal) of -7/19', right: '-19/7' },
        { id: 'm3', left: 'Decimal form of 7/4', right: '1.75 (Terminating)' },
        { id: 'm4', left: 'Hypotenuse with legs 1 and 1 unit', right: '√2 (Irrational length)' }
      ],
      explanation: 'Outstanding! 0 is the additive identity, reciprocal inverts numerator and denominator, 7/4 terminates at 1.75, and √2 is obtained from a right triangle of unit legs.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Which of the following numbers is an irrational number?',
        options: ['22/7', '0.2323...', '√2', '1.75'],
        correctIndex: 2,
        explanation: '√2 cannot be written in the form m/n with integers and has a non-terminating, non-recurring decimal representation.'
      },
      {
        id: 'q2',
        question: 'Compare the numbers: which sign goes between -7/3 and -5/2?',
        options: ['>', '<', '=', '≤'],
        correctIndex: 0,
        explanation: '-7/3 = -14/6 and -5/2 = -15/6. On a number line, -14/6 lies to the right of -15/6, so -7/3 > -5/2.'
      },
      {
        id: 'q3',
        question: 'What is the value of the length of the hypotenuse when base is √2 and height is 1 unit?',
        options: ['2', '√3', '3', '√5'],
        correctIndex: 1,
        explanation: 'By Pythagoras theorem: (√2)² + 1² = 2 + 1 = 3. Taking square root gives √3.'
      }
    ]
  },

  {
    id: 'math-parallel-lines',
    chapterNumber: 2,
    subject: 'Mathematics',
    title: 'Parallel Lines and Transversal',
    shortDesc: 'Master corresponding, alternate, and interior angles formed when a transversal intersects parallel lines.',
    difficulty: 'Medium',
    estimatedMin: 5,
    xpReward: 160,
    iconName: 'Variable',
    colorTheme: 'blue',
    step1_concept: {
      overview: 'Lines in the same plane which do not intersect each other are called parallel lines (line l || line m). A line intersecting two coplanar lines in two distinct points is called a transversal.',
      slides: [
        {
          title: 'Angles Formed by a Transversal',
          subtitle: '8 angles in total (4 pairs each)',
          content: 'When a transversal intersects two lines, 8 angles are created: 4 pairs of Corresponding angles, 2 pairs of Interior alternate angles, 2 pairs of Exterior alternate angles, and 2 pairs of Interior angles.',
          formulaOrRule: 'Corresponding angles are CONGRUENT | Alternate angles are CONGRUENT | Interior angles are SUPPLEMENTARY (sum = 180°)',
          highlightFact: 'If any ONE angle is known among the 8 angles formed by parallel lines, all remaining 7 angles can be calculated!',
          points: [
            'Corresponding angles: Arms on transversal point in the same direction and on the same side.',
            'Interior alternate angles: On opposite sides of transversal, between the two parallel lines (form a Z-shape).',
            'Interior angles: On the same side of transversal and inside the parallel lines; their sum is 180°.'
          ],
          mnemonic: 'F-shape = Corresponding | Z-shape = Alternate | C-shape = Interior (180°)!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match the angle relation when two parallel lines are cut by a transversal!',
      instruction: 'Connect each angle pair type on the left with its geometric property on the right.',
      pairs: [
        { id: 'p1', left: 'Pair of Corresponding Angles', right: 'Congruent (Equal in measure)' },
        { id: 'p2', left: 'Pair of Interior Alternate Angles', right: 'Congruent (Equal in measure)' },
        { id: 'p3', left: 'Pair of Interior Angles on same side', right: 'Supplementary (Sum is 180°)' },
        { id: 'p4', left: 'Angles in a Linear Pair', right: 'Supplementary (Sum is 180°)' }
      ],
      explanation: 'Perfect! Corresponding and alternate angles are congruent, while interior angles on the same side add up to 180°.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'If line m || line n and an interior angle is 70°, what is the measure of the interior angle on the same side of the transversal?',
        options: ['70°', '110°', '20°', '90°'],
        correctIndex: 1,
        explanation: 'Interior angles on the same side of a transversal are supplementary: 180° - 70° = 110°.'
      },
      {
        id: 'q2',
        question: 'If m∠b = (x + 15)° and m∠e = (2x + 15)° form a linear pair (sum = 180°), what is the value of x?',
        options: ['40°', '45°', '50°', '60°'],
        correctIndex: 2,
        explanation: '(x + 15) + (2x + 15) = 180 => 3x + 30 = 180 => 3x = 150 => x = 50°.'
      },
      {
        id: 'q3',
        question: 'If two lines are intersected by a transversal and alternate angles are congruent, then the two lines are:',
        options: ['Perpendicular', 'Parallel', 'Intersecting', 'Coincident'],
        correctIndex: 1,
        explanation: 'By the alternate angles test of parallelism, if alternate angles are congruent, the lines are parallel.'
      }
    ]
  },

  {
    id: 'math-indices-cube-root',
    chapterNumber: 3,
    subject: 'Mathematics',
    title: 'Indices and Cube Root',
    shortDesc: 'Master laws of indices, numbers with rational indices a^(m/n), and finding cube roots by prime factors.',
    difficulty: 'Medium',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'Calculator',
    colorTheme: 'blue',
    step1_concept: {
      overview: 'Indices represent repeated multiplication (2⁵ = 2×2×2×2×2). When the index is a rational number m/n, a^(m/n) represents the m-th power of the n-th root of a, or the n-th root of the m-th power of a.',
      slides: [
        {
          title: 'Laws of Indices & Rational Powers',
          subtitle: 'Core operational identities',
          content: 'aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁰ = 1, a⁻ᵐ = 1/aᵐ, and (a/b)⁻ᵐ = (b/a)ᵐ.',
          formulaOrRule: 'a^(m/n) = (aᵐ)^(1/n) = (a^(1/n))ᵐ',
          highlightFact: 'The cube of a positive number is always positive, and the cube of a negative number is always negative: (-6)³ = -216!',
          points: [
            '27^(4/5) means the 5th root of the 4th power of 27, or 4th power of the 5th root of 27.',
            'Finding cube root of 216: 216 = (2×3)³ = 6³, so ∛216 = 6.',
            'Cube root of a negative integer: ∛(-1331) = -11 because (-11)³ = -1331.'
          ],
          mnemonic: 'Powers add on multiply, subtract on divide, multiply across brackets!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match each index expression with its simplified value!',
      instruction: 'Connect each expression on the left with its correct value on the right.',
      pairs: [
        { id: 'i1', left: '∛216', right: '6' },
        { id: 'i2', left: '∛(-1331)', right: '-11' },
        { id: 'i3', left: '5⁰', right: '1' },
        { id: 'i4', left: '∛(27/125)', right: '3/5' }
      ],
      explanation: 'Excellent! 6³=216, (-11)³=-1331, any non-zero number to power 0 is 1, and ∛(27/125) = 3/5.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'What is the cube root of 1728?',
        options: ['10', '12', '14', '18'],
        correctIndex: 1,
        explanation: '1728 = 8 × 216 = 2³ × 6³ = (2×6)³ = 12³. Hence ∛1728 = 12.'
      },
      {
        id: 'q2',
        question: 'What is the value of (0.02)³?',
        options: ['0.008', '0.0008', '0.000008', '0.00008'],
        correctIndex: 2,
        explanation: '0.02 has 2 decimal places. Its cube will have 2 × 3 = 6 decimal places: 0.000008.'
      },
      {
        id: 'q3',
        question: 'If ∛729 = 9, then what is the value of ∛0.000729?',
        options: ['0.9', '0.09', '0.009', '0.0009'],
        correctIndex: 1,
        explanation: '∛0.000729 = ∛(729 / 1000000) = 9 / 100 = 0.09.'
      }
    ]
  },

  {
    id: 'math-expansion-formulae',
    chapterNumber: 5,
    subject: 'Mathematics',
    title: 'Expansion Formulae',
    shortDesc: 'Master expansions of (x+a)(x+b), (a+b)³, (a-b)³, and trinomial (a+b+c)²',
    difficulty: 'Medium',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'Divide',
    colorTheme: 'blue',
    step1_concept: {
      overview: 'Algebraic identities allow expanding products of polynomials rapidly without tedious line-by-line multiplication.',
      slides: [
        {
          title: 'The Essential 4 Expansion Formulae',
          subtitle: 'Class 8 standard formulas',
          content: '(x+a)(x+b) = x² + (a+b)x + ab\n(a+b)³ = a³ + 3a²b + 3ab² + b³\n(a-b)³ = a³ - 3a²b + 3ab² - b³\n(a+b+c)² = a² + b² + c² + 2ab + 2bc + 2ac',
          formulaOrRule: '(a+b)³ = a³ + b³ + 3ab(a+b) | (a-b)³ = a³ - b³ - 3ab(a-b)',
          highlightFact: 'Calculate mental cubes like 99³ easily: (100 - 1)³ = 1,000,000 - 30,000 + 300 - 1 = 970,299!',
          points: [
            'Expansion of (x+2)(x+3) = x² + (2+3)x + 2×3 = x² + 5x + 6.',
            'Expansion of (x-2)³ = x³ - 3(x²)(2) + 3(x)(4) - 8 = x³ - 6x² + 12x - 8.',
            'Trinomial square: (p+q+3)² = p² + q² + 9 + 2pq + 6q + 6p.'
          ],
          mnemonic: 'In (a-b)³, alternate signs: + - + -!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match each algebraic expression with its correct expanded result!',
      instruction: 'Tap the expression on the left and match it to its expanded form on the right.',
      pairs: [
        { id: 'e1', left: '(x + 2)(x + 3)', right: 'x² + 5x + 6' },
        { id: 'e2', left: '(x - 2)³', right: 'x³ - 6x² + 12x - 8' },
        { id: 'e3', left: '(a + b + c)²', right: 'a² + b² + c² + 2ab + 2bc + 2ac' },
        { id: 'e4', left: '(m - 4)(m + 6)', right: 'm² + 2m - 24' }
      ],
      explanation: 'Great algebraic mastery! The identities expand binomial products and cubes accurately.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Expand (m + 4)³:',
        options: [
          'm³ + 64',
          'm³ + 12m² + 48m + 64',
          'm³ + 4m² + 16m + 64',
          'm³ + 12m + 64'
        ],
        correctIndex: 1,
        explanation: '(m+4)³ = m³ + 3(m²)(4) + 3(m)(16) + 4³ = m³ + 12m² + 48m + 64.'
      },
      {
        id: 'q2',
        question: 'What is the expansion of (2p + q + 5)²?',
        options: [
          '4p² + q² + 25 + 4pq + 10q + 20p',
          '4p² + q² + 25 + 2pq + 5q + 10p',
          '2p² + q² + 25',
          '4p² + q² + 25 + 4pq'
        ],
        correctIndex: 0,
        explanation: 'a=2p, b=q, c=5: a²+b²+c²+2ab+2bc+2ac = 4p² + q² + 25 + 4pq + 10q + 20p.'
      },
      {
        id: 'q3',
        question: 'Calculate (101)³ using expansion formula:',
        options: ['1030301', '1020101', '1030001', '1003001'],
        correctIndex: 0,
        explanation: '(100 + 1)³ = 100³ + 3(100²)(1) + 3(100)(1²) + 1³ = 1,000,000 + 30,000 + 300 + 1 = 1,030,301.'
      }
    ]
  },

  {
    id: 'math-area',
    chapterNumber: 15,
    subject: 'Mathematics',
    title: 'Area of Plane Figures & Heron\'s Formula',
    shortDesc: 'Calculate area of Parallelogram, Rhombus, Trapezium, Circle, and Scalene Triangles with Heron\'s formula.',
    difficulty: 'Medium',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'Calculator',
    colorTheme: 'blue',
    step1_concept: {
      overview: 'Area measures the surface enclosed by a closed figure in square units (sq cm, sq m, hectare). Standard geometric formulas simplify complex irregular land calculations.',
      slides: [
        {
          title: 'Formulas for Quadrilaterals and Triangles',
          subtitle: 'Class 8 Maharashtra State Board standard formulas',
          content: '• Area of Parallelogram = base × height\n• Area of Rhombus = ½ × product of lengths of diagonals (½ × d₁ × d₂)\n• Area of Trapezium = ½ × (sum of parallel sides) × height\n• Area of Circle = πr²\n• Heron\'s Formula for Triangle = √[s(s - a)(s - b)(s - c)] where semiperimeter s = (a + b + c)/2.',
          formulaOrRule: 'Trapezium = ½(AB + CD) × h | Heron = √[s(s-a)(s-b)(s-c)]',
          highlightFact: 'In land revenue measurement in India: 100 sq m = 1 Are, 100 Are = 1 Hectare = 10,000 sq m. 1 Guntha ≈ 1 Are ≈ 100 sq m.',
          points: [
            'If base of parallelogram is 18 cm and height is 11 cm: Area = 18 × 11 = 198 sq cm.',
            'If diagonals of rhombus are 15 cm and 24 cm: Area = ½ × 15 × 24 = 180 sq cm.',
            'If parallel sides of trapezium are 7 cm and 8 cm with height 6 cm: Area = ½(7+8)×6 = 45 sq cm.'
          ],
          mnemonic: 'Heron saves the day when height is away!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match each geometric shape with its area formula!',
      instruction: 'Connect each polygon shape on the left with its correct area formula on the right.',
      pairs: [
        { id: 'a1', left: 'Parallelogram', right: 'base × height' },
        { id: 'a2', left: 'Rhombus', right: '½ × d₁ × d₂' },
        { id: 'a3', left: 'Trapezium', right: '½ × (sum of parallel sides) × height' },
        { id: 'a4', left: 'Triangle with 3 known sides', right: '√[s(s - a)(s - b)(s - c)] (Heron\'s Formula)' }
      ],
      explanation: 'Brilliant! Each 2D polygon has its exact geometric area relationship derived in Chapter 15.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'If the diagonals of a rhombus are 16 cm and 12 cm, what is its area?',
        options: ['192 sq cm', '96 sq cm', '48 sq cm', '120 sq cm'],
        correctIndex: 1,
        explanation: 'Area of rhombus = ½ × d₁ × d₂ = ½ × 16 × 12 = 96 sq cm.'
      },
      {
        id: 'q2',
        question: 'If a triangle has sides 17 cm, 25 cm, and 26 cm, what is its semiperimeter s?',
        options: ['68 cm', '34 cm', '51 cm', '44 cm'],
        correctIndex: 1,
        explanation: 's = (a + b + c) / 2 = (17 + 25 + 26) / 2 = 68 / 2 = 34 cm.'
      },
      {
        id: 'q3',
        question: 'What is the area of a circle with radius 21 cm? (Use π = 22/7)',
        options: ['1386 sq cm', '132 sq cm', '616 sq cm', '2464 sq cm'],
        correctIndex: 0,
        explanation: 'Area = πr² = (22/7) × 21 × 21 = 22 × 3 × 21 = 1386 sq cm.'
      }
    ]
  },

  // ==========================================
  // 2. GENERAL SCIENCE (Maharashtra State Board Std 8)
  // ==========================================
  {
    id: 'sci-living-world-microbes',
    chapterNumber: 1,
    subject: 'General Science',
    title: 'Living World and Classification of Microbes',
    shortDesc: 'Whittaker\'s 5-Kingdom system, Monera, Protista, Fungi, Bacteria, and Viruses.',
    difficulty: 'Easy',
    estimatedMin: 5,
    xpReward: 150,
    iconName: 'FlaskConical',
    colorTheme: 'emerald',
    step1_concept: {
      overview: 'Around 87 million living species exist on Earth. In 1969, Robert H. Whittaker divided all living organisms into a 5-Kingdom classification system.',
      slides: [
        {
          title: 'Whittaker\'s Five Kingdoms',
          subtitle: 'Monera, Protista, Fungi, Plantae, Animalia',
          content: 'Criteria used by Whittaker: 1. Complexity of cell structure (Prokaryotic vs Eukaryotic), 2. Complexity of organism (Unicellular vs Multicellular), 3. Mode of nutrition (Autotrophic, Saprophytic, Ingestive), 4. Life style (Producers, Consumers, Decomposers), 5. Phylogenetic lineage.',
          formulaOrRule: '1 meter = 10⁶ micrometer (μm) = 10⁹ nanometer (nm)',
          highlightFact: 'National Institute of Virology (NIV), Pune, founded in 1952 under ICMR, is India\'s premier virus research institute.',
          points: [
            'Kingdom 1 Monera: Unicellular prokaryotes without distinct nucleus (e.g. Lactobacillus, Salmonella typhi).',
            'Kingdom 2 Protista: Unicellular eukaryotes with well-defined nucleus, cilia/flagella/pseudopodia (e.g. Amoeba, Paramoecium, Euglena).',
            'Kingdom 3 Fungi: Non-green eukaryotic saprotrophs with cell walls made of Chitin (e.g. Baker\'s yeast, Aspergillus, Mushrooms).'
          ],
          mnemonic: 'Mo-Pro-Fu-Pla-Ani: 5 Whittaker kingdoms from simple to complex!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match each microbe or kingdom with its characteristic!',
      instruction: 'Connect each organism on the left with its biological fact on the right.',
      pairs: [
        { id: 'w1', left: 'Lactobacillus', right: 'Rod-like bacterium in curd (Kingdom Monera)' },
        { id: 'w2', left: 'Amoeba', right: 'Unicellular eukaryote with pseudopodia (Protista)' },
        { id: 'w3', left: 'Fungi Cell Wall', right: 'Tough complex sugar called Chitin' },
        { id: 'w4', left: 'Viruses', right: 'DNA/RNA inside protein coat; edge of living & non-living' }
      ],
      explanation: 'Great job! Monera includes bacteria, Protista includes Amoeba, fungal walls have Chitin, and viruses are acellular particles.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Who introduced the 5-Kingdom system of biological classification in 1969?',
        options: ['Carl Linnaeus', 'Robert H. Whittaker', 'Chatton', 'Haeckel'],
        correctIndex: 1,
        explanation: 'Robert Harding Whittaker (1920-1980), an American ecologist, divided all living organisms into 5 kingdoms in 1969.'
      },
      {
        id: 'q2',
        question: 'Which of the following organisms belongs to Kingdom Monera?',
        options: ['Paramoecium', 'Mushroom', 'Lactobacilli bacteria', 'Euglena'],
        correctIndex: 2,
        explanation: 'All types of bacteria and blue-green algae are prokaryotic single cells belonging to Kingdom Monera.'
      },
      {
        id: 'q3',
        question: 'What is the fungal cell wall primarily composed of?',
        options: ['Cellulose', 'Chitin', 'Pectin', 'Lignin'],
        correctIndex: 1,
        explanation: 'Fungal cell walls are made up of a tough and complex polysaccharide called chitin.'
      }
    ]
  },

  {
    id: 'sci-force-pressure-detailed',
    chapterNumber: 3,
    subject: 'General Science',
    title: 'Force and Pressure & Archimedes Principle',
    shortDesc: 'Contact/non-contact forces, types of inertia, Pressure = Force/Area, and Archimedes buoyancy principle.',
    difficulty: 'Medium',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'Zap',
    colorTheme: 'emerald',
    step1_concept: {
      overview: 'Newton\'s First Law states an object remains stationary or in uniform motion unless acted upon by an external unbalanced force. Force applied over an area produces pressure.',
      slides: [
        {
          title: 'Contact vs Non-contact Forces & Inertia',
          subtitle: 'Newton\'s fundamentals',
          content: '• Contact force: Acts through direct contact (muscular force, friction).\n• Non-contact force: Acts without contact (gravitational, electrostatic, magnetic force).\n• Inertia: Tendency of an object to remain in its existing state (Inertia of rest, Inertia of motion, Directional inertia).',
          formulaOrRule: 'Pressure = Force / Area  |  SI Unit: N/m² = Pascal (Pa)',
          highlightFact: 'Camel feet are broad so their weight spreads over a larger area, reducing pressure on sand so they don\'t sink!',
          points: [
            '1 bar = 10⁵ Pascal (Pa). Atmospheric pressure at sea level = 101 × 10³ Pa = 1 bar.',
            'Archimedes Principle: When an object is partially or fully immersed in a fluid, the upward buoyant force equals the weight of fluid displaced.',
            'Relative density = Density of substance / Density of water (no unit, also called specific gravity).'
          ],
          mnemonic: 'Smaller Area = Greater Pressure (Sharp knife cuts easy)!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match the physics concept with its real-world application!',
      instruction: 'Connect each force or pressure concept with its real-world manifestation.',
      pairs: [
        { id: 'f1', left: 'Sharp cutting edge of knife', right: 'Smaller area exerts higher pressure' },
        { id: 'f2', left: 'Passenger jerks forward when bus stops', right: 'Inertia of motion' },
        { id: 'f3', left: 'Steel ship floats on sea water', right: 'Archimedes upward buoyant force' },
        { id: 'f4', left: 'Comb attracting paper bits', right: 'Electrostatic non-contact force' }
      ],
      explanation: 'Spot on! The sharpness of a knife concentrates force on small area, inertia resists change of motion, and buoyancy floats ships.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'What is the SI unit of pressure?',
        options: ['Newton (N)', 'Pascal (N/m²)', 'Joule (J)', 'Dyne'],
        correctIndex: 1,
        explanation: 'Pressure is defined as force per unit area. In the SI system, it is measured in Newton per square meter (N/m²), known as Pascal (Pa).'
      },
      {
        id: 'q2',
        question: 'Why does an iron nail sink in water while a massive steel ship floats?',
        options: [
          'Iron nail has more mass than the ship',
          'The ship displaces water whose weight equals the ship weight (Archimedes Principle)',
          'Sea water has no gravity',
          'Nail has higher temperature'
        ],
        correctIndex: 1,
        explanation: 'Due to its hollow design, a ship displaces a huge volume of water, creating an upward buoyant force equal to its total weight.'
      },
      {
        id: 'q3',
        question: 'A coin on a card over a glass drops into the glass when the card is flicked. This demonstrates:',
        options: ['Inertia of rest', 'Inertia of motion', 'Directional inertia', 'Magnetic force'],
        correctIndex: 0,
        explanation: 'The coin tends to remain in its state of rest due to inertia of rest and falls straight into the glass by gravity.'
      }
    ]
  },

  {
    id: 'sci-inside-atom',
    chapterNumber: 5,
    subject: 'General Science',
    title: 'Inside the Atom & Atomic Models',
    shortDesc: 'Dalton, Thomson Plum Pudding, Rutherford Gold Foil, Bohr Stable Orbits, Atomic Number Z and Isotopes.',
    difficulty: 'Medium',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'FlaskConical',
    colorTheme: 'emerald',
    step1_concept: {
      overview: 'Over 2500 years ago, Kanad Muni named the smallest indivisible particle "Paramanu" and Democritus coined "Atomos". Modern atomic models unravelled the subatomic structure.',
      slides: [
        {
          title: 'Evolution of the Atomic Model',
          subtitle: 'From solid sphere to electron shells',
          content: '1. Dalton (1803): Hard solid indivisible sphere.\n2. Thomson (1904): Plum Pudding model—positive sphere embedded with negative electrons.\n3. Rutherford (1911): Gold foil scattering experiment proved dense positive nucleus with revolving electrons.\n4. Bohr (1913): Electrons revolve in stable concentric circular shells (K, L, M, N).',
          formulaOrRule: 'Shell capacity = 2n² (K: 2, L: 8, M: 18, N: 32)',
          highlightFact: 'Atomic Number (Z) = number of protons. Mass Number (A) = Protons + Neutrons (Nucleons).',
          points: [
            'Proton (p): +1e charge, mass ≈ 1 u (located in nucleus).',
            'Neutron (n): Neutral charge, mass ≈ 1 u (located in nucleus).',
            'Electron (e⁻): -1e charge, mass 1800 times less than hydrogen (in extranuclear shells).',
            'Isotopes: Atoms of same element having same atomic number Z but different mass number A (e.g. C-12, C-13, C-14).'
          ],
          mnemonic: 'PEN: Protons (+), Electrons (-), Neutrons (0)!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match each atomic scientist with their landmark discovery!',
      instruction: 'Connect each pioneer on the left with their atomic model or particle on the right.',
      pairs: [
        { id: 'at1', left: 'John Dalton (1803)', right: 'Atomic Theory (Solid indivisible sphere)' },
        { id: 'at2', left: 'J.J. Thomson (1904)', right: 'Plum Pudding model & discovery of electron' },
        { id: 'at3', left: 'Ernest Rutherford (1911)', right: 'Alpha scattering & discovery of nucleus' },
        { id: 'at4', left: 'Niels Bohr (1913)', right: 'Stable circular orbit shells (2n² formula)' }
      ],
      explanation: 'Superb! Dalton proposed the indivisible atom, Thomson discovered the electron, Rutherford discovered the nucleus, and Bohr defined stable electron shells.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'What is the maximum electron capacity of the M shell (n = 3)?',
        options: ['8', '18', '32', '2'],
        correctIndex: 1,
        explanation: 'Using formula 2n²: for n=3, 2 × (3)² = 2 × 9 = 18 electrons.'
      },
      {
        id: 'q2',
        question: 'What do atoms of isotopes have in common?',
        options: [
          'Same neutron number, different proton number',
          'Same atomic number (Z), different mass number (A)',
          'Same mass number, different atomic number',
          'Different chemical properties'
        ],
        correctIndex: 1,
        explanation: 'Isotopes of an element have the same number of protons (atomic number Z) but differing numbers of neutrons, resulting in different mass numbers A.'
      },
      {
        id: 'q3',
        question: 'In Rutherford\'s gold foil experiment, why did 1 in 20,000 alpha particles bounce straight back?',
        options: [
          'They hit the electrons',
          'The foil was too thick',
          'They hit the massive, dense, positively charged nucleus',
          'Alpha particles lost charge'
        ],
        correctIndex: 2,
        explanation: 'The direct rebound proved that almost the entire mass and positive charge of the atom is concentrated in a tiny central nucleus.'
      }
    ]
  },

  {
    id: 'sci-human-body-organs',
    chapterNumber: 11,
    subject: 'General Science',
    title: 'Human Body and Organ System',
    shortDesc: 'Respiratory system, Alveoli, Heart 4 chambers, William Harvey 1628, RBC, WBC, and Blood Groups.',
    difficulty: 'Medium',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'FlaskConical',
    colorTheme: 'emerald',
    step1_concept: {
      overview: 'Life processes require energy produced by oxidation of glucose in cells (Cellular respiration). The respiratory and circulatory systems work in harmony to transport oxygen and nutrients.',
      slides: [
        {
          title: 'Human Respiratory & Circulatory Systems',
          subtitle: 'The highway of life',
          content: '• Respiration: External (Inspiration/Expiration) -> Internal (gas exchange in tissues) -> Cellular (C₆H₁₂O₆ + 6O₂ -> 6CO₂ + 6H₂O + 38 ATP).\n• Heart: 4 chambers (Right/Left Atria, Right/Left Ventricles). Size of one\'s own fist, weight ≈ 360g. Beating sound: \'lubb\' - \'dub\'.\n• Blood vessels: Thick muscular Arteries carry oxygenated blood away from heart; thin-walled Veins have valves to return deoxygenated blood.',
          formulaOrRule: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP | Normal BP: 120/80 mm Hg',
          highlightFact: 'Blood groups A, B, O were discovered by Carl Landsteiner (Nobel Prize 1930); blood group AB by Decastello & Sturli (1902).',
          points: [
            'Alveoli: Tiny thin-walled air sacs in lungs where iron-rich hemoglobin absorbs O₂.',
            'RBCs: Circular, enucleated, carry O₂, live for 100-127 days (50-60 lakh/mm³).',
            'WBCs: Soldiers of the body that attack pathogens (5000-10000/mm³).',
            'Universal Donor: Group \'O\' | Universal Recipient: Group \'AB\'.'
          ],
          mnemonic: 'O Donates to all; AB Borrows from all!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match blood components and systems with their vital roles!',
      instruction: 'Connect each biological component on the left with its bodily function on the right.',
      pairs: [
        { id: 'b1', left: 'Red Blood Corpuscles (RBC)', right: 'Transport oxygen via hemoglobin' },
        { id: 'b2', left: 'White Blood Corpuscles (WBC)', right: 'Soldiers that fight pathogens & infections' },
        { id: 'b3', left: 'Blood Platelets', right: 'Initiate clotting & seal bleeding wounds' },
        { id: 'b4', left: 'Alveoli in Lungs', right: 'Network of thin capillaries for gaseous exchange' }
      ],
      explanation: 'Great mastery! RBCs transport oxygen, WBCs protect as soldiers, platelets clot blood, and alveoli exchange gases.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Which blood group is universally known as the "Universal Donor"?',
        options: ['Group A', 'Group B', 'Group AB', 'Group O'],
        correctIndex: 3,
        explanation: 'Blood group O has no A or B antigens on RBCs, so it can be safely transfused into persons of any blood group.'
      },
      {
        id: 'q2',
        question: 'Who discovered in 1628 that the human heart is a muscular pump with valves that circulates blood?',
        options: ['Robert Hooke', 'William Harvey', 'Carl Landsteiner', 'Alexander Fleming'],
        correctIndex: 1,
        explanation: 'In 1628, Dr. William Harvey described the systemic circulation of blood pumped by the heart through vessels.'
      },
      {
        id: 'q3',
        question: 'How many chambers does the human heart have?',
        options: ['Two', 'Three', 'Four (2 atria, 2 ventricles)', 'Six'],
        correctIndex: 2,
        explanation: 'The human heart is partitioned into 4 chambers: upper Right and Left Atria, and lower Right and Left Ventricles.'
      }
    ]
  },

  // ==========================================
  // 3. HISTORY & CIVICS (Maharashtra State Board Std 8)
  // ==========================================
  {
    id: 'hist-sources-of-history',
    chapterNumber: 1,
    subject: 'History & Civics',
    title: 'Sources of Modern Indian History',
    shortDesc: 'Material, written, oral, audio-visual sources, Aga Khan Palace, and Dada Saheb Phalke film legacy.',
    difficulty: 'Easy',
    estimatedMin: 5,
    xpReward: 150,
    iconName: 'Landmark',
    colorTheme: 'amber',
    step1_concept: {
      overview: 'Studying modern Indian history requires examining material monuments, written archives, oral traditions (Powadas), and modern audio-visual records.',
      slides: [
        {
          title: 'Classification of Historical Sources',
          subtitle: 'From stone monuments to audio-visual films',
          content: '• Material Sources: Buildings, bridges, coins, memorials (e.g. Aga Khan Palace in Pune holding Mahatma Gandhi memorabilia; Cellular Jail in Andaman).\n• Written Sources: Newspapers (Kesari, Amrit Bazar Patrika, Dr. Ambedkar\'s Mooknayak & Bahishkrut Bharat), letters, maps.\n• Oral Sources: Folk songs, Powadas of 1857 and Samyukta Maharashtra, inspirational verses.\n• Audio-Visual: Films (Dada Saheb Phalke laid foundation in 1913), recordings of Tagore singing Jana Gana Mana.',
          formulaOrRule: 'History Sources = Material + Written + Oral + Audio-Visual',
          highlightFact: 'Dada Saheb Phalke started the Indian film industry in 1913, capturing real historic events like the Dandi March on reel.',
          points: [
            'Dr. B.R. Ambedkar started fortnightly Mooknayak in 1920 and Bahishkrut Bharat in 1927 for social awakening.',
            'Powadas were vibrant ballad songs that motivated revolutionaries and the working class.',
            'Survey of India scientifically mapped cities and provinces during British rule.'
          ],
          mnemonic: 'Preserve the 4 sources: Stone, Paper, Voice, Reel!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match historical sources with their landmark examples!',
      instruction: 'Connect each historical artifact on the left with its classification on the right.',
      pairs: [
        { id: 'h1', left: 'Aga Khan Palace (Pune)', right: 'Material Source (Gandhi museum)' },
        { id: 'h2', left: 'Bahishkrut Bharat (1927)', right: 'Written Source (Dr. Ambedkar\'s paper)' },
        { id: 'h3', left: 'Powada of 1857 & Swarajya', right: 'Oral Source (Heroic inspirational ballads)' },
        { id: 'h4', left: 'Dandi March documentary reel', right: 'Audio-Visual Modern Source' }
      ],
      explanation: 'Superb! Material sources preserve physical sites, newspapers form written archives, Powadas are oral history, and documentary reels are audio-visual.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Which museum in Pune preserves documents and personal objects of Mahatma Gandhi?',
        options: ['Cellular Jail', 'Aga Khan Palace', 'Sabarmati Ashram', 'Lakshmi Vilas'],
        correctIndex: 1,
        explanation: 'The Aga Khan Palace in Pune preserves rare photographs, documents, and quarters related to Mahatma Gandhi\'s stay.'
      },
      {
        id: 'q2',
        question: 'Which fortnightly newspaper was started by Dr. Babasaheb Ambedkar in January 1920?',
        options: ['Kesari', 'Mooknayak', 'Young India', 'Prabhakar'],
        correctIndex: 1,
        explanation: 'Dr. Ambedkar launched Mooknayak in January 1920 to voice the grievances of the oppressed classes.'
      },
      {
        id: 'q3',
        question: 'Who laid the foundation of the Indian film industry in 1913?',
        options: ['Satyajit Ray', 'Dada Saheb Phalke', 'V. Shantaram', 'Prithviraj Kapoor'],
        correctIndex: 1,
        explanation: 'Dada Saheb Phalke made India\'s first full-length feature film in 1913, founding the Indian film industry.'
      }
    ]
  },

  {
    id: 'hist-freedom-struggle-1857',
    chapterNumber: 4,
    subject: 'History & Civics',
    title: 'The Freedom Struggle of 1857',
    shortDesc: 'Causes, Mangal Pandey, Nanasaheb Peshwa, Rani Laxmibai, Tatya Tope, and Queen\'s Proclamation 1858.',
    difficulty: 'Medium',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'Landmark',
    colorTheme: 'amber',
    step1_concept: {
      overview: 'The revolt of 1857 was described by V.D. Savarkar as "The First War of Indian Independence". It was sparked by economic exploitation, Lord Dalhousie\'s Doctrine of Lapse, and the greased Enfield cartridges.',
      slides: [
        {
          title: 'Outbreak and Leadership of 1857',
          subtitle: 'From Meerut to Delhi & Central India',
          content: '• Mangal Pandey revolted at Barrackpore against cow/pig fat cartridges.\n• Meerut sepoys marched to Delhi and proclaimed Mughal Emperor Bahadur Shah as Emperor of India.\n• Key Leaders: Nanasaheb Peshwa, Rani Laxmibai of Jhansi, Tatya Tope, Begum Hazrat Mahal (Lucknow), Kunwar Singh (Bihar).\n• In Maharashtra: Rango Bapuji, Umaji Naik earlier, and Bhill warriors under Shankarshah gave heroic resistance.',
          formulaOrRule: 'Outcome: Government of India Act 1858 ended East India Company rule -> British Crown took direct control.',
          highlightFact: 'The Queen\'s Proclamation of 1858 abolished the East India Company, created the post of Viceroy (Lord Canning), and pledged non-interference in Indian religious affairs.',
          points: [
            'Doctrine of Lapse: Lord Dalhousie annexed Jhansi, Satara, and Nagpur by refusing adoption rights.',
            'Economic ruination: Heavy taxes and British machine goods destroyed Indian village handicrafts.',
            'Lack of central leadership and military tactics led to defeat, but lit the everlasting spark of national freedom.'
          ],
          mnemonic: '1857: Mangal, Laxmibai, Tatya Tope sparked the First War of Independence!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match the heroic 1857 leaders with their region of struggle!',
      instruction: 'Connect each iconic freedom fighter on the left with their battlefield region on the right.',
      pairs: [
        { id: 'l1', left: 'Rani Laxmibai', right: 'Jhansi (Fought valiantly in battle)' },
        { id: 'l2', left: 'Mangal Pandey', right: 'Barrackpore (First shot fired against injustice)' },
        { id: 'l3', left: 'Kunwar Singh', right: 'Jagdishpur, Bihar' },
        { id: 'l4', left: 'Begum Hazrat Mahal', right: 'Lucknow, Avadh' }
      ],
      explanation: 'Great knowledge of 1857! Rani Laxmibai defended Jhansi, Mangal Pandey struck at Barrackpore, Kunwar Singh in Bihar, and Begum Hazrat Mahal in Lucknow.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Who coined the term "The Indian War of Independence 1857" in his historic book?',
        options: ['Lokmanya Tilak', 'V.D. Savarkar', 'Dadabhai Naoroji', 'Mahatma Gandhi'],
        correctIndex: 1,
        explanation: 'Swatantryaveer Vinayak Damodar Savarkar authored "The Indian War of Independence 1857", defining it as a national uprising.'
      },
      {
        id: 'q2',
        question: 'Who became the first Viceroy of India following the Government of India Act 1858?',
        options: ['Lord Dalhousie', 'Lord Wellesley', 'Lord Canning', 'Lord Curzon'],
        correctIndex: 2,
        explanation: 'Lord Canning, who was the last Governor General of the Company, became the first Viceroy under the British Crown in 1858.'
      },
      {
        id: 'q3',
        question: 'Which princely state was annexed by Lord Dalhousie by rejecting adoption policy in 1848?',
        options: ['Satara', 'Gwalior', 'Baroda', 'Mysore'],
        correctIndex: 0,
        explanation: 'Satara was the first state annexed by Dalhousie under the Doctrine of Lapse in 1848.'
      }
    ]
  },

  {
    id: 'hist-formation-maharashtra',
    chapterNumber: 14,
    subject: 'History & Civics',
    title: 'Formation of State of Maharashtra',
    shortDesc: 'Samyukta Maharashtra Movement, 106 Martyrs, Hutatma Smarak, and the dawn of 1 May 1960.',
    difficulty: 'Medium',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'Landmark',
    colorTheme: 'amber',
    step1_concept: {
      overview: 'After Independence, Marathi-speaking people demanded a unified state including Mumbai, Vidarbha, and Marathwada through the historic Samyukta Maharashtra Movement.',
      slides: [
        {
          title: 'The Struggle for Samyukta Maharashtra',
          subtitle: 'From Belgaon Resolution (1946) to 1 May 1960',
          content: '• Dar Commission (1948) and JVP Committee initially opposed linguistic state reorganization.\n• Samyukta Maharashtra Samiti established on 6 Feb 1956 under Keshavrao Jedhe, Comrade S.A. Dange, S.M. Joshi, and Acharya Atre.\n• 106 brave sons of Maharashtra sacrificed their lives in police firings; the immortal Hutatma Smarak was erected near Flora Fountain, Mumbai.\n• On 1 May 1960 (Labour Day), Maharashtra State was officially formed with Mumbai as capital, and Yashwantrao Chavan took oath as the first Chief Minister!',
          formulaOrRule: '1 May 1960: Maharashtra Din officially announced at Raj Bhavan Mumbai by Pt. Nehru',
          highlightFact: 'Acharya Atre\'s newspaper "Maratha" and Shahirs like Annabhau Sathe & Amar Sheikh mobilized millions with fiery words and songs.',
          points: [
            'Nagpur Pact (1953) unified Western Maharashtra, Vidarbha, and Marathwada.',
            'Bilingual Mumbai State existed briefly from 1 Nov 1956 to April 1960 before bifurcation into Maharashtra and Gujarat.',
            'Article 371(2) provided constitutional development guarantees for Vidarbha and Marathwada.'
          ],
          mnemonic: '1 May 1960: 106 Hutatmas fulfilled the Samyukta Maharashtra dream!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match key leaders and symbols of the Samyukta Maharashtra Movement!',
      instruction: 'Connect each iconic personality or memorial with their key contribution.',
      pairs: [
        { id: 'm1', left: 'Yashwantrao Chavan', right: 'First Chief Minister of Maharashtra (1 May 1960)' },
        { id: 'm2', left: 'Hutatma Smarak (Flora Fountain)', right: 'Memorial honoring 106 martyrs of the struggle' },
        { id: 'm3', left: 'Acharya P.K. Atre', right: 'Editor of fiery "Maratha" newspaper' },
        { id: 'm4', left: 'Lokshahir Annabhau Sathe', right: 'Aroused public awakening through Shahiri ballads' }
      ],
      explanation: 'Tremendous tribute! Yashwantrao Chavan led the new state, 106 martyrs gave their lives at Flora Fountain, and Atre and Sathe energized the public.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'On which historic date was Maharashtra State officially formed?',
        options: ['15 August 1947', '26 January 1950', '1 May 1960', '1 November 1956'],
        correctIndex: 2,
        explanation: 'At dawn on 1 May 1960 (Labour Day), Prime Minister Nehru announced the formation of Maharashtra State at Raj Bhavan.'
      },
      {
        id: 'q2',
        question: 'Who took the responsibility as the first Chief Minister of Maharashtra State?',
        options: ['Shankarrao Chavan', 'Yashwantrao Chavan', 'Vasantrao Naik', 'Sharad Pawar'],
        correctIndex: 1,
        explanation: 'Yashwantrao Chavan accepted the responsibility as the illustrious first Chief Minister of Maharashtra.'
      },
      {
        id: 'q3',
        question: 'How many martyrs sacrificed their lives in the struggle for Samyukta Maharashtra with Mumbai?',
        options: ['50', '72', '106', '300'],
        correctIndex: 2,
        explanation: '106 brave martyrs laid down their lives in the struggle, immortalized at the Hutatma Smarak in Mumbai.'
      }
    ]
  },

  {
    id: 'civ-indian-parliament',
    chapterNumber: 2,
    subject: 'History & Civics',
    title: 'The Indian Parliament & Law-Making',
    shortDesc: 'Lok Sabha (552), Rajya Sabha (250), Speaker duties, and 3 Readings in the law-making process.',
    difficulty: 'Easy',
    estimatedMin: 5,
    xpReward: 150,
    iconName: 'Scale',
    colorTheme: 'amber',
    step1_concept: {
      overview: 'The Union Legislature at the national level is the Parliament of India, comprising the President, Lok Sabha (House of the People), and Rajya Sabha (Council of States).',
      slides: [
        {
          title: 'Lok Sabha vs Rajya Sabha',
          subtitle: 'Bicameral national legislature',
          content: '• Lok Sabha: Lower house, directly elected by citizens (min age 25, max 552 members, 5-year tenure). Money bills can only be introduced here.\n• Rajya Sabha: Upper permanent house, indirectly elected representatives of states (min age 30, max 250 members, 1/3rd retire every 2 years; 12 nominated by President).\n• Speaker of Lok Sabha: Conducts proceedings in an unbiased manner and maintains dignity of the house.',
          formulaOrRule: 'Bill -> First Reading -> Second Reading (Clause-by-Clause) -> Third Reading -> Presidential Assent -> LAW',
          highlightFact: 'Every year in February, the Finance Minister presents the national Budget to the Lok Sabha during Budget Session.',
          points: [
            'Question Hour: First hour of parliamentary sitting where MPs interrogate ministers.',
            'Zero Hour: Starts at 12 noon for raising matters of urgent public importance.',
            'No-Confidence Motion: Passed by Lok Sabha majority to dismiss the Council of Ministers.'
          ],
          mnemonic: 'Lok = People (5 yrs) | Rajya = States (Permanent, 1/3 retire every 2 yrs)!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match parliamentary terms with their constitutional definition!',
      instruction: 'Connect each parliamentary concept on the left with its definition on the right.',
      pairs: [
        { id: 'cp1', left: 'Lok Sabha', right: 'First House, directly elected by citizens (5 yr tenure)' },
        { id: 'cp2', left: 'Rajya Sabha', right: 'Permanent House (1/3rd members retire every 2 years)' },
        { id: 'cp3', left: 'Vice-President of India', right: 'Ex-officio Chairman of Rajya Sabha' },
        { id: 'cp4', left: 'Question Hour', right: 'Morning session where MPs question ministers' }
      ],
      explanation: 'Spot on! The Lok Sabha represents citizens directly, Rajya Sabha represents the constituent states, and the VP chairs Rajya Sabha.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'What is the minimum age required to contest elections for the Lok Sabha?',
        options: ['18 years', '21 years', '25 years', '30 years'],
        correctIndex: 2,
        explanation: 'Any Indian citizen who has completed 25 years of age is qualified to contest Lok Sabha elections (voting age is 18).'
      },
      {
        id: 'q2',
        question: 'Who is the ex-officio Chairman of the Rajya Sabha?',
        options: ['The Prime Minister', 'The President', 'The Vice-President of India', 'The Chief Justice'],
        correctIndex: 2,
        explanation: 'Article 64 of the Constitution designates the Vice-President of India as the ex-officio Chairman of the Rajya Sabha.'
      },
      {
        id: 'q3',
        question: 'Where can Money Bills be primarily introduced and passed?',
        options: ['Only in Rajya Sabha', 'Only in Lok Sabha', 'In either house equally', 'In Supreme Court'],
        correctIndex: 1,
        explanation: 'Money Bills relating to taxation and government finances can only be introduced in the Lok Sabha; Rajya Sabha has limited recommendatory powers.'
      }
    ]
  },

  // ==========================================
  // 4. GEOGRAPHY (Maharashtra State Board Std 8)
  // ==========================================
  {
    id: 'geo-local-standard-time',
    chapterNumber: 1,
    subject: 'Geography',
    title: 'Local Time and Standard Time',
    shortDesc: 'Earth rotation, 1° longitude = 4 mins, Indian Standard Time 82°30\'E Mirzapur, and Greenwich Mean Time.',
    difficulty: 'Easy',
    estimatedMin: 5,
    xpReward: 150,
    iconName: 'Globe',
    colorTheme: 'teal',
    step1_concept: {
      overview: 'The Earth rotates 360° from west to east in 24 hours. This means the Earth rotates by 15° in 1 hour, or 1° in exactly 4 minutes. Places on the same meridian share the same Local Time.',
      slides: [
        {
          title: 'Calculating Time Differences',
          subtitle: 'Longitudes ahead to the East, behind to the West',
          content: '• East of Prime Meridian: Time is ahead (+4 mins per degree).\n• West of Prime Meridian: Time is behind (-4 mins per degree).\n• Standard Time: Avoids chaos of multiple local times across a nation.\n• Indian Standard Time (IST): Set at 82°30\' E longitude passing near Mirzapur (Uttar Pradesh), exactly 5 hours 30 minutes ahead of GMT!',
          formulaOrRule: '360° / 24 hrs = 15° per hour -> 60 min / 15° = 4 minutes for each 1° longitude',
          highlightFact: 'Maharaja Sawai Jaisingh II built 5 historic astronomical observatories called Jantar Mantar (Jaipur, Delhi, Ujjain, Varanasi, Mathura) to track local sun time using shadows!',
          points: [
            'Noon is when the sun is at highest elevation; shadow is shortest.',
            'Earth is divided into 24 international time zones based on Greenwich Mean Time (0°).',
            'Large countries have multiple standard times: Canada has 6 standard time zones, Russia has 11!'
          ],
          mnemonic: 'East is Ahead (Add Time), West is Behind (Subtract Time)!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match longitude and time values!',
      instruction: 'Connect each longitude concept with its corresponding time value.',
      pairs: [
        { id: 'g1', left: 'Time taken by Earth to rotate 1°', right: '4 minutes' },
        { id: 'g2', left: 'Indian Standard Time (IST) meridian', right: '82° 30\' E (Mirzapur, UP)' },
        { id: 'g3', left: 'IST difference ahead of GMT', right: '+5 hours 30 minutes' },
        { id: 'g4', left: 'Earth rotation in 1 hour', right: '15° longitude' }
      ],
      explanation: 'Accurate navigation! 1° = 4 minutes, 15° = 1 hour, and Indian Standard Time is fixed at 82°30\' E (+5:30 GMT).'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'When it is 12:00 noon at Greenwich (0°), what is the local time at Mashad, Iran (60° E)?',
        options: ['8:00 AM', '4:00 PM (16:00)', '2:00 PM', '10:00 AM'],
        correctIndex: 1,
        explanation: 'Difference = 60° × 4 min = 240 min = 4 hours ahead. 12:00 noon + 4 hours = 4:00 PM.'
      },
      {
        id: 'q2',
        question: 'Which longitude is selected as the central meridian for Indian Standard Time (IST)?',
        options: ['73° E', '88° E', '82° 30\' E', '90° E'],
        correctIndex: 2,
        explanation: '82° 30\' E longitude passing through Mirzapur near Prayagraj represents the standard meridian for all of India.'
      },
      {
        id: 'q3',
        question: 'If the difference between two longitudes is 15°, what is the difference in their local times?',
        options: ['15 minutes', '30 minutes', '1 hour (60 minutes)', '2 hours'],
        correctIndex: 2,
        explanation: '15° × 4 minutes per degree = 60 minutes = 1 hour.'
      }
    ]
  },

  {
    id: 'geo-earth-interior',
    chapterNumber: 2,
    subject: 'Geography',
    title: 'Interior of the Earth & Discontinuities',
    shortDesc: 'Crust (Sial & Sima), Mantle (Asthenosphere), Core (Nife), Conrad & Moho discontinuities, and Geo-dynamo.',
    difficulty: 'Medium',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'Compass',
    colorTheme: 'teal',
    step1_concept: {
      overview: 'Formed 4.6 billion years ago, Earth cooled from the outside inward. Its interior consists of three concentric layers: Crust, Mantle, and Core, with temperature reaching 5500°C–6000°C at the centre.',
      slides: [
        {
          title: 'The Three Layers of Earth',
          subtitle: 'Crust, Mantle, and Core',
          content: '1. Crust (30–35 km): Sial (Silica + Aluminium, continental) and Sima (Silica + Magnesium, oceanic).\n2. Mantle (2870 km): Upper mantle (Asthenosphere, liquid magma chambers) and dense lower mantle.\n3. Core (3471 km): Liquid Outer Core (5000°C) and Solid Inner Core (Nife: Nickel + Ferrous iron).',
          formulaOrRule: 'Discontinuities: Conrad (Sial-Sima), Moho (Crust-Mantle), Gutenberg (Mantle-Core)',
          highlightFact: 'Spiral eddies of liquid iron in the rotating outer core generate the Geo-dynamo, creating Earth\'s protective Magnetosphere against solar winds!',
          points: [
            'Continental crust (Sial) is about 30 km thick (up to 40 km under mountains); Oceanic crust (Sima) is 7–10 km thick.',
            'Secondary seismic (S) waves cannot pass through liquid and are absorbed at the outer core (2900 km depth).',
            'Density increases with depth: from 2.65 g/cm³ in Sial to 13.3 g/cm³ in inner core.'
          ],
          mnemonic: 'Sial -> Sima -> Mantle -> Outer Liquid Core -> Inner Solid Nife!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match each interior layer of Earth with its composition and features!',
      instruction: 'Connect each geological layer on the left with its characteristics on the right.',
      pairs: [
        { id: 'c1', left: 'Continental Crust (Sial)', right: 'Silica + Aluminium (granite rocks)' },
        { id: 'c2', left: 'Oceanic Crust (Sima)', right: 'Silica + Magnesium (basalt & gabbro rocks)' },
        { id: 'c3', left: 'Upper Mantle (Asthenosphere)', right: 'Semi-liquid magma chambers of volcanic origin' },
        { id: 'c4', left: 'Inner Core (Nife)', right: 'Solid sphere of Nickel + Ferrous iron under extreme pressure' }
      ],
      explanation: 'Outstanding geology! Sial forms continents, Sima forms ocean floors, asthenosphere holds magma, and Nife forms the solid inner core.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'What is the discontinuity between the crust and mantle named?',
        options: ['Conrad discontinuity', 'Moho (Mohorovicic) discontinuity', 'Gutenberg discontinuity', 'Lehmann discontinuity'],
        correctIndex: 1,
        explanation: 'The discontinuity between the Earth\'s crust and the mantle is called the Moho (Mohorovicic) discontinuity.'
      },
      {
        id: 'q2',
        question: 'What elements are primarily present in the core of the Earth?',
        options: ['Silicon and Aluminium', 'Silicon and Magnesium', 'Nickel and Iron (Ferrous)', 'Copper and Zinc'],
        correctIndex: 2,
        explanation: 'The core is called Nife because it is made of Nickel (Ni) and Ferrous Iron (Fe).'
      },
      {
        id: 'q3',
        question: 'Why do scientists conclude that the Earth\'s outer core is in a liquid state?',
        options: [
          'Primary seismic waves accelerate',
          'Secondary seismic (S) waves cannot pass through it',
          'Bore holes have reached the core',
          'Volcanoes erupt from the core'
        ],
        correctIndex: 1,
        explanation: 'Secondary (S) seismic waves cannot travel through liquids and get completely absorbed at the 2900 km boundary.'
      }
    ]
  },

  {
    id: 'geo-ocean-floor',
    chapterNumber: 4,
    subject: 'Geography',
    title: 'Structure of Ocean Floor & Relief',
    shortDesc: 'Continental shelf, Continental slope, Abyssal plains, and the deepest Mariana Trench (11,034m).',
    difficulty: 'Easy',
    estimatedMin: 5,
    xpReward: 150,
    iconName: 'Compass',
    colorTheme: 'teal',
    step1_concept: {
      overview: 'Water covers 71% of the Earth\'s surface. Below the ocean water lies an undulating seabed with an average depth of 3700 metres, featuring mountains, valleys, and deep trenches.',
      slides: [
        {
          title: 'Relief of the Ocean Bed',
          subtitle: 'From coast to abyssal trenches',
          content: '• Continental Shelf: Shallow submerged coastland (up to 200m depth). Sunlight reaches here; plankton thrives, creating rich fishing grounds and oil fields (e.g. Mumbai High in Arabian Sea).\n• Continental Slope: Steep slope from 200m to 3600m; considered the boundary of continents.\n• Abyssal Plains: Flat vast deep seabed covered with fine oceanic oozes.\n• Marine Trenches: Deep, narrow clefts. The Mariana Trench in the Pacific is deepest at 11,034 metres!',
          formulaOrRule: 'Elevation: Mt. Everest (+8848 m) | Ocean Depth: Mariana Trench (-11034 m)',
          highlightFact: 'Rocks on the ocean floor are not older than 200 million years because new crust constantly forms at mid-oceanic ridges (Plate Tectonics)!',
          points: [
            'Marine islands (e.g. Andaman & Nicobar, Iceland) are peaks of submerged ocean mountain ranges.',
            'Oceanic oozes: Fine clay deposits made of 30% remains of marine organisms.',
            'Chennai mean sea level is used as the zero benchmark for elevation surveys in India.'
          ],
          mnemonic: 'Shelf (fish & oil) -> Slope -> Abyssal Plain -> Trench (Mariana 11km)!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match ocean floor zones with their key features!',
      instruction: 'Connect each ocean landform on the left with its characteristic on the right.',
      pairs: [
        { id: 'o1', left: 'Continental Shelf', right: 'Shallow (up to 200m), rich in fish & mineral oil' },
        { id: 'o2', left: 'Continental Slope', right: 'Steep drop (200m–3600m), continental boundary' },
        { id: 'o3', left: 'Mariana Trench', right: 'Deepest trench on Earth (11,034 m in Pacific)' },
        { id: 'o4', left: 'Submerged Mountain Peaks', right: 'Marine Islands (Andaman & Nicobar, Iceland)' }
      ],
      explanation: 'Spot on! The continental shelf supports fisheries and oil drilling, while the Mariana Trench plunges 11,034 m into the abyss.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Which part of the ocean floor is the most useful to mankind for fishing and mineral oil extraction?',
        options: ['Abyssal plains', 'Continental shelf', 'Continental slope', 'Marine deeps'],
        correctIndex: 1,
        explanation: 'The shallow continental shelf receives sunlight, growing algae and plankton that nurture massive fisheries and hold petroleum deposits like Mumbai High.'
      },
      {
        id: 'q2',
        question: 'What is the deepest marine trench in the world, and where is it located?',
        options: ['Java Trench in Indian Ocean', 'Mariana Trench in Pacific Ocean (11,034 m)', 'Puerto Rico Trench in Atlantic', 'Sunda Trench'],
        correctIndex: 1,
        explanation: 'The Mariana Trench in the Pacific Ocean reaches a staggering depth of around 11,034 metres below sea level.'
      },
      {
        id: 'q3',
        question: 'What percentage of the Earth\'s surface is occupied by oceans and water bodies?',
        options: ['29%', '50%', '71%', '85%'],
        correctIndex: 2,
        explanation: 'Around 71% of the Earth\'s surface is covered by ocean water, while continents make up 29%.'
      }
    ]
  },

  {
    id: 'geo-land-use-satbara',
    chapterNumber: 6,
    subject: 'Geography',
    title: 'Land Use, 7/12 Extract & Property Card',
    shortDesc: 'Rural vs urban land use, Central Business District (CBD), and reading the Maharashtra 7/12 (Satbara) extract.',
    difficulty: 'Easy',
    estimatedMin: 5,
    xpReward: 150,
    iconName: 'Globe',
    colorTheme: 'teal',
    step1_concept: {
      overview: 'Land use describes how land is utilized by human societies based on natural resources and development needs, categorized into Rural and Urban land use.',
      slides: [
        {
          title: 'Rural Land Use, Urban Land Use & 7/12 Extract',
          subtitle: 'Land governance in Maharashtra',
          content: '• Rural Land Use: Arable land (cultivated), Fallow land (temporarily rested for fertility), Forest land, and Village Pastureland.\n• Urban Land Use: Commercial (Central Business District like BKC or Fort in Mumbai), Residential, Transport, Public utility (schools, hospitals).\n• 7/12 (Satbara) Extract: Revenue department mirror of land ownership. Form 7 contains village rights, occupant class, and area; Form 12 records crop cultivation details.\n• Property Card: Registered ownership document for non-agricultural urban properties issued by urban survey offices.',
          formulaOrRule: 'Satbara = Village Form 7 (Rights & Ownership) + Village Form 12 (Crops & Cultivation)',
          highlightFact: 'In Maharashtra, the village Talathi maintains the 7/12 revenue register, and the District Collector oversees land governance.',
          points: [
            'Occupant Class 1: Inherited ancestral property with unrestricted transfer rights.',
            'Occupant Class 2: Land given by government to marginal/landless farmers; transfer requires Collector sanction.',
            'Planned Cities: Developed with pre-determined layouts to prevent urban congestion (e.g. Navi Mumbai, Chandigarh, Brasilia).'
          ],
          mnemonic: 'Form 7 = Owner & Rights | Form 12 = Crops & Fields!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match land use terms with their Maharashtra administrative role!',
      instruction: 'Connect each land use concept with its exact description.',
      pairs: [
        { id: 'lu1', left: '7/12 (Satbara) Extract', right: 'Mirror of rural agricultural land ownership' },
        { id: 'lu2', left: 'Property Card', right: 'Urban non-agricultural property register' },
        { id: 'lu3', left: 'Central Business District (CBD)', right: 'Commercial heart of city (e.g. BKC, Fort)' },
        { id: 'lu4', left: 'Fallow Land', right: 'Cultivable land left uncropped to restore fertility' }
      ],
      explanation: 'Excellent! Satbara records rural land, Property Card records urban plots, CBD concentrates commerce, and fallow land rebuilds soil fertility.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'What does "Village Form 7" in the 7/12 extract indicate?',
        options: ['Types of crops grown', 'Record of Rights, ownership and occupant class', 'Daily rainfall', 'Market prices of wheat'],
        correctIndex: 1,
        explanation: 'Village Form 7 gives the Record of Rights, occupant class, survey number, and ownership details.'
      },
      {
        id: 'q2',
        question: 'Which document registers ownership rights of non-agricultural land in urban areas?',
        options: ['7/12 extract', 'Property Card', 'Ration card', 'Voter ID'],
        correctIndex: 1,
        explanation: 'In urban municipal areas, ownership of non-agricultural property is officially recorded on the Property Card.'
      },
      {
        id: 'q3',
        question: 'What is the commercial core of a city with shops, banks, and corporate offices called?',
        options: ['Suburban zone', 'Central Business District (CBD)', 'Rural settlement', 'Fallow area'],
        correctIndex: 1,
        explanation: 'The Central Business District (CBD), such as BKC or Fort in Mumbai, concentrates corporate trade and administrative offices.'
      }
    ]
  },

  // ==========================================
  // 5. ENGLISH BALBHARATI (Maharashtra State Board Std 8)
  // ==========================================
  {
    id: 'eng-time-to-believe',
    chapterNumber: 1,
    subject: 'English',
    title: '1.1 A Time to Believe',
    shortDesc: 'Inspiring poem by B.J. Morbitzer exploring hope, miracles, Personification, and Epigram.',
    difficulty: 'Easy',
    estimatedMin: 5,
    xpReward: 140,
    iconName: 'BookOpen',
    colorTheme: 'purple',
    step1_concept: {
      overview: 'A philosophical and uplifting poem by B.J. Morbitzer encouraging readers to have faith, cherish life, and believe that miracles happen and dreams come true.',
      slides: [
        {
          title: 'Poem Overview & Imagery',
          subtitle: '"To believe is to know that everyday is a new beginning..."',
          content: 'The poet urges us to trust that life is a gift, to find inner courage when picking up the pieces after hardship, and to appreciate the nurturing heart, the innocence of a child\'s eyes, and the wisdom of an aging hand.',
          formulaOrRule: 'Figures of Speech: Personification & Epigram',
          highlightFact: 'An Epigram is a short, witty statement expressing a universal truth or moral proverb (e.g., "Life is a gift and this is our time to cherish it").',
          points: [
            'Stardust sky: Having a magical, hopeful quality.',
            'Personification: Giving human qualities to non-human elements ("angels dancing among the clouds").',
            'Within reach: Our highest aspirations are achievable if only we have faith in ourselves.'
          ],
          mnemonic: 'Believe: Every dawn brings a brand new beginning!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match lines from the poem with their figures of speech and meanings!',
      instruction: 'Connect each line on the left with its poetic device or meaning on the right.',
      pairs: [
        { id: 'ep1', left: '"To believe is to see angels dancing among the clouds"', right: 'Personification (Human action given to angels)' },
        { id: 'ep2', left: '"Everyday is a new beginning"', right: 'Epigram (General truth / Proverb-like statement)' },
        { id: 'ep3', left: '"Pick up the pieces"', right: 'Return to normal life after shock or disaster' },
        { id: 'ep4', left: '"Stardust sky"', right: 'Having a magical, wondrous quality' }
      ],
      explanation: 'Splendid! Angels dancing is Personification, general truths are Epigrams, and picking up the pieces signifies resilience.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Who is the author of the poem "A Time to Believe"?',
        options: ['William Shakespeare', 'B. J. Morbitzer', 'Rabindranath Tagore', 'Oscar Wilde'],
        correctIndex: 1,
        explanation: 'The inspirational poem "A Time to Believe" was composed by B. J. Morbitzer.'
      },
      {
        id: 'q2',
        question: 'What figure of speech is used in "To believe is to see angels dancing among the clouds"?',
        options: ['Simile', 'Personification', 'Alliteration', 'Hyperbole'],
        correctIndex: 1,
        explanation: 'Attributing the human action of \'dancing\' to non-human entities is Personification.'
      },
      {
        id: 'q3',
        question: 'According to the poet, what two qualities lie within us when it is time to begin again?',
        options: ['Wealth and fame', 'Strength and courage', 'Anger and grief', 'Pride and vanity'],
        correctIndex: 1,
        explanation: 'The poem says: "To believe is to find the strength and courage that lies within us, when it is time to pick up the pieces and begin again."'
      }
    ]
  },

  {
    id: 'eng-dick-whittington',
    chapterNumber: 2,
    subject: 'English',
    title: '1.2 Dick Whittington and his Cat',
    shortDesc: 'Classic English folktale of poor orphan Dick, his faithful mouser cat, and becoming thrice Lord Mayor of London.',
    difficulty: 'Easy',
    estimatedMin: 6,
    xpReward: 150,
    iconName: 'BookOpen',
    colorTheme: 'purple',
    step1_concept: {
      overview: 'The famous English legend of young orphan Dick Whittington who travels to London believing its streets are paved with gold, finds shelter with Mr. Fitzwarren, and whose cat brings him great fortune.',
      slides: [
        {
          title: 'From Poor Orphan to Lord Mayor of London',
          subtitle: 'Honesty, perseverance, and fortune',
          content: '• Dick is taken in by merchant Mr. Fitzwarren and sleeps in a rat-infested attic.\n• He buys a cat with his hard-earned pennies; the cat rids his attic of rats.\n• When Fitzwarren sends a trade ship to Barbary, Dick reluctantly contributes his only possession: his cat.\n• The King of Barbary\'s palace is plagued by rats. Dick\'s cat slays the rats, and the King pays ten times the ship\'s cargo value for the cat!\n• Dick becomes wealthy, marries Fitzwarren\'s daughter Alice, is knighted Sir Richard Whittington, and is elected Lord Mayor of London three times!',
          formulaOrRule: 'Key message: Honesty, hard work, and kindness overcome adversity.',
          highlightFact: 'The church bells of Bow at All Saints\' Day rang the prophetic chime: "Turn again Whittington, Thou worthy citizen, Lord Mayor of London!"',
          points: [
            'Attic: Small room under a pointed sloping roof.',
            'Mouser: An animal skilled at catching mice.',
            'Degrees of Comparison: great -> greater -> greatest; worthier -> worthiest.'
          ],
          mnemonic: 'Dick\'s cat turned hardship into London\'s highest honour!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match characters and plot events in Dick Whittington\'s journey!',
      instruction: 'Connect each character on the left with their action on the right.',
      pairs: [
        { id: 'dw1', left: 'Mr. Fitzwarren', right: 'Generous merchant who sheltered Dick in his kitchen' },
        { id: 'dw2', left: 'The Cat (Puss)', right: 'Chased away palace rats in Barbary, winning gold' },
        { id: 'dw3', left: 'The Cook', right: 'Bad-tempered woman who scolded Dick with a wooden spoon' },
        { id: 'dw4', left: 'Church Bells of Bow', right: 'Chimed "Turn again Whittington, Lord Mayor of London"' }
      ],
      explanation: 'Superb! Mr. Fitzwarren offered shelter, the cat proved invaluable to the King of Barbary, and the bells called Dick back.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Why did young Dick Whittington decide to walk to London originally?',
        options: [
          'To join the royal navy',
          'He believed London streets were paved with gold',
          'To buy a bakery shop',
          'To study law'
        ],
        correctIndex: 1,
        explanation: 'Dick overheard travellers say London streets were paved with gold and thought people would treat him kindly if he were rich.'
      },
      {
        id: 'q2',
        question: 'Why did the King and Queen of Barbary pay a huge fortune for Dick\'s cat?',
        options: [
          'The cat could talk',
          'The country suffered from a plague of rats and the cat eliminated them',
          'The cat had golden fur',
          'To keep as a royal pet'
        ],
        correctIndex: 1,
        explanation: 'The royal palace was overrun by rats that ate the royal dinner; Dick\'s cat pounced and freed the kingdom from the plague of rats.'
      },
      {
        id: 'q3',
        question: 'How many times was Sir Richard Whittington elected Lord Mayor of London?',
        options: ['Once', 'Twice', 'Three times', 'Five times'],
        correctIndex: 2,
        explanation: 'According to the legend and history, Dick Whittington was elected Lord Mayor of London three times.'
      }
    ]
  },

  {
    id: 'eng-vocation-tagore',
    chapterNumber: 2,
    subject: 'English',
    title: '2.1 Vocation by Rabindranath Tagore',
    shortDesc: 'A child\'s innocent perspective on freedom, the hawker, gardener, and watchman, written in Free Verse.',
    difficulty: 'Easy',
    estimatedMin: 5,
    xpReward: 150,
    iconName: 'BookOpen',
    colorTheme: 'purple',
    step1_concept: {
      overview: 'Rabindranath Tagore\'s endearing poem depicts a young schoolchild yearning for the perceived unconditional freedom of everyday working people.',
      slides: [
        {
          title: 'The Three Desires of the Child',
          subtitle: 'Morning, Afternoon, and Night',
          content: '• 10:00 AM: The Hawker crying "Bangles, crystal bangles!" - no road he must take, no hurry to return home.\n• 4:00 PM: The Gardener digging ground with his spade - soiling clothes with dust, nobody scolds him if he gets baked in sun.\n• Evening/Night: The Watchman walking the dark lonely lane - swinging his lantern, walking with his shadow, never once going to bed.',
          formulaOrRule: 'Style: Free Verse (poems without a uniform rhyme scheme or fixed meter)',
          highlightFact: 'Rabindranath Tagore was awarded the Nobel Prize in Literature in 1913 for Gitanjali!',
          points: [
            'Takes someone to task: Scolds and reprimands.',
            'Chasing the shadows: Pursuing an imaginary goal.',
            'One-eyed giant: Imagery comparing the lone red street lamp to Cyclops from Homer\'s Odyssey.'
          ],
          mnemonic: 'Hawker (no rush) -> Gardener (no scolding) -> Watchman (no bedtime)!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match the times of day with the professions observed by the speaker in "Vocation"!',
      instruction: 'Connect each time of day on the left with the worker observed on the right.',
      pairs: [
        { id: 'v1', left: '10:00 AM (Walking to school)', right: 'Hawker crying "Bangles, crystal bangles!"' },
        { id: 'v2', left: '4:00 PM (Coming back from school)', right: 'Gardener digging the ground with spade' },
        { id: 'v3', left: 'Night (Mother sends child to bed)', right: 'Watchman walking with lantern chasing shadows' },
        { id: 'v4', left: 'Poetic Structure of Vocation', right: 'Free Verse (no uniform rhyme scheme)' }
      ],
      explanation: 'Splendid! Tagore captures the child\'s innocent yearning for freedom throughout the day.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Who composed the poem "Vocation"?',
        options: ['William Wordsworth', 'Rabindranath Tagore', 'Sarojini Naidu', 'Oscar Wilde'],
        correctIndex: 1,
        explanation: 'The poem "Vocation" was composed by Nobel laureate Rabindranath Tagore.'
      },
      {
        id: 'q2',
        question: 'To what does the speaker compare the lone street lamp in the dark lane?',
        options: ['A burning torch', 'A giant with one red eye in its head', 'A shining star', 'A fiery comet'],
        correctIndex: 1,
        explanation: 'Tagore writes: "the street lamp stands like a giant with one red eye in its head" (a reference to the mythological Cyclops).'
      },
      {
        id: 'q3',
        question: 'Why does the child wish to be a gardener at 4 in the afternoon?',
        options: [
          'To grow colorful roses',
          'Because nobody takes the gardener to task if he gets baked in sun or soils his clothes',
          'To earn a lot of money',
          'To sell vegetables'
        ],
        correctIndex: 1,
        explanation: 'The child envies that the gardener can soil his clothes and dig in the heat without anyone reprimanding him.'
      }
    ]
  },

  {
    id: 'eng-ramanujan-1729',
    chapterNumber: 4,
    subject: 'English',
    title: '4.4 Ramanujan & The Taxi Number 1729',
    shortDesc: 'Srinivasa Ramanujan, G.H. Hardy at Cambridge, and the immortal taxicab number 1729.',
    difficulty: 'Medium',
    estimatedMin: 6,
    xpReward: 160,
    iconName: 'BookOpen',
    colorTheme: 'purple',
    step1_concept: {
      overview: 'The extraordinary intellectual partnership between Indian mathematical genius Srinivasa Ramanujan and English mathematician G.H. Hardy at Trinity College, Cambridge.',
      slides: [
        {
          title: 'The Genius of Srinivasa Ramanujan',
          subtitle: 'From poor Madras clerk to Fellow of the Royal Society',
          content: '• In 1913, G.H. Hardy received an untidy letter with Indian stamps containing wild, fantastic mathematical theorems without proofs from Ramanujan.\n• Hardy and Littlewood realized before midnight that the writer was a mathematical genius of the stature of Euler and Gauss.\n• Ramanujan came to Cambridge in 1914 and became a Fellow of Trinity College and the Royal Society at the young age of 30.\n• The Taxi-cab Incident: Hardy visited an ailing Ramanujan in Putney by taxi #1729, noting it seemed dull. Ramanujan instantly retorted: "No, Hardy! It is a very interesting number; it is the smallest number expressible as the sum of two cubes in two different ways!"',
          formulaOrRule: '1729 = 1³ + 12³ = 1 + 1728 | 1729 = 9³ + 10³ = 729 + 1000',
          highlightFact: '1729 is universally celebrated as the "Hardy-Ramanujan Number" across all mathematics!',
          points: [
            'Ramanujan was self-taught, possessing unmatched intuition for continued fractions and number theory.',
            'He was the first Indian to be elected a Fellow of Trinity College, Cambridge.',
            'Hardy ranked Ramanujan\'s natural genius at 100, Littlewood at 30, and himself at 25.'
          ],
          mnemonic: '1729 = 1³ + 12³ AND 9³ + 10³!'
        }
      ]
    },
    step2_practice: {
      type: 'matcher',
      prompt: 'Match key milestones in Ramanujan\'s life and mathematics!',
      instruction: 'Connect each milestone on the left with its details on the right.',
      pairs: [
        { id: 'r1', left: '1729', right: 'Smallest number sum of two cubes in 2 ways (1³+12³ and 9³+10³)' },
        { id: 'r2', left: 'G.H. Hardy', right: 'Eminent Cambridge mathematician who recognized Ramanujan\'s genius' },
        { id: 'r3', left: 'Fellow of Royal Society', right: 'Highest honour given to Ramanujan at age 30' },
        { id: 'r4', left: 'Goddess of Namakkal', right: 'Deity whose dream convinced Ramanujan\'s mother to permit travel' }
      ],
      explanation: 'Splendid! 1729 is the famous Hardy-Ramanujan number, Hardy invited him to England, and he became an honored FRS at age 30.'
    },
    step3_quiz: [
      {
        id: 'q1',
        question: 'Why is the number 1729 celebrated as the Hardy-Ramanujan number?',
        options: [
          'It is the largest prime number known in 1913',
          'It is the smallest number expressible as the sum of two cubes in two different ways',
          'It is the speed of light in vacuum',
          'It was Ramanujan\'s year of birth'
        ],
        correctIndex: 1,
        explanation: '1729 = 1³ + 12³ = 9³ + 10³, making it the smallest positive integer that can be written as the sum of two cubes in two distinct ways.'
      },
      {
        id: 'q2',
        question: 'At which prestigious university did Ramanujan collaborate with G.H. Hardy?',
        options: ['Oxford University', 'Trinity College, Cambridge', 'Harvard University', 'London School of Economics'],
        correctIndex: 1,
        explanation: 'Ramanujan did his groundbreaking research at Trinity College, Cambridge alongside G.H. Hardy and J.E. Littlewood.'
      },
      {
        id: 'q3',
        question: 'What mathematical distinction was awarded to Ramanujan at the young age of 30, making him the first Indian recipient?',
        options: ['Fields Medal', 'Fellow of the Royal Society (FRS)', 'Abel Prize', 'Nobel Prize in Math'],
        correctIndex: 1,
        explanation: 'Ramanujan was elected a Fellow of the Royal Society (FRS) in 1918 at age thirty, followed by fellowship of Trinity College.'
      }
    ]
  }
];

export const INITIAL_BADGES = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Completed your very first 3-Step Lesson!',
    icon: 'Footprints',
    unlocked: false,
    category: 'progress' as const
  },
  {
    id: 'math-whiz',
    title: 'Math Whiz',
    description: 'Mastered Rational Numbers, Expansion, or Area.',
    icon: 'Calculator',
    unlocked: false,
    category: 'mastery' as const
  },
  {
    id: 'science-explorer',
    title: 'Science Explorer',
    description: 'Aced Classification of Microbes, Atoms, or Force & Pressure.',
    icon: 'FlaskConical',
    unlocked: false,
    category: 'mastery' as const
  },
  {
    id: 'history-pundit',
    title: 'History & Civics Hero',
    description: 'Mastered the 1857 Struggle or Maharashtra Formation.',
    icon: 'Landmark',
    unlocked: false,
    category: 'mastery' as const
  },
  {
    id: 'geography-navigator',
    title: 'Globe Master',
    description: 'Conquered Local Time, Earth Interior, or Ocean Floor.',
    icon: 'Globe',
    unlocked: false,
    category: 'mastery' as const
  },
  {
    id: 'english-scholar',
    title: 'Balbharati Scholar',
    description: 'Mastered A Time to Believe, Dick Whittington, or Ramanujan 1729.',
    icon: 'BookOpen',
    unlocked: false,
    category: 'mastery' as const
  },
  {
    id: 'quiz-ace',
    title: 'Boss Quiz Ace',
    description: 'Scored 100% on any Step 3 Boss Quiz!',
    icon: 'Trophy',
    unlocked: false,
    category: 'mastery' as const
  },
  {
    id: 'streak-champ',
    title: 'Streak Flame',
    description: 'Maintained a multi-day study streak.',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: 'Unlocked today',
    category: 'streak' as const
  },
  {
    id: 'levelup-8-hero',
    title: 'Class 8 Champion',
    description: 'Earned over 500 XP in LevelUp 8.',
    icon: 'Crown',
    unlocked: false,
    category: 'progress' as const
  }
];
