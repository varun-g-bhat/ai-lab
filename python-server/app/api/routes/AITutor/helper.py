from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel
from typing import List, Optional
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from bson import ObjectId

async def generate_roadmap(topic):
    model = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.4)
    
    class RoadMapItem(BaseModel):
        lessonNumber: int
        lessonName: str
        objective: str
        topic: Optional[str] = []

    class RoadMap(BaseModel):
        Image: str
        RoadMapFor: str
        Outcome: str
        RoadMap: List[RoadMapItem]


    parser = JsonOutputParser(pydantic_object=RoadMap)

    prompt = PromptTemplate(
        template="""
        You are an expert in instructional design. Your task is to create a detailed roadmap for the {text}: [Insert Topic Here]. The roadmap should be divided into [Insert Number] lessons, each with a clear name, objective, and a list of topics covered in the lesson. Each lesson should be designed to build upon the previous ones, ensuring a comprehensive understanding of the topic.

    For each lesson, provide the following:\n{format_instructions}\n
    Image: [general image link from google images of topic for which roadmap is generated]\n
    RoadMapFor: [general name of topic for which roadmap is generated]\n
    Outcome: [overall outcome generated after completing this course]\n
    1. **Lesson [Lesson Number] - [Lesson Name]**
    - **Objective:** A brief description of the goal for this lesson.
    - **Topics in the lesson:**
        - Topic 1
        - Topic 2
        - Topic 3
        - ...

    Repeat this structure for each lesson. Ensure that the lessons cover all essential aspects of the topic thoroughly and logically. Based on your analysis, generate an appropriate number of lessons to provide a complete educational roadmap for the topic.
    must include ```json at the start of the response""",
        input_variables=["text"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = prompt | model | parser
    response = chain.invoke({f"text": topic})
    return response


async def generate_content(topic):
    model = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.4)
    
#     prompt = PromptTemplate(
#         template="""
# You are an expert tutor tasked with creating a comprehensive lesson on a specific topic. 
# The user will provide you with the lesson details in a JSON format, including the lesson number, name, objective, and 
# topics to cover. Your task is to generate a detailed explanation for each topic, complete with examples, questions 
# for practice, and a personalized, engaging narrative. The goal is to make the lesson as thorough and interactive as
#  possible, just like a dedicated tutor would {details}
#  """,
#         input_variables=["details"],
        
#     )

    prompt = PromptTemplate(
    template="""
        You are an expert educator and tutor known for crafting comprehensive, engaging, and student-friendly lessons. 
        You will receive lesson details in JSON format, including the lesson number, title, objective, and topics to cover.

        Your task is to create a rich, interactive lesson that includes the following for *each* topic:

        1. **Clear Explanation**: Provide a detailed yet accessible explanation of the concept.
        2. **Real-World Examples**: Include relevant, relatable examples to solidify understanding.
        3. **Practice Questions**: Offer at least 3 practice questions per topic, including a mix of multiple choice, short answer, and application-based questions.
        4. **Answers & Explanations**: Include detailed solutions or explanations for each practice question.
        5. **Interactive Elements**: Suggest activities, analogies, visualizations, or mini-projects that could make the learning more hands-on and engaging.
        6. **Personalized Tone**: Use an encouraging, conversational style as if tutoring a curious learner one-on-one. Feel free to use metaphors, stories, or humor to keep the content lively and relatable.
        7. **Lesson Summary**: End the lesson with a brief recap and key takeaways to reinforce the main points.

        The goal is to make the material as interactive and digestible as possible, while also challenging the learner to think critically and apply what they've learned.

        Now, using the following input, generate a full lesson:
        {details}
    """,
    input_variables=["details"],
)

    chain = prompt | model 
    response = chain.invoke({f"details": topic})
    return response


async def generate_clues(topic):
    model = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.4)
    
    prompt = PromptTemplate(
        template="""
        You are an expert in creating educational content. Your task is to generate a set of engaging and thought-provoking clues for a lesson on the topic: {text}. 
        The clues should be designed to stimulate critical thinking and encourage learners to explore the topic further.

        Please provide 5 clues, each with a brief explanation of its relevance to the topic. The clues should be diverse in nature, covering different aspects of the topic.
        """,
        input_variables=["text"],
    )

    chain = prompt | model
    response = chain.invoke({f"text": topic})
    return response


# async def generate_hints(question: str, code: str):
#     class Hint(BaseModel):
#         hint: List[str]

#     parser = JsonOutputParser(pydantic_object=Hint)

#     model = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.4)
#     prompt = PromptTemplate(
#         template = """
#         You are a precise and disciplined lab assistant helping students understand and solve coding problems.

#         Your task:
#         1. Analyze the coding problem in {{question}}.
#         2. Review the code submitted in {{code}}.
#         3. Provide to-the-point hints that help the user:
#         - Understand what the code is doing.
#         - Spot mistakes or logical errors.
#         - Identify edge cases they might be missing.
#         - Think in the right direction without directly giving code.

#         Rules:
#         - Do not include or generate any code.
#         - Do not solve the problem for the user.
#         - Offer only targeted guidance, hints, or leading questions.
#         - Do not repeat the full code or question unless needed to reference a specific part.
#         - Be accurate, minimal, and helpful — no fluff.

#         ---

#         Coding Problem:
#         {{question}}

