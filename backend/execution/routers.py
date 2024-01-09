from fastapi import APIRouter, Depends, HTTPException

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


@router.get("/xboard/{xboard_id}", response_model=XBoardRead)
async def get_xboard(xboard_id: str):
    xboard = await XBoard.get(xboard_id)
    xboard = XBoardRead(**xboard.model_dump())
    if xboard:
        return xboard
    raise HTTPException(status_code=404, detail="xboard not found")


@router.post("/xboard", response_model=XBoardCreate)
async def create_xboard(xboard: XBoardCreate):
    xboard = xboard.model_dump()
    xboard = XBoard(**xboard)
    await xboard.create()
    return xboard


@router.get("/xboards", response_model=List[XBoardRead])
async def list_xboards():
    xboards = await XBoard.find_all().to_list()
    xboards = [XBoardRead(**xboard.model_dump()) for xboard in xboards]
    return xboards


@router.post("/xboard/{xboard_id}/add_action_group")
async def add_action_group(xboard_id: str, action_group: ActionGroupCreate):
    action_group = action_group.model_dump()
    action_group = ActionGroup(**action_group)
    xboard = await XBoard.get(xboard_id)
    if xboard:
        xboard.tasks.append(action_group)
        await xboard.save()
        return {"message": "ActionGroup added to XBoard successfully"}
    raise HTTPException(status_code=404, detail="xboard not found")
