from fastapi import APIRouter, Depends, HTTPException
from beanie import BeanieObjectId

from execution.models import (
    Task,
    ActionGroup,
    XBoard,
    LogEntry,
)
from execution.schemas import (
    ActionGroupCreate,
    XBoardCreate,
    XBoardRead,
)

from typing import List


router = APIRouter()


@router.get("/all", response_model=List[XBoardRead])
async def list_xboards():
    xboards = await XBoard.find_all().to_list()
    xboards = [XBoardRead(**xboard.model_dump()) for xboard in xboards]
    return xboards


@router.get("/{xboard_id}", response_model=XBoardRead)
async def get_xboard(xboard_id: str):
    xboard = await XBoard.get(xboard_id)
    xboard = XBoardRead(**xboard.model_dump())
    if xboard:
        return xboard
    raise HTTPException(status_code=404, detail="xboard not found")


@router.post("/create", response_model=XBoardCreate)
async def create_xboard(xboard: XBoardCreate):
    xboard = xboard.model_dump()
    xboard = XBoard(**xboard, owner=BeanieObjectId("5eb7cf5a86d9755df3a6c593"))
    await xboard.create()
    return xboard


@router.post("/{xboard_id}/add_action_group")
async def add_action_group(xboard_id: str, action_group: ActionGroupCreate):
    action_group = action_group.model_dump()
    action_group = ActionGroup(**action_group, xboard=BeanieObjectId(xboard_id))
    await action_group.create()
    return {"message": "ActionGroup added to XBoard successfully"}