#         User Submission:
#         {{code}}

#         Now provide your analysis and hints only.
#     """,
#         input_variables=["question", "code"],
#         partial_variables={"format_instructions": parser.get_format_instructions()},
#     )

    

#     chain = prompt | model | parser
#     response = chain.invoke({f"question": question, "code": code})
#     print(response)
#     return response



async def generate_hints(question: str, code: str):
    """
    Analyzes a coding problem and user's code to generate helpful hints.

    Args:
        question: The coding problem description.
        code: The user's submitted code.

    Returns:
        A dictionary containing a list of hints, matching the Hint Pydantic model.
    """
    # 1. Define the desired Pydantic output structure. This defines the schema
    #    that the JSON output should follow.
    class Hint(BaseModel):
        hint: List[str]

    # 2. Create a JSON parser instance, passing the Pydantic model to it.
    #    This parser will both generate format instructions and parse the output.
    parser = JsonOutputParser(pydantic_object=Hint)

    # 3. Set up the language model.
    #    Ensure your GOOGLE_API_KEY is set as an environment variable.
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.4)

    # 4. Create the prompt template.
    #    Crucially, we add the {format_instructions} placeholder. The parser will
    #    replace this with the specific JSON schema the model needs to follow.
    prompt = PromptTemplate(
        template="""
You are a precise and disciplined lab assistant helping students solve coding problems.

Your task is to analyze the coding problem and the user's submitted code, then provide to-the-point hints.

Rules:
- Do not generate code.
- Do not solve the problem for the user.
- Offer only targeted guidance, hints, or leading questions.
- Be accurate, minimal, and helpful.

---

Coding Problem:
{question}

User Submission:
{code}

---
Based on the problem and the submission, provide your hints.
{format_instructions}
""",
        input_variables=["question", "code"],
        # This line injects the JSON formatting instructions into the template
        # where {format_instructions} is placed.
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    # 5. Create the chain by piping the components together.
    chain = prompt | model | parser

    # 6. Invoke the chain asynchronously with the user's input.
    #    The key names ("question", "code") must match the input_variables.
    response = await chain.ainvoke({"question": question, "code": code})
    
    print("Successfully parsed response:", response)
    return response


async def generate_quiz(problem_description, code, language):
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.4)

    class QuestionItem(BaseModel):
        questionNo: int
        question: str
        options: List[str] 
        answer: str

    class Quiz(BaseModel):
        testName: str
        testDescription: str
        totalQuestions: int
        questions: List[QuestionItem]
        difficulty: str

    parser = JsonOutputParser(pydantic_object=Quiz)
    prompt = PromptTemplate(
        template="""
        You are a senior prompt engineer and a subject matter expert in software development and technical recruiting. Your task is to generate a comprehensive, valid JSON-formatted quiz for job role preparation. The quiz will be based on a provided problem description and its corresponding code solution.

        ## **Role and Context**

        You are an expert quiz creator specializing in technical interview preparation. Your goal is to create a quiz that assesses a candidate's understanding of core programming concepts, problem-solving skills, and code analysis abilities, **without being tied to a specific programming language**.

        ---

        ## **Core Instructions**

        Generate a JSON object that contains a complete quiz with exactly 10 questions. The quiz must be derived from the provided `problem_description` and `code`. Ensure the questions test a candidate's understanding of the underlying logic, data structures, algorithms, and edge cases, rather than just syntax.

        ---

        ## **Output Requirements (JSON Structure)**

        Your output **must be a single, valid JSON object** with the following keys:
        * `testName`: A descriptive and professional name for the test, tailored to the job role.
        * `testDescription`: A concise explanation of the test's purpose and what it evaluates.
        * `totalQuestions`: The integer value `10`.
        * `questions`: A JSON array containing 10 question objects. Each object in this array must contain the following keys:
            * `questionNo`: The question's number (1 through 10).
            * `question`: The text of the question, clearly and concisely worded.
            * `options`: An array of exactly four strings, representing the possible answers.
            * `answer`: A string that matches one of the options, representing the correct answer.
        * `difficulty`: A string indicating the quiz difficulty level (e.g., "Beginner," "Intermediate," "Advanced"), determined by the complexity of the problem and code.

        ---

        ## **Input Variables**

        You will be provided with the following information, which you must use as the basis for your quiz:
        * `{problem_description}`: A detailed explanation of the programming problem.
        * `{code}`: The code solution for the problem, which may be in any programming language.
        * `{language}`: The name of the programming language used in the `{code}`.

        ---

        ## **Constraints and Guarantees**

        * **Language Agnostic**: **Do not create questions that require knowledge of the specific syntax** of the `{language}` provided. The questions should focus on the logic, algorithm, and data structures. For example, instead of asking "What is the syntax for a for-loop in Python?", ask "What is the time complexity of the given algorithm?" or "What data structure is most suitable for this problem?".
        * **Validity**: The final output **must be valid JSON**. Double-check for correct syntax, commas, brackets, and quotes.
        * **Precision**: The questions and answers must be accurate and directly related to the provided problem and code.
        * **Brevity**: Ensure all descriptions and questions are concise but complete. Avoid conversational filler.
        """,
        input_variables=["problem_description", "code", "language"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = prompt | model | parser
    response = chain.invoke({"problem_description": problem_description, "code": code, "language": language})
    return response



