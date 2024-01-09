from execution.models import (
    Task,
    ActionGroup,
    XBoard,
    LogEntry,
)

from pydantic import BaseModel


class ActionGroupCreate(BaseModel):
    name: str


class TastSetRead(BaseModel):
    name: str
    description: str
    type: str
    tasks: list[Task]


class XBoardCreate(BaseModel):
    name: str


class XBoardRead(BaseModel):
    name: str
    description: str
