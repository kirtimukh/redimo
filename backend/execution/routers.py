from fastapi import APIRouter, Response
from beanie import BeanieObjectId


from typing import List


router = APIRouter()


@router.get("/image")
async def get_image():
    img = open("backend/static/pexels-ralph-chang-866398.jpg", "rb").read()
    return Response(img, mimetype="image/jpg")
