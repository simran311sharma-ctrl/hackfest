/**
 * High-quality sample DBMS lecture for instant hackathon demonstrations.
 * Covers Relational Model, Keys, ACID Properties with bank transaction example, and Normalization.
 */

export const DEMO_LECTURE = {
  title: "DBMS Lecture: Relational Model, ACID Properties & Normalization",
  subject: "Database Management Systems (CS 301)",
  fileName: "DBMS_Lecture_Unit3_Transactions_Normalization.txt",
  content: `COURSE: Computer Science & Engineering - Database Management Systems (CS 301)
LECTURE TITLE: Unit 3: Relational Model, Transaction Processing, ACID Properties, and Normalization
PROFESSOR: Dr. K. Sharma
SEMESTER: 5th Semester

--- LECTURE TRANSCRIPT & NOTES ---

1. INTRODUCTION TO RELATIONAL DATABASES
Good morning class. Today we are diving into core relational database concepts, transaction management, and normalization. 

In a Relational Database Management System (RDBMS), data is stored in two-dimensional tables known formally as 'Relations'. 
- A table row is called a 'Tuple' (representing a single entity record).
- A column header is called an 'Attribute' (representing a property or field).
- The number of tuples in a relation is known as its 'Cardinality'.
- The number of attributes in a relation is known as its 'Degree'.

Keys are fundamental to identifying tuples:
1. Superkey: Any set of attributes that uniquely identifies a tuple.
2. Candidate Key: A minimal superkey having no redundant attributes.
3. Primary Key: The specific candidate key chosen by the database architect to uniquely identify records. Crucially, by the Entity Integrity Constraint, no primary key attribute can ever contain a NULL value.
4. Foreign Key: An attribute in one table that references the primary key of another table to maintain Referential Integrity.

2. DATABASE TRANSACTIONS & THE ACID PROPERTIES
Now let us focus on what happens when multiple operations execute together as a single logical unit of work. We call this a 'Transaction'.

Consider a classic banking example: Student Alice wants to transfer $1000 from her Checking Account (A) to Bob's Savings Account (B).
A transfer transaction consists of four sequential steps:
  Step 1: Read(A)
  Step 2: A = A - 1000; Write(A)
  Step 3: Read(B)
  Step 4: B = B + 1000; Write(B)

What happens if the bank's power fails or the server crashes immediately after Step 2?
Alice's account has lost $1000, but Bob never received it! Money has literally vanished. This is unacceptable.

To prevent such catastrophic anomalies, every DBMS must strictly enforce the four ACID properties:

1. ATOMICITY:
The 'All-or-Nothing' rule. Either all steps in the transaction complete successfully and are committed, or if any failure occurs before the final commit, the entire transaction is rolled back and undone as if it never happened. The DBMS Recovery Manager achieves this using Write-Ahead Logging (WAL).

2. CONSISTENCY:
The database must move from one valid state to another valid state, preserving all integrity constraints (like account balance >= 0, foreign keys, and unique constraints). The sum of Alice and Bob's balances must remain unchanged before and after the transfer.

3. ISOLATION:
Even when hundreds of transactions run concurrently on the server, each transaction must execute without interference from others. The intermediate state of a transaction must not be visible to other transactions until it has committed. Concurrency Control components use techniques like Two-Phase Locking (2PL) and Timestamp Ordering to guarantee serializability.

4. DURABILITY:
Once a transaction issues a COMMIT command and receives confirmation, all changes to the database become permanent and survive even subsequent hardware crashes or power outages. Changes are safely flushed from volatile RAM to non-volatile disk/storage.

3. DATABASE NORMALIZATION (1NF, 2NF, 3NF)
Next, let us discuss Normalization. When we design tables poorly with excessive redundancy, we suffer from three major anomalies:
- Insertion Anomaly: Cannot record certain facts without artificially adding unrelated records.
- Deletion Anomaly: Deleting one piece of data accidentally wipes out other critical information.
- Update/Modification Anomaly: Inconsistent data because an update must be performed across hundreds of redundant rows.

To solve this, Dr. E.F. Codd proposed Normal Forms based on Functional Dependencies (FDs). 
A Functional Dependency X -> Y means the value of attribute set X uniquely determines attribute set Y.

First Normal Form (1NF):
- A relation is in 1NF if and only if all attribute values are atomic (indivisible). 
- No multi-valued attributes (e.g., storing multiple phone numbers separated by commas in a single cell is prohibited).
- No repeating groups.

Second Normal Form (2NF):
- The relation must already be in 1NF.
- It must have NO partial functional dependencies. 
- That means no non-prime attribute should be functionally dependent on a proper subset of any candidate key.
- Important exam tip: If a relation's primary key consists of only a single attribute (not composite), and the relation is in 1NF, it is automatically in 2NF!

Third Normal Form (3NF):
- The relation must already be in 2NF.
- It must have NO transitive functional dependencies.
- A transitive dependency occurs when A -> B and B -> C, where neither B nor C is a candidate key. Non-key attributes must never determine other non-key attributes!
- Formal rule: For every non-trivial functional dependency X -> A, either X is a superkey OR A is a prime attribute.

4. SUMMARY & EXAM REVISION TIPS
For your upcoming midterms and end-sem exams:
- Always draw the state transition diagram of a transaction (Active -> Partially Committed -> Committed / Failed -> Aborted).
- When asked about ACID, clearly mention the banking debit/credit example and explain Rollback.
- When asked about Normalization, provide 1NF, 2NF, and 3NF definitions, explain what anomaly each form eliminates, and show table decomposition.
- For Viva: Expect questions on WAL (Write Ahead Logging), Dirty Read anomaly, and the difference between Candidate Key and Superkey.`
};
