/**
 * Mock / Offline Study Engine for StudyBuddy
 * Provides high-quality academic responses when no GEMMA_API_KEY is configured
 * or during offline/network failure scenarios.
 */

export function generateLocalStudyGuide(lectureText) {
  const isDBMS = /database|dbms|acid|relational|normalization|sql|transaction|table/i.test(lectureText);

  if (isDBMS) {
    return {
      title: "Database Management Systems (DBMS): Relational Model, ACID Properties & Normalization",
      estimatedReadingTime: "5 mins",
      subjectCategory: "Computer Science & Engineering – DBMS",
      summary: {
        shortSummary: "This lecture introduces the foundational pillars of modern Relational Database Management Systems (RDBMS). It explains how data is organized into structured relations (tables) with primary and foreign keys, explores the four critical ACID properties that safeguard transactional integrity, and breaks down the normalization pipeline (1NF, 2NF, 3NF) used to eliminate harmful data anomalies.",
        detailedExplanation: "A Database Management System (DBMS) is specialized software that provides an interface between end-user applications and raw physical storage. In a relational database, data is represented mathematically as relations (tables), rows as tuples (records), and columns as attributes (fields).\n\nWhen multiple operations execute together, they form a 'Transaction'. Transactions must satisfy ACID properties:\n1. Atomicity: The 'all-or-nothing' rule. If transferring money from Account A to Account B succeeds at deducting from A but fails before crediting B, the whole transaction rolls back.\n2. Consistency: The database must strictly transition from one valid state to another, obeying all integrity constraints.\n3. Isolation: Concurrent transactions execute without stepping on each other's toes, as if they were running serially.\n4. Durability: Once committed, updates persist permanently in non-volatile memory even in the event of an abrupt system power loss.\n\nFinally, normalization organizes table schemas systematically. 1NF ensures all attribute values are atomic (no arrays/comma-separated values). 2NF removes partial functional dependencies on candidate keys. 3NF ensures transitive dependencies are eliminated, preventing insert, update, and delete anomalies.",
        importantPoints: [
          "Tables are formally known as Relations; rows are Tuples, and column headings are Attributes.",
          "A Primary Key uniquely identifies each tuple and can never be NULL (Entity Integrity Constraint).",
          "A Foreign Key establishes a logical referential link to a Primary Key in another table (Referential Integrity).",
          "ACID properties (Atomicity, Consistency, Isolation, Durability) are essential for transactional guarantees in banking, ecommerce, and mission-critical systems.",
          "Normalization transforms unnormalized tables into 1NF, 2NF, and 3NF to prevent insertion, deletion, and modification anomalies."
        ],
        keyConcepts: [
          {
            "term": "Relation & Schema",
            "explanation": "A relation is a 2D table of data. The relational schema defines the design blueprint (table name, attribute names, and data types)."
          },
          {
            "term": "ACID Properties",
            "explanation": "Four fundamental rules that ensure database transactions are processed reliably, even during crashes or simultaneous user access."
          },
          {
            "term": "Functional Dependency (FD)",
            "explanation": "A constraint between two sets of attributes: X -> Y means the value of attribute set X uniquely determines the value of attribute set Y."
          },
          {
            "term": "Normalization Pipeline",
            "explanation": "The step-by-step process of decomposing tables into smaller well-structured tables to eliminate data redundancy without losing information."
          }
        ],
        definitions: [
          {
            "term": "Transaction",
            "definition": "A logical unit of database processing that includes one or more database access operations (read, write, commit, or rollback)."
          },
          {
            "term": "Primary Key",
            "definition": "A minimal superkey chosen by the database designer to uniquely identify individual tuples in a relation."
          },
          {
            "term": "Foreign Key",
            "definition": "An attribute or set of attributes in one relation that references the primary key of another relation to enforce referential integrity."
          },
          {
            "term": "Transitive Dependency",
            "definition": "An indirect functional dependency where A determines B and B determines C (A -> B and B -> C), implying A -> C."
          }
        ],
        keywords: [
          "DBMS",
          "Relational Model",
          "ACID",
          "Atomicity",
          "Consistency",
          "Isolation",
          "Durability",
          "1NF",
          "2NF",
          "3NF",
          "Functional Dependency",
          "Primary Key",
          "Foreign Key"
        ]
      },
      examMode: {
        importantTopics: [
          "Explain ACID properties with real-world banking transaction example (High Yield)",
          "Normalization rules: 1NF, 2NF, 3NF differences and decomposition",
          "Entity Integrity vs Referential Integrity constraints",
          "Anomalies in unnormalized databases (Insertion, Deletion, Update)"
        ],
        fiveImportantExamQuestions: [
          {
            "question": "1. Explain the ACID properties of a database transaction with a suitable banking example.",
            "marks": "5-10 Marks",
            "hint": "Define each letter (A, C, I, D) and trace a $500 money transfer from Account A to Account B through debit, crash scenario, and rollback."
          },
          {
            "question": "2. Differentiate between 1NF, 2NF, and 3NF with examples of functional dependencies.",
            "marks": "5-7 Marks",
            "hint": "1NF requires atomic values. 2NF removes partial dependency (non-prime depending on part of candidate key). 3NF removes transitive dependency."
          },
          {
            "question": "3. What are database anomalies? Explain insertion, deletion, and modification anomalies.",
            "marks": "5 Marks",
            "hint": "Show an unnormalized student-course table where deleting a student accidentally deletes the course catalog info."
          },
          {
            "question": "4. Distinguish between Primary Key, Candidate Key, and Foreign Key with table examples.",
            "marks": "5 Marks",
            "hint": "Explain uniqueness, non-null condition for primary keys, and referential integrity for foreign keys."
          },
          {
            "question": "5. What is the role of the Transaction Log (Write-Ahead Logging) in ensuring Durability and Atomicity?",
            "marks": "5 Marks",
            "hint": "Explain REDO and UNDO logs during recovery from unexpected system crashes."
          }
        ],
        threeShortAnswerQuestions: [
          {
            "question": "What is meant by the 'Atomicity' of a database transaction?",
            "marks": "2 Marks",
            "modelAnswer": "Atomicity states that all operations within a transaction must either complete successfully (commit) or none of them take effect (rollback). It is commonly known as the 'all-or-nothing' property."
          },
          {
            "question": "Why cannot a Primary Key attribute contain a NULL value?",
            "marks": "2 Marks",
            "modelAnswer": "According to the Entity Integrity Constraint, primary keys uniquely identify tuples. A NULL value represents an unknown or missing value, which would make row identification ambiguous."
          },
          {
            "question": "What is a Partial Functional Dependency?",
            "marks": "3 Marks",
            "modelAnswer": "A partial functional dependency occurs when a non-prime attribute depends on only a subset of a composite candidate key rather than the entire composite key. Tables in 2NF must eliminate partial dependencies."
          }
        ],
        twoLongAnswerQuestions: [
          {
            "question": "Discuss the process of Database Normalization up to 3NF. Illustrate how anomalies are resolved at each stage with a concrete relation.",
            "marks": "7 Marks",
            "answerOutline": [
              "1. Define Normalization and the three primary anomalies (Insertion, Deletion, Update).",
              "2. First Normal Form (1NF): Rule of atomicity, eliminating multi-valued attributes and repeating groups.",
              "3. Second Normal Form (2NF): Definition of prime attributes, full functional dependency, and decomposing composite key tables.",
              "4. Third Normal Form (3NF): Definition of transitive dependency (X -> Y and Y -> Z) and Boyce-Codd comparison.",
              "5. Comparative summary table showing Normal Form vs Violated Condition vs Remedy."
            ]
          },
          {
            "question": "Describe the Architecture of Database Transaction Management and how the DBMS guarantees ACID properties under concurrent access.",
            "marks": "7 Marks",
            "answerOutline": [
              "1. Define Transaction lifecycle states (Active, Partially Committed, Failed, Aborted, Committed).",
              "2. Detailed analysis of ACID components (Atomicity, Consistency, Isolation, Durability).",
              "3. Concurrency control mechanisms: Two-Phase Locking (2PL) and Serializability for Isolation.",
              "4. Recovery Manager mechanisms: Write-Ahead Logging (WAL), Checkpoints, and Undo/Redo protocols for Durability & Atomicity.",
              "5. Practical summary of trade-offs between isolation levels and throughput."
            ]
          }
        ],
        vivaQuestions: [
          {
            "question": "What does ACID stand for?",
            "answer": "Atomicity, Consistency, Isolation, and Durability."
          },
          {
            "question": "Which component in DBMS handles recovery after a crash?",
            "answer": "The Recovery Manager, using Write-Ahead Logging (WAL) and checkpoint records."
          },
          {
            "question": "Can a table have multiple candidate keys? How many primary keys can it have?",
            "answer": "Yes, a table can have multiple candidate keys, but exactly ONE is chosen as the primary key."
          },
          {
            "question": "What is the difference between 2NF and 3NF in one sentence?",
            "answer": "2NF eliminates partial dependencies on candidate keys, whereas 3NF eliminates transitive dependencies between non-key attributes."
          },
          {
            "question": "What happens if a foreign key references a non-existent primary key?",
            "answer": "The DBMS rejects the operation because it violates the Referential Integrity Constraint."
          }
        ]
      },
      quickRevision: {
        "oneMinuteRevision": [
          "Relations = Tables, Tuples = Rows, Attributes = Columns, Cardinality = Row count, Degree = Column count.",
          "Atomicity = All or nothing; Consistency = Preserves integrity rules; Isolation = Concurrency protection; Durability = Permanent commits.",
          "1NF = Atomic values only (no repeating groups).",
          "2NF = 1NF + No partial dependency (non-prime attributes must depend on the whole composite key).",
          "3NF = 2NF + No transitive dependency (no non-prime attribute determines another non-prime attribute)."
        ],
        "formulasOrRules": [
          {
            "name": "Entity Integrity Constraint",
            "statement": "No primary key attribute value can be NULL: PrimaryKey(R) != NULL for all tuples in relation R."
          },
          {
            "name": "Referential Integrity Constraint",
            "statement": "If FK in R1 references PK in R2, then FK value must either match an existing PK value in R2 or be entirely NULL."
          },
          {
            "name": "2NF Condition",
            "statement": "Relation R is in 2NF if it is in 1NF and for every functional dependency X -> A, where A is a non-prime attribute, X is not a proper subset of any candidate key."
          },
          {
            "name": "3NF Condition",
            "statement": "For every non-trivial functional dependency X -> A: either X is a superkey OR A is a prime attribute (part of a candidate key)."
          }
        ],
        "rememberThese": [
          "Never confuse Candidate Key with Superkey: All candidate keys are minimal superkeys, but not all superkeys are candidate keys.",
          "In 2NF, check only composite primary keys! If a relation has a single-attribute primary key and is in 1NF, it is AUTOMATICALLY in 2NF.",
          "Examiners frequently deduct marks if you forget to explain the 'Rollback' mechanism when illustrating Atomicity."
        ]
      }
    };
  }

  // Generic fallback for any user lecture text
  const cleanText = lectureText.trim();
  const sentences = cleanText.split(/(?<=[.?!])\s+/).filter(s => s.length > 15);
  const words = cleanText.split(/\s+/).filter(w => w.length > 3);
  
  // Extract top frequent non-stop words
  const stopWords = new Set(["this", "that", "with", "from", "have", "were", "which", "there", "their", "about", "would", "these", "other", "could", "should"]);
  const wordFreq = {};
  words.forEach(w => {
    const lower = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (lower.length > 3 && !stopWords.has(lower)) {
      wordFreq[lower] = (wordFreq[lower] || 0) + 1;
    }
  });
  const topKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));

  const subjectGuess = topKeywords.slice(0, 3).join(", ") || "General Studies";
  const firstSentence = sentences[0] || "This lecture explores key academic concepts and practical methodologies.";
  const midSentences = sentences.slice(1, 5).join(" ") || cleanText.slice(0, 300);

  return {
    title: `Lecture Study Guide: Fundamentals of ${topKeywords[0] || "the Topic"}`,
    estimatedReadingTime: `${Math.max(2, Math.ceil(words.length / 150))} mins`,
    subjectCategory: `Academic Study: ${subjectGuess}`,
    summary: {
      shortSummary: `${firstSentence} This study module synthesizes the essential arguments, underlying logic, and practical applications outlined across the lecture material.`,
      detailedExplanation: `In this lecture, the instructor covers the fundamental principles of the topic:\n\n${midSentences}\n\nUnderstanding these foundations allows students to connect theoretical models with practical problem-solving strategies required in university coursework and real-world implementation.`,
      importantPoints: sentences.slice(0, 5).map((s, idx) => `Key takeaway ${idx + 1}: ${s}`) || [
        "Core foundational definitions and historical context.",
        "Primary principles and theoretical framework.",
        "Mechanisms and functional workflows presented in the lecture.",
        "Practical advantages, constraints, and standard use-cases.",
        "Summary conclusions and revision priorities for tests."
      ],
      keyConcepts: (topKeywords.slice(0, 4).map((kw) => ({
        term: kw,
        explanation: `Crucial subject component discussed in the lecture regarding ${kw.toLowerCase()} and its practical relevance.`
      }))),
      definitions: (topKeywords.slice(0, 4).map((kw) => ({
        term: kw,
        definition: `Formal academic term denoting the property or structure of ${kw.toLowerCase()} as introduced in the lecture.`
      }))),
      keywords: topKeywords.length > 0 ? topKeywords : ["Concepts", "Theory", "Application", "Analysis", "Revision"]
    },
    examMode: {
      importantTopics: [
        `Core principles and mechanism of ${topKeywords[0] || "the subject"}`,
        `Comparative analysis of ${topKeywords[1] || "key methods"} and standard practices`,
        `Real-world applications and exam problem-solving patterns`
      ],
      fiveImportantExamQuestions: [
        {
          "question": `1. Explain the fundamental principles of ${topKeywords[0] || "the topic"} in detail.`,
          "marks": "5 Marks",
          "hint": "Provide the formal definition, state the governing assumptions, and illustrate with a clean block diagram."
        },
        {
          "question": `2. What are the key advantages and practical limitations of ${topKeywords[1] || "this methodology"}?`,
          "marks": "5 Marks",
          "hint": "Structure your answer into two columns: Advantages vs Limitations with 3 distinct points each."
        },
        {
          "question": `3. Discuss the architectural workflow or mechanism described in the lecture.`,
          "marks": "5 Marks",
          "hint": "Walk through the sequential stages from input to final processing outcome."
        },
        {
          "question": `4. Compare and contrast ${topKeywords[0] || "Concept A"} with ${topKeywords[2] || "traditional approaches"}.`,
          "marks": "5 Marks",
          "hint": "Highlight performance, complexity, efficiency, and resource utilization differences."
        },
        {
          "question": `5. Describe a step-by-step problem-solving strategy based on this lecture's core topic.`,
          "marks": "5 Marks",
          "hint": "State the problem statement, algorithm/formula steps, and expected solution."
        }
      ],
      threeShortAnswerQuestions: [
        {
          "question": `Define ${topKeywords[0] || "the core concept"} in 2-3 concise sentences.`,
          "marks": "2 Marks",
          "modelAnswer": `${firstSentence.slice(0, 140)}.`
        },
        {
          "question": `State two primary reasons why ${topKeywords[1] || "this topic"} is significant.`,
          "marks": "2 Marks",
          "modelAnswer": "Firstly, it provides systematic structure and efficiency; secondly, it minimizes errors and simplifies ongoing maintenance."
        },
        {
          "question": `What is the main challenge encountered when implementing ${topKeywords[2] || "this method"}?`,
          "marks": "3 Marks",
          "modelAnswer": "The primary challenge involves managing resource overhead, boundary edge cases, and ensuring strict adherence to validation constraints."
        }
      ],
      twoLongAnswerQuestions: [
        {
          "question": `Provide a comprehensive analysis of ${topKeywords[0] || "the lecture topic"}. Include definitions, structural breakdown, and practical relevance.`,
          "marks": "7 Marks",
          "answerOutline": [
            "1. Introduction: Scope, definitions, and contextual motivation.",
            "2. Core Concepts: In-depth breakdown of primary components and internal relations.",
            "3. Case Study / Application: Demonstrating the concept in a practical scenario.",
            "4. Critical Evaluation: Trade-offs, common bottlenecks, and mitigation strategies.",
            "5. Conclusion and Exam Takeaway summary."
          ]
        },
        {
          "question": `Critically examine the methodology of ${topKeywords[1] || "the subject"}, detailing its operational workflow and edge cases.`,
          "marks": "7 Marks",
          "answerOutline": [
            "1. Architectural Overview and foundational terminology.",
            "2. Step-by-step execution cycle with illustrative diagram description.",
            "3. Mathematical or logical verification rules.",
            "4. Comparative benchmarks against alternative frameworks.",
            "5. Future trends and academic recommendations."
          ]
        }
      ],
      vivaQuestions: [
        {
          "question": `What is the single most important definition from this lecture?`,
          "answer": `${topKeywords[0] || "The primary subject"} and its role in structured analysis.`
        },
        {
          "question": `Can you explain the main goal of ${topKeywords[1] || "this method"} in one sentence?`,
          "answer": "To deliver reliable, optimized results while maintaining strict structural consistency."
        },
        {
          "question": `What is the primary constraint to watch out for?`,
          "answer": "Handling edge cases where input conditions deviate from standard assumptions."
        },
        {
          "question": `How does this relate to broader university curriculum topics?`,
          "answer": "It serves as a core building block for subsequent advanced topics and semester projects."
        },
        {
          "question": `What happens if validation is omitted during execution?`,
          "answer": "It leads to data corruption, unexpected exceptions, or incorrect algorithmic outcomes."
        }
      ]
    },
    quickRevision: {
      "oneMinuteRevision": sentences.slice(0, 4).map(s => s.slice(0, 120)) || [
        "Remember the primary definition and core operational principle.",
        "Review the 3-step sequence introduced in the lecture.",
        "Check boundary conditions before attempting numericals or derivations.",
        "Ensure terminology matches textbook standards for full marks."
      ],
      "formulasOrRules": [
        {
          "name": `Core Governing Rule of ${topKeywords[0] || "the Topic"}`,
          "statement": `All structural components must satisfy consistency constraints: State(T2) = f(State(T1), Parameters).`
        }
      ],
      "rememberThese": [
        `Don't confuse ${topKeywords[0] || "primary term"} with generic terminology; state the exact definition in exams.`,
        "Always write point-wise answers with subheadings to score maximum marks in 7-mark questions.",
        "Keep viva answers direct and confident; start with the definition before elaborating."
      ]
    }
  };
}
