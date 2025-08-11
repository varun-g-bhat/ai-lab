from fastapi import APIRouter, Cookie, Request
from .helper import generate_roadmap,generate_content, generate_hints
from fastapi.responses import JSONResponse


router = APIRouter()

#For generating the Roadmap of the topic
@router.post("/roadmap")
async def roadmap(topic: str,token: str = Cookie(None)):
    roadmap = await generate_roadmap(topic)
    return roadmap

#For generating the Content of the roadmap topic
@router.post("/roadmap/generatecontent")
async def generate_roadmap_content(request: Request,token: str = Cookie(None)):
    topic= await request.json()
    print(topic)
    roadmap = await generate_content(topic)
    return roadmap


# @router.post("/generate/hints")
# async def generate_hints_router(question:str, code:str, token: str = Cookie(None)):
#     hints = await generate_hints(question, code)
#     return JSONResponse(content={"hints": hints})


@router.post("/generate/hints")
async def generate_hints_router(question: str, code: str, token: str = Cookie(None)):
    """
    FastAPI endpoint to generate hints for a given coding problem and submission.
    """
    # In a production app, it's better to receive the question and code
    # in the request body using a Pydantic model for validation.
    # Example:
    # class HintRequest(BaseModel):
    #     question: str
    #     code: str
    # async def generate_hints_router(request: HintRequest, ...):
    
    try:
        # Call the helper function to get the hints
        hints_dict = await generate_hints(question, code)
        
        # The 'hints_dict' will be a dictionary like {'hint': ['hint 1', 'hint 2']}
        # We extract the list of hints to return it in the final JSON response.
        return JSONResponse(content={"hints": hints_dict.get("hint", [])})
    except Exception as e:
        # It's good practice to log the error and return a generic error message.
        print(f"An error occurred while generating hints: {e}")
        return JSONResponse(
            status_code=500, 
            content={"message": "An internal error occurred. Failed to generate hints."}
        )
